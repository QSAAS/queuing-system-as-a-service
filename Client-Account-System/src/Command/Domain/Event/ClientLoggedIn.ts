import Event from "@app/Command/Domain/Event/Event";
import Client from "@app/Command/Domain/Entity/Client";

class ClientLoggedIn extends Event {
  constructor(
    private client: Client,
  ) {
    super();
  }
}

export default ClientLoggedIn;
