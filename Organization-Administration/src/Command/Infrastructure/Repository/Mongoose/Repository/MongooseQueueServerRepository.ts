import mongoose from "mongoose";
import QueueServerRepository from "@app/Command/Domain/Service/QueueServerRepository";
import QueueServer from "@app/Command/Domain/Entity/QueueServer";
import IQueueServer from "@app/Command/Infrastructure/Repository/Mongoose/Types/IQueueServer";
import QueueServerMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/QueueServerMongooseTransformer";
import QueueServerSchema from "@app/Command/Infrastructure/Repository/Mongoose/Schema/QueueServerSchema";

export default class MongooseQueueServerRepository implements QueueServerRepository {
  private readonly QueueServerModel: mongoose.Model<IQueueServer & mongoose.Document>;
  private readonly queueServerTransformer: QueueServerMongooseTransformer;

  constructor(connection: mongoose.Connection, queueNodeTransformer: QueueServerMongooseTransformer) {
    this.QueueServerModel = connection.model<IQueueServer & mongoose.Document>("QueueServer", QueueServerSchema);
    this.queueServerTransformer = queueNodeTransformer;
  }

  async delete(queueServer: QueueServer): Promise<void> {
    await this.QueueServerModel.findOneAndDelete({ id: queueServer.getId().toString() });
  }

  async save(queueServer: QueueServer): Promise<void> {
    const instance = new this.QueueServerModel(this.queueServerTransformer.mongooseObjectFrom(queueServer));
    await instance.save();
  }

  getModel() {
    return this.QueueServerModel;
  }
}
