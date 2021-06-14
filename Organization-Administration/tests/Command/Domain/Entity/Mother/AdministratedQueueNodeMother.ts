import AdministratedQueueNodeBuilder from "@tests/Command/Domain/Entity/Builder/AdministratedQueueNodeBuilder";
import PassingQueueNodeAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/PassingQueueNodeAuthorizationService";
import FailingQueueNodeAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/FailingQueueNodeAuthorizationService";

export default class AdministratedQueueNodeMother {
  public static withPassingAuth() {
    return new AdministratedQueueNodeBuilder().withAuthService(new PassingQueueNodeAuthorizationService());
  }

  public static withFailingAuth() {
    return new AdministratedQueueNodeBuilder().withAuthService(new FailingQueueNodeAuthorizationService());
  }
}
