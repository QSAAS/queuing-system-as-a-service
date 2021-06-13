import PassingQueueServerAuthorizationService
  from "@tests/Command/Infrastructure/PassingQueueServerAuthorizationService";

import AdministratedQueueServerBuilder from "@tests/Command/Domain/Entity/AdministratedQueueServerBuilder";
import FailingQueueServerAuthorizationService
  from "@tests/Command/Infrastructure/FailingQueueServerAuthorizationService";

export default class AdministratedQueueServerMother {
  public static withPassingAuth(): AdministratedQueueServerBuilder {
    return new AdministratedQueueServerBuilder()
      .withQueueServerAuthorizationService(new PassingQueueServerAuthorizationService());
  }

  public static withFailingAuth(): AdministratedQueueServerBuilder {
    return new AdministratedQueueServerBuilder()
      .withQueueServerAuthorizationService(new FailingQueueServerAuthorizationService());
  }
}
