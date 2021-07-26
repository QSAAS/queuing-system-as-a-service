import mongoose from "mongoose";
import QueueServerRepository from "@app/Command/Domain/Service/QueueServerRepository";
import QueueServer from "@app/Command/Domain/Entity/QueueServer";
import IQueueServer from "@app/Command/Infrastructure/Repository/Mongoose/Types/IQueueServer";
import QueueServerMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/QueueServerMongooseTransformer";
import QueueServerSchema from "@app/Command/Infrastructure/Repository/Mongoose/Schema/QueueServerSchema";
import QueueServerId from "@app/Command/Domain/ValueObject/QueueServerId";
import QueueServerNotFound from "@app/Command/Domain/Error/QueueServerNotFound";
import EventBus from "@app/Command/Domain/Service/EventBus";

export default class MongooseQueueServerRepository implements QueueServerRepository {
  private readonly QueueServerModel: mongoose.Model<IQueueServer & mongoose.Document>;
  private readonly queueServerTransformer: QueueServerMongooseTransformer;

  constructor(
    connection: mongoose.Connection,
    queueNodeTransformer: QueueServerMongooseTransformer,
    private eventBus: EventBus,
  ) {
    this.QueueServerModel = connection.model<IQueueServer & mongoose.Document>("QueueServer", QueueServerSchema);
    this.queueServerTransformer = queueNodeTransformer;
  }

  async delete(queueServer: QueueServer): Promise<void> {
    await this.QueueServerModel.findOneAndDelete({ id: queueServer.getId().toString() });
    await this.eventBus.publishEvents(queueServer.getRaisedEvents());
  }

  async save(queueServer: QueueServer): Promise<void> {
    const instance = new this.QueueServerModel(this.queueServerTransformer.mongooseObjectFrom(queueServer));
    await instance.save();
    await this.eventBus.publishEvents(queueServer.getRaisedEvents());
  }

  getModel() {
    return this.QueueServerModel;
  }

  getTransformer() {
    return this.queueServerTransformer;
  }

  async getById(id: QueueServerId) {
    const object = await this.QueueServerModel.findOne({ id: id.toString() });

    if (!object) throw new QueueServerNotFound();

    return this.queueServerTransformer.domainInstanceFrom(object);
  }

  async getAll() {
    const objects = await this.QueueServerModel.find({});
    return objects.map((o) => this.queueServerTransformer.domainInstanceFrom(o));
  }
}
