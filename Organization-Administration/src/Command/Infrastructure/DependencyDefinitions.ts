import "reflect-metadata";
import { container, DependencyContainer } from "tsyringe";
import MongooseAuthorizationRuleRepository from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseAuthorizationRuleRepository";
import mongoose from "mongoose";
import AuthorizationRuleTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/AuthorizationRuleTransformer";

export type Dependency = "MONGOOSE_CONNECTION" | "AUTHORIZATION_RULE_REPOSITORY";

interface DependencyEntry {
  name: Dependency;
  value: () => any;
}

async function getDefinitions(diContainer: DependencyContainer): Promise<DependencyEntry[]> {
  return [
    {
      name: "MONGOOSE_CONNECTION",
      value: async () => {
        const { DB_URL, DB_PORT, DB_NAME } = process.env;
        return mongoose.createConnection(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        });
      },
    },
    {
      name: "AUTHORIZATION_RULE_REPOSITORY",
      value: () =>
        new MongooseAuthorizationRuleRepository(
          diContainer.resolve("MONGOOSE_CONNECTION"),
          diContainer.resolve(AuthorizationRuleTransformer),
        ),
    },
  ];
}

export async function registerDependencies() {
  const defs = await getDefinitions(container);
  for (let i = 0; i < defs.length; ++i) {
    const entry = defs[i];
    const key = entry.name;
    // eslint-disable-next-line no-await-in-loop
    const value = await entry.value();
    container.register(key, {
      useValue: value,
    });
  }
}

export function resolveDependency(dep: Dependency) {
  return container.resolve(dep);
}
