import AdministratedQueueNodeBuilder from "@tests/Builders/AdministratedQueueNodeBuilder";
import PassingQueueNodeAuthorizationService from "@tests/Command/Infrastructure/PassingQueueNodeAuthorizationService";
import FailingQueueNodeAuthorizationService from "@tests/Command/Infrastructure/FailingQueueNodeAuthorizationService";

export default class AdministratedQueueNodeMother {
  public static withPassingAuth() {
    return new AdministratedQueueNodeBuilder().withAuthService(new PassingQueueNodeAuthorizationService());
  }

  public static withFailingAuth() {
    return new AdministratedQueueNodeBuilder().withAuthService(new FailingQueueNodeAuthorizationService());
  }
}
