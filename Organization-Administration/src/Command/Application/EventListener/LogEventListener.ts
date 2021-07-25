import EventListener from "@app/Command/Application/EventListener/EventListener";
import { IncomingEvent } from "@app/Command/Domain/Service/EventBus";

interface EmployeeCreated extends IncomingEvent {
  data: {
    createdAt: string;
    employee: {
      id: string;
      organizationId: string;
      name: string;
      passwordHash: string;
      username: string;
    };
  };
}

export default class LogEventListener implements EventListener<EmployeeCreated> {
  async execute(event: EmployeeCreated): Promise<void> {
    console.log("GOT EVENT", event, event.data, event.data.employee);
  }
}
