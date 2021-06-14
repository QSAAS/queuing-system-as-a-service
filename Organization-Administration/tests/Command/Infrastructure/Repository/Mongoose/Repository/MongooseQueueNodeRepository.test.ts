import MongooseQueueNodeRepository from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseQueueNodeRepository";
import QueueNodeTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/QueueNodeTransformer";
import MetadataSpecificationFieldTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/MetadataSpecificationFieldTransformer";
import ClockTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/ClockTransformer";
import TimeSpanTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/TimeSpanTransformer";
import QueueNodeBuilder from "@tests/Command/Domain/Entity/Builder/QueueNodeBuilder";
import IQueueNode from "@app/Command/Infrastructure/Repository/Mongoose/Types/IQueueNode";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import createTestingDbConnection from "@tests/Utils/dbUtils";

const clockTransformer = new ClockTransformer();
const timeSpanTransformer = new TimeSpanTransformer(clockTransformer);
const metadataSpecificationFieldTransformer = new MetadataSpecificationFieldTransformer();
const nodeTransformer = new QueueNodeTransformer(metadataSpecificationFieldTransformer, timeSpanTransformer);

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
    expect(nodeInstance.getTimeSpan().equals(returnedInstance.getTimeSpan()));
    expect(nodeInstance.getMetaSpecs().equals(returnedInstance.getMetaSpecs()));
    expect(nodeInstance.getEndPointId().equals(returnedInstance.getEndPointId()));
  });

  it("Should throw an Error if instance is not found", async () => {
    await expect(repo.getById(QueueNodeId.create())).rejects.toBeInstanceOf(Error);
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
