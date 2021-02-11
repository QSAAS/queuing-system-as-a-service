import ReservationId from "@app/SharedKernel/ValueObject/ReservationId";
import ClientId from "@app/SharedKernel/ValueObject/ClientId";
import QueueingNodeId from "@app/SharedKernel/ValueObject/QueueingNodeId";
import DateTime from "@app/SharedKernel/ValueObject/DateTime";
import QueueServerId from "@app/SharedKernel/ValueObject/QueueServerId";
import OrganizationAccountId from "@app/SharedKernel/ValueObject/OrganizationAccountId";

export default class FinishedReservation {
    private readonly reservationId: ReservationId;

    private readonly clientId: ClientId;

    private readonly queueingNodeId: QueueingNodeId;

    private readonly reservationTime: DateTime;

    private readonly servingStartTime: DateTime;

    private readonly servingFinishTime: DateTime;

    private readonly queueServerId: QueueServerId;

    private readonly serverOperatorId: OrganizationAccountId;

    constructor(reservationId: ReservationId, clientId: ClientId, queueingNodeId: QueueingNodeId,
                reservationTime: DateTime, servingStartTime: DateTime, servingFinishTime: DateTime,
                queueServerId: QueueServerId, serverOperatorId: OrganizationAccountId) {
        this.reservationId = reservationId;
        this.clientId = clientId;
        this.queueingNodeId = queueingNodeId;
        this.reservationTime = reservationTime;
        this.servingStartTime = servingStartTime;
        this.servingFinishTime = servingFinishTime;
        this.queueServerId = queueServerId;
        this.serverOperatorId = serverOperatorId;
    }

    public static from(reservationId: ReservationId, clientId: ClientId, queueingNodeId: QueueingNodeId,
                       reservationTime: DateTime, servingStartTime: DateTime, servingFinishTime: DateTime,
                       queueServerId: QueueServerId, serverOperatorId: OrganizationAccountId): FinishedReservation {
        return new FinishedReservation(reservationId, clientId, queueingNodeId, reservationTime, servingStartTime,
                                       servingFinishTime, queueServerId, serverOperatorId);
    }

    getReservationId(): ReservationId {
        return this.reservationId;
    }

    getClientId(): ClientId {
        return this.clientId;
    }

    getqueueingNodeId(): QueueingNodeId {
        return this.queueingNodeId;
    }

    getReservationTime(): DateTime {
        return this.reservationTime;
    }

    getServingStartTime(): DateTime {
        return this.servingStartTime;
    }

    getServingFinishTime(): DateTime {
        return this.servingFinishTime;
    }

    getQueueServerId(): QueueServerId {
        return this.queueServerId;
    }

    getServerOperatorId(): OrganizationAccountId {
        return this.serverOperatorId;
    }
}
