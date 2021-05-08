import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";

export default class Geolocation extends ValueObject {
  private latitude: number;
  private longitude: number;

  constructor(latitude: number, longitude: number) {
    super();
    this.latitude = latitude;
    this.longitude = longitude;
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
