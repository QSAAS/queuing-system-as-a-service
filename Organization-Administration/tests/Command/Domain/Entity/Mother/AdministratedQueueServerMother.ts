import PassingQueueServerAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/PassingQueueServerAuthorizationService";

import AdministratedQueueServerBuilder from "@tests/Command/Domain/Entity/Builder/AdministratedQueueServerBuilder";
import FailingQueueServerAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/FailingQueueServerAuthorizationService";

export default class AdministratedQueueServerMother {
  public static withPassingAuth(): AdministratedQueueServerBuilder {
    return new AdministratedQueueServerBuilder().withQueueServerAuthorizationService(
      new PassingQueueServerAuthorizationService(),
    );
  }

  public static withFailingAuth(): AdministratedQueueServerBuilder {
    return new AdministratedQueueServerBuilder().withQueueServerAuthorizationService(
      new FailingQueueServerAuthorizationService(),
    );
  }
}
