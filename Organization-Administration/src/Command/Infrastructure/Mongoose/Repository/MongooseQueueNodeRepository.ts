import mongoose from "mongoose";
import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import IQueueNode from "@app/Command/Infrastructure/Mongoose/Types/IQueueNode";
import QueueNodeSchema from "@app/Command/Infrastructure/Mongoose/Schema/QueueNodeSchema";
import QueueNodeRepository from "@app/Command/Domain/Service/QueueNodeRepository";
import QueueNodeTransformer from "@app/Command/Infrastructure/Mongoose/Transformer/QueueNodeTransformer";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";

export default class MongooseQueueNodeRepository implements QueueNodeRepository {
  private readonly QueueNodeModel: mongoose.Model<IQueueNode & mongoose.Document>;
  private readonly queueNodeTransformer: QueueNodeTransformer;

  constructor(connection: mongoose.Connection, queueNodeTransformer: QueueNodeTransformer) {
    this.QueueNodeModel = connection.model<IQueueNode & mongoose.Document>("QueueNode", QueueNodeSchema);
    this.queueNodeTransformer = queueNodeTransformer;
  }

  async delete(queueNode: QueueNode): Promise<void> {
    await this.QueueNodeModel.findOneAndDelete({ id: queueNode.getId().toString() });
  }

  async save(node: QueueNode): Promise<void> {
    const instance = new this.QueueNodeModel(this.queueNodeTransformer.mongooseObjectFrom(node));
    await instance.save();
  }

  async getById(id: QueueNodeId): Promise<QueueNode> {
    const object = await this.QueueNodeModel.findOne({ id: id.toString() });

    if (!object) {
      // TODO create custom error
      throw new Error(`QueueNode with id '${id.toString()}' not found`);
    }

    return this.queueNodeTransformer.domainInstanceFrom(object);
  }

  getModel() {
    return this.QueueNodeModel;
  }
}
