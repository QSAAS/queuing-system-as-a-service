import createTestingDbConnection from "@tests/Utils/dbUtils";
import MongooseOrganizationEmployeeRepository from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseOrganizationEmployeeRepository";
import OrganizationEmployeeMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/OrganizationEmployeeMongooseTransformer";
import IOrganizationEmployee from "@app/Command/Infrastructure/Repository/Mongoose/Types/IOrganizationEmployee";
import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/Builder/OrganizationEmployeeBuilder";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationEmployeeNotFound from "@app/Command/Domain/Error/OrganizationEmployeeNotFound";

const employeeTransformer = new OrganizationEmployeeMongooseTransformer();

let repo: MongooseOrganizationEmployeeRepository;

createTestingDbConnection((connection) => {
  repo = new MongooseOrganizationEmployeeRepository(connection, employeeTransformer);
});

it("Should save Organization Employee instance", async () => {
  const employee = new OrganizationEmployeeBuilder().build();

  await repo.save(employee);

  const model = repo.getModel();
  const mongooseEmployeeObject: IOrganizationEmployee | null = await model.findOne({ id: employee.getId().toString() });
  expect(mongooseEmployeeObject).toBeTruthy();
});

describe("Retrieving Organization Employee instance by id", () => {
  it("Should return an instance by id", async () => {
    const instance = new OrganizationEmployeeBuilder().build();

    await repo.save(instance);
    const returnedInstance = await repo.getById(instance.getId());

    expect(instance.getId().equals(returnedInstance.getId())).toBeTruthy();
    expect(instance.getName() === returnedInstance.getName()).toBeTruthy();
    expect(instance.getOrganizationId().equals(returnedInstance.getOrganizationId())).toBeTruthy();
    expect(instance.getPasswordHash().equals(returnedInstance.getPasswordHash())).toBeTruthy();
    expect(instance.getUsername().equals(returnedInstance.getUsername())).toBeTruthy();
  });

  it("Should throw an Error if instance is not found", async () => {
    await expect(repo.getById(OrganizationEmployeeId.create())).rejects.toBeInstanceOf(OrganizationEmployeeNotFound);
  });
});

it("Should delete a Employee instance", async () => {
  const instance = new OrganizationEmployeeBuilder().build();

  await repo.save(instance);
  await repo.delete(instance);

  const model = repo.getModel();
  const mongooseObject: IOrganizationEmployee | null = await model.findOne({ id: instance.getId().toString() });
  expect(mongooseObject).toBeNull();
});
