import MongooseQueueNodeRepository from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseQueueNodeRepository";
import QueueNodeMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/QueueNodeMongooseTransformer";
import MetadataSpecificationFieldMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/MetadataSpecificationFieldMongooseTransformer";
import ClockMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/ClockMongooseTransformer";
import TimeSpanMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/TimeSpanMongooseTransformer";
import QueueNodeBuilder from "@tests/Command/Domain/Entity/Builder/QueueNodeBuilder";
import IQueueNode from "@app/Command/Infrastructure/Repository/Mongoose/Types/IQueueNode";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import createTestingDbConnection from "@tests/Utils/dbUtils";
import QueueNodeNotFound from "@app/Command/Domain/Error/QueueNodeNotFound";

const clockTransformer = new ClockMongooseTransformer();
const timeSpanTransformer = new TimeSpanMongooseTransformer(clockTransformer);
const metadataSpecificationFieldTransformer = new MetadataSpecificationFieldMongooseTransformer();
const nodeTransformer = new QueueNodeMongooseTransformer(metadataSpecificationFieldTransformer, timeSpanTransformer);

let repo: MongooseQueueNodeRepository;

createTestingDbConnection((connection) => {
  repo = new MongooseQueueNodeRepository(connection, nodeTransformer);
});

it("Should save QueueNode instance", async () => {
  const nodeInstance = new QueueNodeBuilder().build();

  await repo.save(nodeInstance);

  const model = repo.getModel();
  const mongooseNodeObject: IQueueNode | null = await model.findOne({ id: nodeInstance.getId().toString() });
  expect(mongooseNodeObject).toBeTruthy();
});

describe("Retrieving QueueNode instance by id", () => {
  it("Should return an instance by id", async () => {
    const nodeInstance = new QueueNodeBuilder().build();

    await repo.save(nodeInstance);
    const returnedInstance = await repo.getById(nodeInstance.getId());

    expect(nodeInstance.getId().equals(returnedInstance.getId())).toBeTruthy();
    expect(nodeInstance.getTimeSpan().equals(returnedInstance.getTimeSpan())).toBeTruthy();
    expect(nodeInstance.getMetaSpecs().equals(returnedInstance.getMetaSpecs())).toBeTruthy();
    expect(nodeInstance.getEndPointId().equals(returnedInstance.getEndPointId())).toBeTruthy();
  });

  it("Should throw an Error if instance is not found", async () => {
    await expect(repo.getById(QueueNodeId.create())).rejects.toBeInstanceOf(QueueNodeNotFound);
  });
});

it("Should delete a QueueNode instance", async () => {
  const nodeInstance = new QueueNodeBuilder().build();

  await repo.save(nodeInstance);
  await repo.delete(nodeInstance);

  const model = repo.getModel();
  const mongooseNodeObject: IQueueNode | null = await model.findOne({ id: nodeInstance.getId().toString() });
  expect(mongooseNodeObject).toBeNull();
});
