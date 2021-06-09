import GeolocationBuilder from "@tests/Command/Domain/ValueObject/GeolocationBuilder";

export default class GeolocationMother {
  public static complete(): GeolocationBuilder {
    return new GeolocationBuilder()
      .withLatitude(0)
      .withLongitude(0);
  }
}
