import DomainEvent from "@app/Command/Domain/Event/DomainEvent";

function eventsArrayContains<T extends DomainEvent>(
  events: DomainEvent[],
  type: { new(...args: any[]): T },
  testCallback: (event: T) => boolean,
): boolean {
  return events.reduce<boolean>(
    (accumulator, current) => accumulator || (current instanceof type && testCallback(current)),
    false,
  );
}

export default eventsArrayContains;
