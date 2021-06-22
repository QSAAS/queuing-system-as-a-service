import IGeolocation from "@app/Command/Infrastructure/Repository/Mongoose/Types/IGeolocation";

export default interface IOrganizationEndpoint {
  id: string;
  organizationId: string;
  name: string;
  geolocation: IGeolocation;
}
