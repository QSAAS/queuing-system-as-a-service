import request from "supertest";
import createApp from "@app/app";
import { Express } from "express";
import { getDependencyContainer } from "@app/Command/Presentation/Api/Routes/Router";
import { DiEntry } from "@app/Command/Infrastructure/Config/DependencyDefinitions";
import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/Builder/OrganizationEmployeeBuilder";
import PasswordHashFactory from "@app/Command/Domain/Service/PasswordHashFactory";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import jwt from "jsonwebtoken";
import DependencyInjectionContainer from "@app/Command/Infrastructure/Config/DependencyInjectionContainer";
import MongooseOrganizationEmployeeRepository from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseOrganizationEmployeeRepository";

const PATH = "/administration/accounts/login/";

let app: Express;
let repo: MongooseOrganizationEmployeeRepository;
let container: DependencyInjectionContainer<DiEntry>;

beforeAll(async () => {
  console.log("ENVIRONMENT", process.env.ENV);
  container = await getDependencyContainer();
  app = await createApp();
});

beforeEach(async () => {
  repo = container.resolve<MongooseOrganizationEmployeeRepository>(DiEntry.OrganizationEmployeeRepository);
  await repo.getModel().deleteMany({});
});

describe("/administration/accounts/", () => {
  describe("POST /login", () => {
    it("should return code 400 on empty request body", async () => {
      await request(app).post(PATH).send({}).set("Accept", "application/json").expect(400);
    });

    it("should return a valid JWT token on valid credentials", async () => {
      const containerInstance = await getDependencyContainer();
      const passwordFactory = containerInstance.resolve<PasswordHashFactory>(DiEntry.PasswordHashFactory);

      const username = "employee_1";
      const password = "password1234";
      const employee = new OrganizationEmployeeBuilder()
        .withUsername(EmployeeUsername.from(username))
        .withPasswordHash(await passwordFactory.create(password))
        .build();

      await repo.save(employee);

      const res = await request(app)
        .post(PATH)
        .send({
          username,
          password,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      const { token } = res.body;

      expect(() => {
        jwt.verify(token, containerInstance.resolve(DiEntry.JWT_KEY));
      }).not.toThrow();
    });

    it("should return code 401 on invalid credentials", async () => {
      const containerInstance = await getDependencyContainer();
      const passwordFactory = containerInstance.resolve<PasswordHashFactory>(DiEntry.PasswordHashFactory);
      const username = "employee_1";
      const password = "password1234";
      const employee = new OrganizationEmployeeBuilder()
        .withUsername(EmployeeUsername.from(username))
        .withPasswordHash(await passwordFactory.create(password))
        .build();

      await repo.save(employee);

      await request(app)
        .post(PATH)
        .send({
          username: "employee_1",
          password: "invalid",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(401);
    });
  });
});
