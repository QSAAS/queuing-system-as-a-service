import AdministratedQueueServer from "@app/Command/Domain/Entity/AdministratedQueueServer";
import AdministratedQueueServerBuilder from "@tests/Command/Domain/Entity/AdministratedQueueServerBuilder";

describe("test Administrated Queueing Server", () => {
  const administratedQueueServer:AdministratedQueueServer = new
  AdministratedQueueServerBuilder().build();
  describe("Events", () => {
    administratedQueueServer.setServedQueueNodes(administratedQueueServer.getServes());
    it("raise event when update served", () => {
      expect(administratedQueueServer.getRaisedEvents().length).toEqual(1);
    });
  });
});
