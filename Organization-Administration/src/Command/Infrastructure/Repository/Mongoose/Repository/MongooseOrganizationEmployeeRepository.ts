import mongoose from "mongoose";
import OrganizationEmployeeRepository from "@app/Command/Domain/Service/OrganizationEmployeeRepository";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import IOrganizationEmployee from "@app/Command/Infrastructure/Repository/Mongoose/Types/IOrganizationEmployee";
import OrganizationEmployeeMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/OrganizationEmployeeMongooseTransformer";
import OrganizationEmployeeSchema from "@app/Command/Infrastructure/Repository/Mongoose/Schema/OrganizationEmployeeSchema";
import OrganizationEmployeeNotFound from "@app/Command/Domain/Error/OrganizationEmployeeNotFound";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";

export default class MongooseOrganizationEmployeeRepository implements OrganizationEmployeeRepository {
  private readonly OrganizationEmployeeModel: mongoose.Model<IOrganizationEmployee & mongoose.Document>;
  private readonly employeeTransformer: OrganizationEmployeeMongooseTransformer;

  constructor(connection: mongoose.Connection, employeeTransformer: OrganizationEmployeeMongooseTransformer) {
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
    return this.instanceOrThrowEmployeeNotFound(object);
  }

  getModel() {
    return this.OrganizationEmployeeModel;
  }

  async getByUsername(username: EmployeeUsername): Promise<OrganizationEmployee> {
    const object = await this.OrganizationEmployeeModel.findOne({username: username.toString()});
    return this.instanceOrThrowEmployeeNotFound(object);
  }

  private instanceOrThrowEmployeeNotFound(object: IOrganizationEmployee|null): OrganizationEmployee {
    if (!object) {
      throw new OrganizationEmployeeNotFound();
    }
    return this.employeeTransformer.domainInstanceFrom(object);
  }
}
