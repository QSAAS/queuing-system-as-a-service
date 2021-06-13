import mongoose, { Connection } from "mongoose";
import QueueNodeRepository from "@app/Command/Infrastructure/Mongoose/Repository/QueueNodeRepository";
import QueueNodeTransformer from "@app/Command/Infrastructure/Mongoose/Transformer/QueueNodeTransformer";
import MetadataSpecificationFieldTransformer
  from "@app/Command/Infrastructure/Mongoose/Transformer/MetadataSpecificationFieldTransformer";
import ClockTransformer from "@app/Command/Infrastructure/Mongoose/Transformer/ClockTransformer";
import TimeSpanTransformer from "@app/Command/Infrastructure/Mongoose/Transformer/TimeSpanTransformer";
import QueueNodeBuilder from "@tests/Command/Domain/Entity/QueueNodeBuilder";
import IQueueNode from "@app/Command/Infrastructure/Mongoose/Types/IQueueNode";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";

let mongooseConnection: Connection;
let repo: QueueNodeRepository;

beforeAll(() => {
  mongooseConnection = mongoose.createConnection("mongodb://127.0.0.1:27017/qsas_test");

  const clockTransformer = new ClockTransformer();
  const timeSpanTransformer = new TimeSpanTransformer(clockTransformer);
  const metadataSpecificationFieldTransformer = new MetadataSpecificationFieldTransformer();
  const nodeTransformer = new QueueNodeTransformer(metadataSpecificationFieldTransformer, timeSpanTransformer);

  repo = new QueueNodeRepository(mongooseConnection, nodeTransformer);
});

afterAll(() => mongooseConnection.close());

beforeEach(() => {
  const model = repo.getModel();
  return model.deleteMany({});
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
    expect(nodeInstance.getTimeSpan().equals(returnedInstance.getTimeSpan()));
    expect(nodeInstance.getMetaSpecs().equals(returnedInstance.getMetaSpecs()));
    expect(nodeInstance.getEndPointId().equals(returnedInstance.getEndPointId()));
  });

  it("Should throw an Error if instance is not found", async () => {
    await expect(repo.getById(QueueNodeId.create()))
      .rejects
      .toBeInstanceOf(Error);
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
