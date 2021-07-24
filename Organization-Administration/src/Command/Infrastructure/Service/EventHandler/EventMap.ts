import LogEventListener from "@app/Command/Application/EventListener/LogEventListener";

const EventMap = {
  OrganizationEmployeeCreated: [new LogEventListener()],
};

export default EventMap;
