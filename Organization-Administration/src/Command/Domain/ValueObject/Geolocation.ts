import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";

export default class Geolocation extends ValueObject {
  private latitude: number;
  private longitude: number;

  constructor(latitude: number, longitude: number) {
    super();
    if (latitude < -90 || latitude > 90) {
      throw new RangeError(`value ${latitude} outside of latitude range [-90, 90]`);
    }
    if (longitude < -180 || longitude > 180) {
      throw new RangeError(`value ${longitude} outside of longitude range [-180, 180]`);
    }
    this.latitude = latitude;
    this.longitude = longitude;
  }

  static create(latitude: number, longitude: number) {
    return new Geolocation(latitude, longitude);
  }

  public getLatitude(): number {
    return this.latitude;
  }

  public getLongitude(): number {
    return this.longitude;
  }

  public equals(other: this): boolean {
    return this.getLatitude() === other.getLatitude() && this.getLongitude() === other.getLongitude();
  }
}
