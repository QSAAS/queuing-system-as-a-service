/* eslint-disable @typescript-eslint/no-shadow,max-classes-per-file */
import mongoose from "mongoose";
import MongooseAuthorizationRuleRepository from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseAuthorizationRuleRepository";
import AuthorizationRuleTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/AuthorizationRuleTransformer";
import OrganizationEndpointController from "@app/Command/Presentation/Api/Controller/OrganizationEndpointController";
import GeolocationTransformer from "@app/Command/Application/Transformer/GeolocationTransformer";
import EmployeeCreateNewOrganizationEndpointService from "@app/Command/Domain/Service/EmployeeCreateNewOrganizationEndpointService";
import CreateOrganizationEndpoint from "@app/Command/Application/Service/CreateOrganizationEndpoint";
import { DependencyDefinitions } from "@app/Command/Infrastructure/Config/DependencyInjectionContainer";

export enum DiEntry {
  MONGOOSE_CONNECTION,
  AuthorizationRuleRepository,
  AuthorizationRuleTransformer,
  CreateOrganizationEndpoint,
  OrganizationEndpointController,
  OrganizationEmployeeRepository,
  GeolocationTransformer,
  EmployeeCreateNewOrganizationEndpointService,
  OrganizationEndpointRepository,
  OrganizationEndpointAuthorizationService,
}

// TODO: Implement those
class MongooseOrganizationEmployeeRepository {}
class DirectOrganizationEndpointAuthorizationService {}
class MongooseOrganizationEndpointRepository {}

const definitions: DependencyDefinitions<DiEntry> = {
  [DiEntry.MONGOOSE_CONNECTION]: async () => {
    const { DB_URL, DB_PORT, DB_NAME } = process.env;
    return mongoose.createConnection(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  },
  [DiEntry.AuthorizationRuleTransformer]: () => new AuthorizationRuleTransformer(),
  [DiEntry.OrganizationEmployeeRepository]: () => new MongooseOrganizationEmployeeRepository(),
  [DiEntry.AuthorizationRuleRepository]: (container) =>
    new MongooseAuthorizationRuleRepository(
      container.resolve(DiEntry.MONGOOSE_CONNECTION),
      container.resolve(DiEntry.AuthorizationRuleTransformer),
    ),
  [DiEntry.CreateOrganizationEndpoint]: (container) =>
    new CreateOrganizationEndpoint(
      container.resolve(DiEntry.OrganizationEmployeeRepository),
      container.resolve(DiEntry.GeolocationTransformer),
      container.resolve(DiEntry.EmployeeCreateNewOrganizationEndpointService),
      container.resolve(DiEntry.OrganizationEndpointRepository),
    ),
  [DiEntry.OrganizationEndpointController]: (container) => {
    return new OrganizationEndpointController(container.resolve(DiEntry.CreateOrganizationEndpoint));
  },
  [DiEntry.GeolocationTransformer]: () => new GeolocationTransformer(),
  [DiEntry.EmployeeCreateNewOrganizationEndpointService]: (container) =>
    new EmployeeCreateNewOrganizationEndpointService(
      container.resolve(DiEntry.OrganizationEndpointAuthorizationService),
    ),
  [DiEntry.OrganizationEndpointAuthorizationService]: () => {
    return new DirectOrganizationEndpointAuthorizationService();
  },
  [DiEntry.OrganizationEndpointRepository]: () => {
    return new MongooseOrganizationEndpointRepository();
  },
};

export default definitions;
