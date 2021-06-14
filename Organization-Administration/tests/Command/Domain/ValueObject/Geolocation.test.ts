import GeolocationMother from "@tests/Command/Domain/ValueObject/Mother/GeolocationMother";

describe("Geolocation", () => {
  it("Accepts valid lat long", () => {
    expect(() => {
      GeolocationMother.complete().build();
    }).not.toThrow();
    expect(() => {
      GeolocationMother.complete().withLatitude(-90).build();
    }).not.toThrow();
    expect(() => {
      GeolocationMother.complete().withLatitude(90).build();
    }).not.toThrow();
    expect(() => {
      GeolocationMother.complete().withLongitude(180).build();
    }).not.toThrow();
    expect(() => {
      GeolocationMother.complete().withLongitude(-180).build();
    }).not.toThrow();
  });

  it("Rejects invalid lat", () => {
    expect(() => {
      GeolocationMother.complete().withLatitude(91).build();
    }).toThrow();
    expect(() => {
      GeolocationMother.complete().withLatitude(-91).build();
    }).toThrow();
    expect(() => {
      GeolocationMother.complete().withLatitude(NaN).build();
    }).toThrow();
  });

  it("Rejects invalid long", () => {
    expect(() => {
      GeolocationMother.complete().withLongitude(181).build();
    }).toThrow();
    expect(() => {
      GeolocationMother.complete().withLongitude(-181).build();
    }).toThrow();
    expect(() => {
      GeolocationMother.complete().withLongitude(NaN).build();
    }).toThrow();
  });
});
