import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";

export default class GeolocationBuilder {
  constructor(private latitude: number = 0,
    private longitude: number = 0) {}

  public withLatitude(latitude: number): GeolocationBuilder {
    this.latitude = latitude;
    return this;
  }

  public withLongitude(longitude: number): GeolocationBuilder {
    this.longitude = longitude;
    return this;
  }

  public build(): Geolocation {
    return Geolocation.create(this.latitude, this.longitude);
  }
}
