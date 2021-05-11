import GeolocationBuilder from "@tests/Command/Domain/ValueObject/GeolocationBuilder";
import GeolocationMother from "@tests/Command/Domain/ValueObject/GeolocationMother";

describe("Geolocation", () => {
  const geolocationBuilder: GeolocationBuilder = GeolocationMother.complete();

  it("Accepts valid lat long", () => {
    expect(() => { geolocationBuilder.build(); }).not.toThrow();
    expect(() => {
      geolocationBuilder
        .withLatitude(-90)
        .build();
    }).not.toThrow();
    expect(() => {
      geolocationBuilder
        .withLatitude(90)
        .build();
    }).not.toThrow();
    expect(() => {
      geolocationBuilder
        .withLongitude(180)
        .build();
    }).not.toThrow();
    expect(() => {
      geolocationBuilder
        .withLongitude(-180)
        .build();
    }).not.toThrow();
  });

  it("Rejects invalid lat", () => {
    expect(() => {
      geolocationBuilder
        .withLatitude(91)
        .build();
    }).toThrow();
    expect(() => {
      geolocationBuilder
        .withLatitude(-91)
        .build();
    }).toThrow();
    expect(() => {
      geolocationBuilder
        .withLatitude(NaN)
        .build();
    }).toThrow();
  });

  it("Rejects invalid long", () => {
    expect(() => {
      geolocationBuilder
        .withLongitude(181)
        .build();
    }).toThrow();
    expect(() => {
      geolocationBuilder
        .withLongitude(-181)
        .build();
    }).toThrow();
    expect(() => {
      geolocationBuilder
        .withLongitude(NaN)
        .build();
    }).toThrow();
  });
});
