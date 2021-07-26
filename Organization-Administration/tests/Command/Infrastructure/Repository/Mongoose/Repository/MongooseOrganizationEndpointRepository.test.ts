import createTestingDbConnection from "@tests/Utils/dbUtils";
import MongooseOrganizationEndpointRepository from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseOrganizationEndpointRepository";
import OrganizationEndpointMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/OrganizationEndpointMongooseTransformer";
import GeolocationMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/GeolocationMongooseTransformer";
import OrganizationEndpointBuilder from "@tests/Command/Domain/Entity/Builder/OrganizationEndpointBuilder";
import IOrganizationEndpoint from "@app/Command/Infrastructure/Repository/Mongoose/Types/IOrganizationEndpoint";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import OrganizationEndpointNotFound from "@app/Command/Domain/Error/OrganizationEndpointNotFound";
import DummyEventBus from "@app/Command/Infrastructure/Service/DummyEventBus";

const endpointTransformer = new OrganizationEndpointMongooseTransformer(new GeolocationMongooseTransformer());

let repo: MongooseOrganizationEndpointRepository;

createTestingDbConnection((connection) => {
  repo = new MongooseOrganizationEndpointRepository(connection, endpointTransformer,
    new DummyEventBus());
});

it("Should save Organization Endpoint instance", async () => {
  const endpoint = new OrganizationEndpointBuilder().build();

  await repo.save(endpoint);

  const model = repo.getModel();
  const mongooseEndpointObject: IOrganizationEndpoint | null = await model.findOne({ id: endpoint.getId().toString() });
  expect(mongooseEndpointObject).toBeTruthy();
});

describe("Retrieving Organization Endpoint instance by id", () => {
  it("Should return an instance by id", async () => {
    const instance = new OrganizationEndpointBuilder().build();

    await repo.save(instance);
    const returnedInstance = await repo.getById(instance.getId());

    expect(instance.getId().equals(returnedInstance.getId())).toBeTruthy();
    expect(instance.getOrganizationId().equals(returnedInstance.getOrganizationId())).toBeTruthy();
    expect(instance.getName() === returnedInstance.getName()).toBeTruthy();
    expect(instance.getGeolocation().equals(returnedInstance.getGeolocation())).toBeTruthy();
  });

  it("Should throw an Error if instance is not found", async () => {
    await expect(repo.getById(OrganizationEndpointId.create())).rejects.toBeInstanceOf(OrganizationEndpointNotFound);
  });
});

it("Should delete a Endpoint instance", async () => {
  const instance = new OrganizationEndpointBuilder().build();

  await repo.save(instance);
  await repo.delete(instance);

  const model = repo.getModel();
  const mongooseObject: IOrganizationEndpoint | null = await model.findOne({ id: instance.getId().toString() });
  expect(mongooseObject).toBeNull();
});
