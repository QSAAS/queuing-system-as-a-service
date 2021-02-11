export default class CancelledReservationDTO {
    // TODO discuss: attribute cancellationTime exists in DTO but not in Entity
    constructor(public readonly reservationId: string, public readonly clientId: string,
                public readonly queueingNodeId: string, public readonly reservationTime: number,
                public readonly serverWastedTime: number) {}
}
