import mongoose from "mongoose";
import OrganizationEndpointRepository from "@app/Command/Domain/Service/OrganizationEndpointRepository";
import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import OrganizationEndpointSchema from "@app/Command/Infrastructure/Repository/Mongoose/Schema/OrganizationEndpointSchema";
import OrganizationEndpointMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/OrganizationEndpointMongooseTransformer";
import IOrganizationEndpoint from "@app/Command/Infrastructure/Repository/Mongoose/Types/IOrganizationEndpoint";
import OrganizationEndpointNotFound from "@app/Command/Domain/Error/OrganizationEndpointNotFound";

export default class MongooseOrganizationEndpointRepository implements OrganizationEndpointRepository {
  private readonly OrganizationEndpointModel: mongoose.Model<IOrganizationEndpoint & mongoose.Document>;
  private readonly endpointTransformer: OrganizationEndpointMongooseTransformer;

  constructor(connection: mongoose.Connection, endpointTransformer: OrganizationEndpointMongooseTransformer) {
    this.OrganizationEndpointModel = connection.model<IOrganizationEndpoint & mongoose.Document>(
      "OrganizationEndpoint",
      OrganizationEndpointSchema,
    );
    this.endpointTransformer = endpointTransformer;
  }

  async delete(endpoint: OrganizationEndpoint): Promise<void> {
    await this.OrganizationEndpointModel.findOneAndDelete({ id: endpoint.getId().toString() });
  }

  async save(endpoint: OrganizationEndpoint): Promise<void> {
    const instance = new this.OrganizationEndpointModel(this.endpointTransformer.mongooseObjectFrom(endpoint));
    await instance.save();
  }

  async getById(id: OrganizationEndpointId): Promise<OrganizationEndpoint> {
    const object = await this.OrganizationEndpointModel.findOne({ id: id.toString() });
    if (!object) {
      throw new OrganizationEndpointNotFound();
    }
    return this.endpointTransformer.domainInstanceFrom(object);
  }

  getModel() {
    return this.OrganizationEndpointModel;
  }
}
