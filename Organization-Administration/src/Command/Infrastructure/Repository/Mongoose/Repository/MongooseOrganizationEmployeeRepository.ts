import mongoose from "mongoose";
import QueueNodeNotFound from "@app/Command/Domain/Error/QueueNodeNotFound";
import OrganizationEmployeeRepository from "@app/Command/Domain/Service/OrganizationEmployeeRepository";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import IOrganizationEmployee from "@app/Command/Infrastructure/Repository/Mongoose/Types/IOrganizationEmployee";
import OrganizationEmployeeTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/OrganizationEmployeeTransformer";
import OrganizationEmployeeSchema from "@app/Command/Infrastructure/Repository/Mongoose/Schema/OrganizationEmployeeSchema";

export default class MongooseOrganizationEmployeeRepository implements OrganizationEmployeeRepository {
  private readonly OrganizationEmployeeModel: mongoose.Model<IOrganizationEmployee & mongoose.Document>;
  private readonly employeeTransformer: OrganizationEmployeeTransformer;

  constructor(connection: mongoose.Connection, employeeTransformer: OrganizationEmployeeTransformer) {
    this.OrganizationEmployeeModel = connection.model<IOrganizationEmployee & mongoose.Document>(
      "OrganizationEmployee",
      OrganizationEmployeeSchema,
    );
    this.employeeTransformer = employeeTransformer;
  }

  async delete(employee: OrganizationEmployee): Promise<void> {
    await this.OrganizationEmployeeModel.findOneAndDelete({ id: employee.getId().toString() });
  }

  async save(employee: OrganizationEmployee): Promise<void> {
    const instance = new this.OrganizationEmployeeModel(this.employeeTransformer.mongooseObjectFrom(employee));
    await instance.save();
  }

  async getById(id: OrganizationEmployeeId): Promise<OrganizationEmployee> {
    const object = await this.OrganizationEmployeeModel.findOne({ id: id.toString() });

    if (!object) {
      throw new QueueNodeNotFound();
    }

    return this.employeeTransformer.domainInstanceFrom(object);
  }

  getModel() {
    return this.OrganizationEmployeeModel;
  }
}
