import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";

describe("Geolocation", () => {
  it("Accepts valid lat long", () => {
    expect(() => { Geolocation.create(0, 0); }).not.toThrow();
    expect(() => { Geolocation.create(0, 180); }).not.toThrow();
    expect(() => { Geolocation.create(0, -180); }).not.toThrow();
    expect(() => { Geolocation.create(90, 0); }).not.toThrow();
    expect(() => { Geolocation.create(-90, 0); }).not.toThrow();
  });

  it("Rejects invalid lat", () => {
    expect(() => { Geolocation.create(91, 0); }).toThrow();
    expect(() => { Geolocation.create(-91, 0); }).toThrow();
    expect(() => { Geolocation.create(NaN, 0); }).toThrow();
  });

  it("Rejects invalid long", () => {
    expect(() => { Geolocation.create(0, 181); }).toThrow();
    expect(() => { Geolocation.create(0, -181); }).toThrow();
    expect(() => { Geolocation.create(0, NaN); }).toThrow();
  });
});
