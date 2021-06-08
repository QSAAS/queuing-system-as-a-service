import OrganizationEndpointUpdated from "@app/Command/Domain/Event/OrganizationEndpointUpdated";
import AdministratedOrganizationEndpointMother
  from "@tests/Command/Domain/Entity/AdministratedOrganizationEndpointMother";
import GeolocationMother from "@tests/Command/Domain/ValueObject/GeolocationMother";
import FailingOrganizationEndpointAuthorizationService
  from "@tests/Command/Infrastructure/FailingOrganizationEndpointAuthorizationService";

describe("AdministratedOrganizationEndpoint", () => {
  describe("Can update name", () => {
    const administratedOrganizationEndpointBuilder = AdministratedOrganizationEndpointMother.withPassingAuth();

    it("Updates name", () => {
      const administratedOrganizationEndpoint = administratedOrganizationEndpointBuilder.build();
      administratedOrganizationEndpoint.setName("::name::");
      expect(administratedOrganizationEndpoint.getName()).toEqual("::name::");
    });

    it("Raises update event", () => {
      const administratedOrganizationEndpoint = administratedOrganizationEndpointBuilder.build();
      administratedOrganizationEndpoint.setName("::name::");
      expect(administratedOrganizationEndpoint.getRaisedEvents()).toHaveLength(1);
      expect(administratedOrganizationEndpoint.getRaisedEvents()[0]).toBeInstanceOf(OrganizationEndpointUpdated);
    });

    it("Rejects unauthorized administrator", () => {
      const administratedOrganizationEndpoint = administratedOrganizationEndpointBuilder
        .withOrganizationEndpointAuthorizationService(new FailingOrganizationEndpointAuthorizationService())
        .build();
      expect(() => { administratedOrganizationEndpoint.setName("::name::"); }).toThrow();
    });
  });

  describe("Can update geolocation", () => {
    const administratedOrganizationEndpointBuilder = AdministratedOrganizationEndpointMother.withPassingAuth();

    it("Updates geolocation", () => {
      const administratedOrganizationEndpoint = administratedOrganizationEndpointBuilder.build();
      const geolocation = GeolocationMother.complete().build();
      administratedOrganizationEndpoint.setGeolocation(geolocation);
      expect(administratedOrganizationEndpoint.getGeolocation()).toEqual(geolocation);
    });

    it("Raises update event", () => {
      const administratedOrganizationEndpoint = administratedOrganizationEndpointBuilder.build();
      const geolocation = GeolocationMother.complete().build();
      administratedOrganizationEndpoint.setGeolocation(geolocation);
      expect((
        () => administratedOrganizationEndpoint.getRaisedEvents()
          .some((e) => e instanceof OrganizationEndpointUpdated)
      )()).toBeTruthy();
    });

    it("Rejects unauthorized administrator", () => {
      const administratedOrganizationEndpoint = administratedOrganizationEndpointBuilder
        .withOrganizationEndpointAuthorizationService(new FailingOrganizationEndpointAuthorizationService())
        .build();
      const geolocation = GeolocationMother.complete().build();
      expect(() => { administratedOrganizationEndpoint.setGeolocation(geolocation); }).toThrow();
    });
  });
});
