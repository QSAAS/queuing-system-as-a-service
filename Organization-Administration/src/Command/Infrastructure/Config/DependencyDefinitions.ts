/* eslint-disable @typescript-eslint/no-shadow,max-classes-per-file */
import mongoose from "mongoose";
import MongooseAuthorizationRuleRepository from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseAuthorizationRuleRepository";
import AuthorizationRuleMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/AuthorizationRuleMongooseTransformer";
import OrganizationEndpointController from "@app/Command/Presentation/Api/Controller/OrganizationEndpointController";
import GeolocationDtoTransformer from "@app/Command/Application/Transformer/GeolocationDtoTransformer";
import EmployeeCreateNewOrganizationEndpointService from "@app/Command/Domain/Service/EmployeeCreateNewOrganizationEndpointService";
import CreateOrganizationEndpoint from "@app/Command/Application/Service/CreateOrganizationEndpoint";
import { DependencyDefinitions } from "@app/Command/Infrastructure/Config/DependencyInjectionContainer";
import MongooseOrganizationEmployeeRepository from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseOrganizationEmployeeRepository";
import OrganizationEmployeeMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/OrganizationEmployeeMongooseTransformer";
import DirectOrganizationEndpointAuthorizationService from "@app/Command/Infrastructure/Service/AuthorizationService/DirectOrganizationEndpointAuthorizationService";
import MongooseOrganizationEndpointRepository from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseOrganizationEndpointRepository";
import OrganizationEndpointMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/OrganizationEndpointMongooseTransformer";
import GeolocationMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/GeolocationMongooseTransformer";
import LoginService from "@app/Command/Application/Service/LoginService";
import OrganizationEmployeeController from "@app/Command/Presentation/Api/Controller/OrganizationEmployeeController";
import JwtTokenGenerator from "@app/Command/Presentation/Api/Service/JwtTokenGenerator";
import BCryptPasswordHashFactory from "@app/Command/Infrastructure/Service/BCryptPasswordHashFactory";
import RegisterService from "@app/Command/Application/Service/RegisterService";
import AuthorizationRuleController from "@app/Command/Presentation/Api/Controller/AuthorizationRuleController";
import CreateAuthorizationRuleService from "@app/Command/Application/Service/CreateAuthorizationRuleService";
import EmployeeCreateNewAuthorizationRuleService from "@app/Command/Domain/Service/EmployeeCreateNewAuthorizationRuleService";
import DirectAuthorizationRuleAuthorizationService from "@app/Command/Infrastructure/Service/AuthorizationService/DirectAuthorizationRuleAuthorizationService";
import PermissionDtoTransformer from "@app/Command/Application/Transformer/PermissionDtoTransformer";
import QueueServerController from "@app/Command/Presentation/Api/Controller/QueueServerController";
import CreateQueueServerService from "@app/Command/Application/Service/CreateQueueServerService";
import EmployeeCreateNewQueueServerService from "@app/Command/Domain/Service/EmployeeCreateNewQueueServerService";
import MongooseQueueServerRepository from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseQueueServerRepository";
import QueueServerMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/QueueServerMongooseTransformer";
import QueueNodeController from "@app/Command/Presentation/Api/Controller/QueueNodeController";
import CreateQueueNodeService from "@app/Command/Application/Service/CreateQueueNodeService";
import MongooseQueueNodeRepository from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseQueueNodeRepository";
import QueueNodeMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/QueueNodeMongooseTransformer";
import MetadataSpecificationFieldMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/MetadataSpecificationFieldMongooseTransformer";
import TimeSpanMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/TimeSpanMongooseTransformer";
import ClockMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/ClockMongooseTransformer";
import EmployeeCreateNewQueueNodeService from "@app/Command/Domain/Service/EmployeeCreateNewQueueNodeService";
import DirectQueueNodeAuthorizationService from "@app/Command/Infrastructure/Service/AuthorizationService/DirectQueueNodeAuthorizationService";
import MetadataSpecificationFieldDtoTransformer from "@app/Command/Application/Transformer/MetadataSpecificationFieldDtoTransformer";
import TimeSpanDtoTransformer from "@app/Command/Application/Transformer/TimeSpanDtoTransformer";

export enum DiEntry {
  MONGOOSE_CONNECTION,
  JWT_KEY,
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
  LoginService,
  OrganizationEmployeeController,
  JwtTokenGenerator,
  PasswordHashFactory,
  RegisterService,
  AuthorizationRuleController,
  CreateAuthorizationRuleService,
  EmployeeCreateNewAuthorizationRuleService,
  AuthorizationRuleAuthorizationService,
  PermissionDtoTransformer,
  QueueServerController,
  CreateQueueServerService,
  QueueServerRepository,
  EmployeeCreateNewQueueServerService,
  QueueServerMongooseTransformer,
  QueueServerAuthorizationService,
  QueueNodeController,
  CreateQueueNodeService,
  QueueNodeRepository,
  QueueNodeMongooseTransformer,
  MetadataSpecificationFieldMongooseTransformer,
  TimespanMongooseTransformer,
  ClockMongooseTransformer,
  EmployeeCreateNewQueueNodeService,
  QueueNodeAuthorizationService,
  MetadataSpecificationFieldDtoTransformer,
  TimespanDtoTransformer,
}

const definitions: DependencyDefinitions<DiEntry> = {
  [DiEntry.MONGOOSE_CONNECTION]: async () => {
    const { DB_URL, DB_PORT, DB_NAME } = process.env;
    return mongoose.createConnection(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      poolSize: 100,
    });
  },
  [DiEntry.AuthorizationRuleMongooseTransformer]: () => new AuthorizationRuleMongooseTransformer(),
  [DiEntry.OrganizationEmployeeRepository]: (container) =>
    new MongooseOrganizationEmployeeRepository(
      container.resolve(DiEntry.MONGOOSE_CONNECTION),
      container.resolve(DiEntry.OrganizationEmployeeMongooseTransformer),
    ),
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
    return new DirectOrganizationEndpointAuthorizationService(container.resolve(DiEntry.AuthorizationRuleRepository));
  },
  [DiEntry.OrganizationEndpointRepository]: (container) => {
    return new MongooseOrganizationEndpointRepository(
      container.resolve(DiEntry.MONGOOSE_CONNECTION),
      container.resolve(DiEntry.OrganizationEndPointMongooseTransformer),
    );
  },
  [DiEntry.OrganizationEmployeeMongooseTransformer]: () => new OrganizationEmployeeMongooseTransformer(),
  [DiEntry.OrganizationEndPointMongooseTransformer]: (container) =>
    new OrganizationEndpointMongooseTransformer(container.resolve(DiEntry.GeolocationMongooseTransformer)),
  [DiEntry.GeolocationMongooseTransformer]: () => new GeolocationMongooseTransformer(),
  [DiEntry.JWT_KEY]: () => {
    const key = process.env.JWT_KEY;
    if (!key) {
      throw new Error("JWT_KEY not defined");
    }
    return key;
  },
  [DiEntry.LoginService]: (container) => new LoginService(container.resolve(DiEntry.OrganizationEmployeeRepository)),
  [DiEntry.OrganizationEmployeeController]: (container) =>
    new OrganizationEmployeeController(
      container.resolve(DiEntry.LoginService),
      container.resolve(DiEntry.RegisterService),
      container.resolve(DiEntry.JwtTokenGenerator),
    ),
  [DiEntry.JwtTokenGenerator]: (container) => new JwtTokenGenerator(container.resolve(DiEntry.JWT_KEY)),
  [DiEntry.PasswordHashFactory]: () => new BCryptPasswordHashFactory(),
  [DiEntry.RegisterService]: (container) =>
    new RegisterService(
      container.resolve(DiEntry.OrganizationEmployeeRepository),
      container.resolve(DiEntry.PasswordHashFactory),
    ),
  [DiEntry.AuthorizationRuleController]: (container) =>
    new AuthorizationRuleController(container.resolve(DiEntry.CreateAuthorizationRuleService)),
  [DiEntry.CreateAuthorizationRuleService]: (container) =>
    new CreateAuthorizationRuleService(
      container.resolve(DiEntry.OrganizationEmployeeRepository),
      container.resolve(DiEntry.AuthorizationRuleRepository),
      container.resolve(DiEntry.EmployeeCreateNewAuthorizationRuleService),
      container.resolve(DiEntry.PermissionDtoTransformer),
    ),
  [DiEntry.EmployeeCreateNewAuthorizationRuleService]: (container) =>
    new EmployeeCreateNewAuthorizationRuleService(container.resolve(DiEntry.AuthorizationRuleAuthorizationService)),
  [DiEntry.AuthorizationRuleAuthorizationService]: (container) =>
    new DirectAuthorizationRuleAuthorizationService(container.resolve(DiEntry.AuthorizationRuleRepository)),
  [DiEntry.PermissionDtoTransformer]: () => new PermissionDtoTransformer(),
  [DiEntry.QueueServerController]: (container) =>
    new QueueServerController(container.resolve(DiEntry.CreateQueueServerService)),
  [DiEntry.CreateQueueServerService]: (container) =>
    new CreateQueueServerService(
      container.resolve(DiEntry.OrganizationEmployeeRepository),
      container.resolve(DiEntry.QueueServerRepository),
      container.resolve(DiEntry.EmployeeCreateNewQueueServerService),
    ),
  [DiEntry.QueueServerRepository]: (container) =>
    new MongooseQueueServerRepository(
      container.resolve(DiEntry.MONGOOSE_CONNECTION),
      container.resolve(DiEntry.QueueServerMongooseTransformer),
    ),
  [DiEntry.QueueServerMongooseTransformer]: () => new QueueServerMongooseTransformer(),
  [DiEntry.EmployeeCreateNewQueueServerService]: (container) =>
    new EmployeeCreateNewQueueServerService(container.resolve(DiEntry.QueueServerAuthorizationService)),
  [DiEntry.QueueServerAuthorizationService]: (container) =>
    new DirectAuthorizationRuleAuthorizationService(container.resolve(DiEntry.AuthorizationRuleRepository)),
  [DiEntry.ClockMongooseTransformer]: () => new ClockMongooseTransformer(),
  [DiEntry.TimespanMongooseTransformer]: (container) =>
    new TimeSpanMongooseTransformer(container.resolve(DiEntry.ClockMongooseTransformer)),
  [DiEntry.MetadataSpecificationFieldMongooseTransformer]: () => new MetadataSpecificationFieldMongooseTransformer(),
  [DiEntry.QueueNodeMongooseTransformer]: (container) =>
    new QueueNodeMongooseTransformer(
      container.resolve(DiEntry.MetadataSpecificationFieldMongooseTransformer),
      container.resolve(DiEntry.TimespanMongooseTransformer),
    ),
  [DiEntry.QueueNodeRepository]: (container) =>
    new MongooseQueueNodeRepository(
      container.resolve(DiEntry.MONGOOSE_CONNECTION),
      container.resolve(DiEntry.QueueNodeMongooseTransformer),
    ),
  [DiEntry.QueueNodeAuthorizationService]: (container) =>
    new DirectQueueNodeAuthorizationService(container.resolve(DiEntry.AuthorizationRuleRepository)),
  [DiEntry.EmployeeCreateNewQueueNodeService]: (container) =>
    new EmployeeCreateNewQueueNodeService(container.resolve(DiEntry.QueueNodeAuthorizationService)),
  [DiEntry.MetadataSpecificationFieldDtoTransformer]: () => new MetadataSpecificationFieldDtoTransformer(),
  [DiEntry.TimespanDtoTransformer]: () => new TimeSpanDtoTransformer(),
  [DiEntry.CreateQueueNodeService]: (container) =>
    new CreateQueueNodeService(
      container.resolve(DiEntry.OrganizationEmployeeRepository),
      container.resolve(DiEntry.QueueNodeRepository),
      container.resolve(DiEntry.EmployeeCreateNewQueueNodeService),
      container.resolve(DiEntry.MetadataSpecificationFieldDtoTransformer),
      container.resolve(DiEntry.TimespanDtoTransformer),
    ),
  [DiEntry.QueueNodeController]: (container) =>
    new QueueNodeController(
      container.resolve(DiEntry.CreateQueueNodeService),
      container.resolve(DiEntry.MetadataSpecificationFieldDtoTransformer),
    ),
};

export default definitions;
