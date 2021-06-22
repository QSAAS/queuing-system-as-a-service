import GenericTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/Interface/GenericTransformer";
import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";
import IGeolocation from "@app/Command/Infrastructure/Repository/Mongoose/Types/IGeolocation";

export default class GeolocationTransformer implements GenericTransformer<IGeolocation, Geolocation> {
  mongooseObjectFrom(instance: Geolocation): IGeolocation {
    return {
      latitude: instance.getLatitude(),
      longitude: instance.getLongitude(),
    };
  }

  domainInstanceFrom(object: IGeolocation): Geolocation {
    return new Geolocation(object.latitude, object.longitude);
  }
}
