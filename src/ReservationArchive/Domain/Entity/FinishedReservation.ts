import ReservationId from "@app/ReservationArchive/SharedKernel/ReservationId";
import ClientId from "@app/ReservationArchive/SharedKernel/ClientId";
import QueuingNodeId from "@app/ReservationArchive/SharedKernel/QueuingNodeId";
import DateTime from "@app/ReservationArchive/SharedKernel/DateTime";
import QueueServerId from "@app/ReservationArchive/SharedKernel/QueueServerId";
import OrganizationAccountId from "@app/ReservationArchive/SharedKernel/OrganizationAccountId";

export default class FinishedReservation {
    private readonly reservationId: ReservationId;

    private readonly clientId: ClientId;

    private readonly queuingNodeId: QueuingNodeId;

    private readonly reservationTime: DateTime;

    private readonly servingStartTime: DateTime;

    private readonly servingFinishTime: DateTime;

    private readonly queueServerId: QueueServerId;

    private readonly serverOperatorId: OrganizationAccountId;

    constructor(reservationId: ReservationId, clientId: ClientId, queuingNodeId: QueuingNodeId,
                reservationTime: DateTime, servingStartTime: DateTime, servingFinishTime: DateTime,
                queueServerId: QueueServerId, serverOperatorId: OrganizationAccountId) {
        this.reservationId = reservationId;
        this.clientId = clientId;
        this.queuingNodeId = queuingNodeId;
        this.reservationTime = reservationTime;
        this.servingStartTime = servingStartTime;
        this.servingFinishTime = servingFinishTime;
        this.queueServerId = queueServerId;
        this.serverOperatorId = serverOperatorId;
    }

    public from(reservationId: ReservationId, clientId: ClientId, queuingNodeId: QueuingNodeId,
                reservationTime: DateTime, servingStartTime: DateTime, servingFinishTime: DateTime,
                queueServerId: QueueServerId, serverOperatorId: OrganizationAccountId): FinishedReservation {
        return new FinishedReservation(reservationId, clientId, queuingNodeId, reservationTime, servingStartTime,
                                       servingFinishTime, queueServerId, serverOperatorId);
    }
}
