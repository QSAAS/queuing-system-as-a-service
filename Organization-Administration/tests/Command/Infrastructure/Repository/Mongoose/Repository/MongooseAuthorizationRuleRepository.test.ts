import mongoose, { Connection } from "mongoose";
import MongooseAuthorizationRuleRepository from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseAuthorizationRuleRepository";
import AuthorizationRuleTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/AuthorizationRuleTransformer";
import AuthorizationRuleBuilder from "@tests/Command/Domain/Entity/Builder/AuthorizationRuleBuilder";
import PermissionMother from "@tests/Command/Domain/ValueObject/Mother/PermissionMother";
import IAuthorizationRule from "@app/Command/Infrastructure/Repository/Mongoose/Types/IAuthorizationRule";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";

let mongooseConnection: Connection;
let repo: MongooseAuthorizationRuleRepository;
let model: mongoose.Model<IAuthorizationRule & mongoose.Document>;

const authorizationTransformer = new AuthorizationRuleTransformer();

beforeAll(async () => {
  const { DB_URL, DB_PORT, DB_NAME } = process.env;
  mongooseConnection = await mongoose.createConnection(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  repo = new MongooseAuthorizationRuleRepository(mongooseConnection, authorizationTransformer);
  model = repo.getModel();
});

afterAll(() => mongooseConnection.close());

beforeEach(() => model.deleteMany({}));

it("Should save AuthorizationRule instance with null resourceId", async () => {
  const permission = PermissionMother.withNullResourceId().build();
  const ruleInstance = new AuthorizationRuleBuilder().withPermission(permission).build();

  await repo.save(ruleInstance);

  const mongooseObject = await model.findOne(authorizationTransformer.mongooseObjectFrom(ruleInstance));
  expect(mongooseObject).toBeTruthy();
});

it("Should save AuthorizationRule instance with resourceId", async () => {
  const permission = PermissionMother.withResourceId().build();
  const ruleInstance = new AuthorizationRuleBuilder().withPermission(permission).build();

  await repo.save(ruleInstance);

  const mongooseObject = await model.findOne(authorizationTransformer.mongooseObjectFrom(ruleInstance));
  expect(mongooseObject).toBeTruthy();
});

describe("Retrieving AuthorizationRule instance by employee and permission", () => {
  it("Should return an AuthorizationRule instance by employee and permission", async () => {
    const ruleInstance = new AuthorizationRuleBuilder().build();

    await repo.save(ruleInstance);
    const returnedInstance = await repo.getByEmployeeAndPermission(
      ruleInstance.getOrganizationEmployeeId(),
      ruleInstance.getPermission(),
    );

    expect(ruleInstance.getPermission().equals(returnedInstance.getPermission())).toBeTruthy();
    expect(ruleInstance.getOrganizationEmployeeId().equals(returnedInstance.getOrganizationEmployeeId()));
  });

  it("Should throw an Error if AuthorizationRule instance is not found", async () => {
    const employeeId = OrganizationEmployeeId.create();
    const permission = PermissionMother.withResourceId().build();
    await expect(repo.getByEmployeeAndPermission(employeeId, permission)).rejects.toBeInstanceOf(Error);
  });
});

it("Should delete an AuthorizationRule instance", async () => {
  const ruleInstance = new AuthorizationRuleBuilder().build();

  await repo.save(ruleInstance);
  await repo.delete(ruleInstance);

  const mongooseObject = await model.findOne(authorizationTransformer.mongooseObjectFrom(ruleInstance));
  expect(mongooseObject).toBeNull();
});

/*
 *  This test can fail if you drop the database without restarting the web server and MongoDB server.
 *  You must restart both MongoDB and Web servers or explicitly call for MongoDB to rebuild the indices
 *                                               if you dropped the database to avoid this test failing.
 */
it("Should throw an error if the AuthorizationRule instance already exists", async () => {
  const ruleInstance = new AuthorizationRuleBuilder().build();

  await repo.save(ruleInstance);
  await expect(repo.save(ruleInstance)).rejects.toBeInstanceOf(Error);
});
