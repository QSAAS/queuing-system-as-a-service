import AdministratedQueueServer from "@app/Command/Domain/Entity/AdministratedQueueServer";

import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import AdministratedQueueServerMother from "@tests/Command/Domain/Entity/AdministratedQueueServerMother";

describe("test Administrated Queueing Server", () => {
  describe("Events", () => {
    const administratedQueueServer : AdministratedQueueServer = AdministratedQueueServerMother
      .withPassingAuth().build();
    administratedQueueServer.setServedQueueNodes(administratedQueueServer.getServes());
    it("raise event when update served", () => {
      expect(administratedQueueServer.getRaisedEvents().length).toEqual(1);
    });
  });

  describe("Exceptions", () => {
    it("throws exception when QueueAdministratedAuthorizationService fails", () => {
      const administratedQueueServer : AdministratedQueueServer = AdministratedQueueServerMother
        .withFailingAuth().build();
      administratedQueueServer.setServedQueueNodes(administratedQueueServer.getServes());
      expect(administratedQueueServer).toThrow(EmployeeNotAuthorizedError);
    });
  });
});
