export default class FinishedReservationDTO {
    constructor(public readonly reservationId: string, public readonly clientId: string,
                public readonly queueingNodeId: string, public readonly reservationTime: number,
                public readonly servingStartTime: number, public readonly servingFinishTime: number,
                public readonly queueServerId: string, public readonly serverOperatorId: string) {}
}
