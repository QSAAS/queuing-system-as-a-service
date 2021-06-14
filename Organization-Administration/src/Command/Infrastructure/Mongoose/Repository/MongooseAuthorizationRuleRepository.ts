import mongoose from "mongoose";
import AuthorizationRuleRepository from "@app/Command/Domain/Service/AuthorizationRuleRepository";
import IAuthorizationRule from "@app/Command/Infrastructure/Mongoose/Types/IAuthorizationRule";
import AuthorizationRuleTransformer from "@app/Command/Infrastructure/Mongoose/Transformer/AuthorizationRuleTransformer";
import AuthorizationRuleSchema from "@app/Command/Infrastructure/Mongoose/Schema/AuthorizationRuleSchema";
import AuthorizationRule from "@app/Command/Domain/Entity/AuthorizationRule";
import Permission from "@app/Command/Domain/ValueObject/Permission";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import AuthorizationRuleAlreadyExists from "@app/Command/Domain/Error/AuthorizationRuleAlreadyExists";
import AuthorizationRuleNotFound from "@app/Command/Domain/Error/AuthorizationRuleNotFound";

export default class MongooseAuthorizationRuleRepository implements AuthorizationRuleRepository {
  private readonly AuthorizationRuleModel: mongoose.Model<IAuthorizationRule & mongoose.Document>;
  private readonly authorizationTransformer: AuthorizationRuleTransformer;

  constructor(connection: mongoose.Connection, authorizationTransformer: AuthorizationRuleTransformer) {
    this.AuthorizationRuleModel = connection.model<IAuthorizationRule & mongoose.Document>(
      "authorization_rule",
      AuthorizationRuleSchema,
    );
    this.authorizationTransformer = authorizationTransformer;
  }

  async save(rule: AuthorizationRule): Promise<void> {
    try {
      const instance = new this.AuthorizationRuleModel(this.authorizationTransformer.mongooseObjectFrom(rule));
      await instance.save();
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        throw new AuthorizationRuleAlreadyExists();
      } else {
        throw error;
      }
    }
  }

  async delete(rule: AuthorizationRule): Promise<void> {
    await this.AuthorizationRuleModel.findOneAndDelete(this.authorizationTransformer.mongooseObjectFrom(rule));
  }

  /**
   * At the repository level, this function does not make much sense because the function will return an instance of
   * what's already has been passed to it.
   * However, this is useful at the service level because we have to assert that such AuthorizationRule exists.
   */
  async getByEmployeeAndPermission(
    employeeId: OrganizationEmployeeId,
    permission: Permission,
  ): Promise<AuthorizationRule> {
    const rule = new AuthorizationRule(employeeId, permission);
    const object = await this.AuthorizationRuleModel.findOne(this.authorizationTransformer.mongooseObjectFrom(rule));

    if (!object) {
      throw new AuthorizationRuleNotFound();
    }

    return this.authorizationTransformer.domainInstanceFrom(object);
  }

  getModel() {
    return this.AuthorizationRuleModel;
  }
}
