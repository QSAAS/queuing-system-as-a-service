import OrganizationEndpointAuthorizationService
  from "@app/Command/Application/Service/OrganizationEndpointAuthorizationService";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import AdministratedOrganizationEndpoint from "@app/Command/Domain/Entity/AdministratedOrganizationEndpoint";
import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";
import OrganizationEndpointUpdated from "@app/Command/Domain/Event/OrganizationEndpointUpdated";

class MockOrganizationEndpointAuthorizationService implements OrganizationEndpointAuthorizationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ensureCanEdit = jest.fn((organizationEmployee: OrganizationEmployee,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    administratedOrganizationEndpoint: AdministratedOrganizationEndpoint) => {
  });
}

describe("AdministratedOrganizationEndpoint", () => {
  describe("Can update name", () => {
    const administratedOrganizationEndpoint = new AdministratedOrganizationEndpoint(new OrganizationEmployee(),
      new OrganizationEndpoint(new OrganizationEndpointId("::id::"),
        new OrganizationId("::id::"),
        "::name::",
        new Geolocation(0, 0)),
      new MockOrganizationEndpointAuthorizationService());

    it("Updates name", () => {
      administratedOrganizationEndpoint.setName("::name::");
      expect(administratedOrganizationEndpoint.getName()).toEqual("::name::");
    });

    it("Raises update event", () => {
      const mockRaiseEvent = jest.fn();
      administratedOrganizationEndpoint.raiseEvent = mockRaiseEvent;
      administratedOrganizationEndpoint.setName("::name::");
      expect(administratedOrganizationEndpoint.raiseEvent).toBeCalled();
      expect(mockRaiseEvent.mock.calls[0][0]).toBeInstanceOf(OrganizationEndpointUpdated);
    });

    it("Authorizes the administrator", () => {
      administratedOrganizationEndpoint.setName("::name::");
      expect(administratedOrganizationEndpoint
        .getOrganizationEndpointAuthorizationService()
        .ensureCanEdit)
        .toBeCalled();
    });
  });

  describe("Can update geolocation", () => {
    const administratedOrganizationEndpoint = new AdministratedOrganizationEndpoint(new OrganizationEmployee(),
      new OrganizationEndpoint(new OrganizationEndpointId("::id::"),
        new OrganizationId("::id::"),
        "::name::",
        new Geolocation(0, 0)),
      new MockOrganizationEndpointAuthorizationService());
    const geolocation = new Geolocation(1, 1);

    it("Updates geolocation", () => {
      administratedOrganizationEndpoint.setGeolocation(geolocation);
      expect(administratedOrganizationEndpoint.getGeolocation()).toEqual(geolocation);
    });

    it("Raises update event", () => {
      const mockRaiseEvent = jest.fn();
      administratedOrganizationEndpoint.raiseEvent = mockRaiseEvent;
      administratedOrganizationEndpoint.setGeolocation(geolocation);
      expect(mockRaiseEvent).toBeCalled();
      expect(mockRaiseEvent.mock.calls[0][0]).toBeInstanceOf(OrganizationEndpointUpdated);
    });

    it("Authorizes the administrator", () => {
      administratedOrganizationEndpoint.setGeolocation(geolocation);
      expect(administratedOrganizationEndpoint
        .getOrganizationEndpointAuthorizationService()
        .ensureCanEdit)
        .toBeCalled();
    });
  });
});
