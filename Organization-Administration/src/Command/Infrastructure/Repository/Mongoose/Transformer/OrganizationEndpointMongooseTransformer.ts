import GenericTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/Interface/GenericTransformer";
import IOrganizationEndpoint from "@app/Command/Infrastructure/Repository/Mongoose/Types/IOrganizationEndpoint";
import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import GeolocationMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/GeolocationMongooseTransformer";

export default class OrganizationEndpointMongooseTransformer
  implements GenericTransformer<IOrganizationEndpoint, OrganizationEndpoint>
{
  constructor(private geolocationTransformer: GeolocationMongooseTransformer) {}

  mongooseObjectFrom(instance: OrganizationEndpoint): IOrganizationEndpoint {
    return {
      geolocation: this.geolocationTransformer.mongooseObjectFrom(instance.getGeolocation()),
      name: instance.getName(),
      id: instance.getId().toString(),
      organizationId: instance.getOrganizationId().toString(),
    };
  }

  domainInstanceFrom(object: IOrganizationEndpoint): OrganizationEndpoint {
    return new OrganizationEndpoint(
      OrganizationEndpointId.from(object.id),
      OrganizationEndpointId.from(object.organizationId),
      object.name,
      this.geolocationTransformer.domainInstanceFrom(object.geolocation),
    );
  }
}
