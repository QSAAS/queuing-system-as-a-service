import mongoose from "mongoose";
import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import IQueueNode from "@app/Command/Infrastructure/Mongoose/Types/IQueueNode";
import QueueNodeSchema from "@app/Command/Infrastructure/Mongoose/Schema/QueueNodeSchema";
import IQueueNodeRepository from "@app/Command/Domain/Service/QueueNodeRepository";
import QueueNodeTransformer from "@app/Command/Infrastructure/Mongoose/Transformer/QueueNodeTransformer";

export default class QueueNodeRepository implements IQueueNodeRepository {
  private readonly QueueNodeModel: mongoose.Model<IQueueNode & mongoose.Document>;

  constructor(connection: mongoose.Connection, private queueNodeTransformer: QueueNodeTransformer) {
    this.QueueNodeModel = connection.model<IQueueNode & mongoose.Document>("QueueNode", QueueNodeSchema);
  }

  async delete(queueNode: QueueNode): Promise<void> {
    await this.QueueNodeModel.findOneAndDelete({ id: queueNode.getId().toString() });
  }

  async save(node: QueueNode): Promise<void> {
    const instance = new this.QueueNodeModel(this.queueNodeTransformer.mongooseObjectFrom(node));
    await instance.save();
  }
}
