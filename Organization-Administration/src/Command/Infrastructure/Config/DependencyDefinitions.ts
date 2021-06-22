/* eslint-disable @typescript-eslint/no-shadow,max-classes-per-file */
import mongoose from "mongoose";
import MongooseAuthorizationRuleRepository
  from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseAuthorizationRuleRepository";
import AuthorizationRuleMongooseTransformer
  from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/AuthorizationRuleMongooseTransformer";
import OrganizationEndpointController from "@app/Command/Presentation/Api/Controller/OrganizationEndpointController";
import GeolocationDtoTransformer from "@app/Command/Application/Transformer/GeolocationDtoTransformer";
import EmployeeCreateNewOrganizationEndpointService
  from "@app/Command/Domain/Service/EmployeeCreateNewOrganizationEndpointService";
import CreateOrganizationEndpoint from "@app/Command/Application/Service/CreateOrganizationEndpoint";
import { DependencyDefinitions } from "@app/Command/Infrastructure/Config/DependencyInjectionContainer";
import MongooseOrganizationEmployeeRepository
  from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseOrganizationEmployeeRepository";
import OrganizationEmployeeMongooseTransformer
  from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/OrganizationEmployeeMongooseTransformer";
import DirectOrganizationEndpointAuthorizationService
  from "@app/Command/Infrastructure/Service/AuthorizationService/DirectOrganizationEndpointAuthorizationService";
import MongooseOrganizationEndpointRepository
  from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseOrganizationEndpointRepository";
import OrganizationEndpointMongooseTransformer
  from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/OrganizationEndpointMongooseTransformer";
import GeolocationMongooseTransformer
  from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/GeolocationMongooseTransformer";

export enum DiEntry {
  MONGOOSE_CONNECTION,
  AuthorizationRuleRepository,
  AuthorizationRuleMongooseTransformer,
  CreateOrganizationEndpoint,
  OrganizationEndpointController,
  OrganizationEmployeeRepository,
  GeolocationDtoTransformer,
  GeolocationMongooseTransformer,
  EmployeeCreateNewOrganizationEndpointService,
  OrganizationEndpointRepository,
  OrganizationEndpointAuthorizationService,
  OrganizationEmployeeMongooseTransformer,
  OrganizationEndPointMongooseTransformer,
}

const definitions: DependencyDefinitions<DiEntry> = {
  [DiEntry.MONGOOSE_CONNECTION]: async () => {
    const {
      DB_URL,
      DB_PORT,
      DB_NAME
    } = process.env;
    return mongoose.createConnection(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  },
  [DiEntry.AuthorizationRuleMongooseTransformer]: () => new AuthorizationRuleMongooseTransformer(),
  [DiEntry.OrganizationEmployeeRepository]: (container) => new MongooseOrganizationEmployeeRepository(container.resolve(DiEntry.MONGOOSE_CONNECTION), container.resolve(DiEntry.OrganizationEmployeeMongooseTransformer)),
  [DiEntry.AuthorizationRuleRepository]: (container) =>
    new MongooseAuthorizationRuleRepository(
      container.resolve(DiEntry.MONGOOSE_CONNECTION),
      container.resolve(DiEntry.AuthorizationRuleMongooseTransformer),
    ),
  [DiEntry.CreateOrganizationEndpoint]: (container) =>
    new CreateOrganizationEndpoint(
      container.resolve(DiEntry.OrganizationEmployeeRepository),
      container.resolve(DiEntry.GeolocationDtoTransformer),
      container.resolve(DiEntry.EmployeeCreateNewOrganizationEndpointService),
      container.resolve(DiEntry.OrganizationEndpointRepository),
    ),
  [DiEntry.OrganizationEndpointController]: (container) => {
    return new OrganizationEndpointController(container.resolve(DiEntry.CreateOrganizationEndpoint));
  },
  [DiEntry.GeolocationDtoTransformer]: () => new GeolocationDtoTransformer(),
  [DiEntry.EmployeeCreateNewOrganizationEndpointService]: (container) =>
    new EmployeeCreateNewOrganizationEndpointService(
      container.resolve(DiEntry.OrganizationEndpointAuthorizationService),
    ),
  [DiEntry.OrganizationEndpointAuthorizationService]: (container) => {
    return new DirectOrganizationEndpointAuthorizationService(
      container.resolve(DiEntry.AuthorizationRuleRepository)
    );
  },
  [DiEntry.OrganizationEndpointRepository]: (container) => {
    return new MongooseOrganizationEndpointRepository(
      container.resolve(DiEntry.MONGOOSE_CONNECTION),
      container.resolve(DiEntry.OrganizationEndPointMongooseTransformer)
    );
  },
  [DiEntry.OrganizationEmployeeMongooseTransformer]: () => new OrganizationEmployeeMongooseTransformer(),
  [DiEntry.OrganizationEndPointMongooseTransformer]: (container) => new OrganizationEndpointMongooseTransformer(
    container.resolve(DiEntry.GeolocationMongooseTransformer),
  ),
  [DiEntry.GeolocationMongooseTransformer]: () => new GeolocationMongooseTransformer(),
};

export default definitions;
