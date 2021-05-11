import OrganizationEndpointUpdated from "@app/Command/Domain/Event/OrganizationEndpointUpdated";
import AdministratedOrganizationEndpointMother
  from "@tests/Command/Domain/Entity/AdministratedOrganizationEndpointMother";
import GeolocationMother from "@tests/Command/Domain/ValueObject/GeolocationMother";

describe("AdministratedOrganizationEndpoint", () => {
  describe("Can update name", () => {
    it("Updates name", () => {
      const administratedOrganizationEndpointBuilder = AdministratedOrganizationEndpointMother.withPassingAuth();
      const administratedOrganizationEndpoint = administratedOrganizationEndpointBuilder.build();
      administratedOrganizationEndpoint.setName("::name::");
      expect(administratedOrganizationEndpoint.getName()).toEqual("::name::");
    });

    it("Raises update event", () => {
      const administratedOrganizationEndpointBuilder = AdministratedOrganizationEndpointMother.withPassingAuth();
      const administratedOrganizationEndpoint = administratedOrganizationEndpointBuilder.build();
      administratedOrganizationEndpoint.setName("::name::");
      expect(administratedOrganizationEndpoint.getRaisedEvents()).toHaveLength(1);
      expect(administratedOrganizationEndpoint.getRaisedEvents()[0]).toBeInstanceOf(OrganizationEndpointUpdated);
    });

    it("Rejects unauthorized administrator", () => {
      const administratedOrganizationEndpointBuilder = AdministratedOrganizationEndpointMother.withFailingAuth();
      const administratedOrganizationEndpoint = administratedOrganizationEndpointBuilder.build();
      expect(() => { administratedOrganizationEndpoint.setName("::name::"); }).toThrow();
    });
  });

  describe("Can update geolocation", () => {
    it("Updates geolocation", () => {
      const administratedOrganizationEndpointBuilder = AdministratedOrganizationEndpointMother.withPassingAuth();
      const administratedOrganizationEndpoint = administratedOrganizationEndpointBuilder.build();
      const geolocation = GeolocationMother.complete().build();
      administratedOrganizationEndpoint.setGeolocation(geolocation);
      expect(administratedOrganizationEndpoint.getGeolocation()).toEqual(geolocation);
    });

    it("Raises update event", () => {
      const administratedOrganizationEndpointBuilder = AdministratedOrganizationEndpointMother.withPassingAuth();
      const administratedOrganizationEndpoint = administratedOrganizationEndpointBuilder.build();
      const geolocation = GeolocationMother.complete().build();
      administratedOrganizationEndpoint.setGeolocation(geolocation);
      expect(administratedOrganizationEndpoint.getRaisedEvents()).toHaveLength(1);
      expect(administratedOrganizationEndpoint.getRaisedEvents()[0]).toBeInstanceOf(OrganizationEndpointUpdated);
    });

    it("Rejects unauthorized administrator", () => {
      const administratedOrganizationEndpointBuilder = AdministratedOrganizationEndpointMother.withFailingAuth();
      const administratedOrganizationEndpoint = administratedOrganizationEndpointBuilder.build();
      const geolocation = GeolocationMother.complete().build();
      expect(() => { administratedOrganizationEndpoint.setGeolocation(geolocation); }).toThrow();
    });
  });
});
