import Transformer from "@app/Command/Application/Transformer/Transformer";
import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";
import GeolocationDTO from "@app/Command/Application/DataTransferObject/Object/GeolocationDTO";

export default class GeolocationDtoTransformer implements Transformer<Geolocation, GeolocationDTO> {
  toDTO(object: Geolocation): GeolocationDTO {
    return new GeolocationDTO(object.getLatitude(), object.getLongitude());
  }

  toObject(dto: GeolocationDTO): Geolocation {
    return new Geolocation(dto.latitude, dto.longitude);
  }
}
