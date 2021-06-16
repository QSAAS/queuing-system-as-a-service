import GeolocationDTO from "@app/Command/Application/DataTransferObject/Object/GeolocationDTO";

export default class CreateOrganizationEndpointRequest {
  constructor(public adminId: string, public name: string, public geolocation: GeolocationDTO) {}
}
