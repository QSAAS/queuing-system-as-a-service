import ReservationId from "@app/SharedKernel/ValueObject/ReservationId";
import QueueingNodeId from "@app/SharedKernel/ValueObject/QueueingNodeId";
import DateTime from "@app/SharedKernel/ValueObject/DateTime";
import Duration from "@app/SharedKernel/ValueObject/Duration";
import ClientId from "@app/SharedKernel/ValueObject/ClientId";

export default class CancelledReservation {
    private readonly reservationId: ReservationId;

    private readonly clientId: ClientId;

    private readonly queueingNodeId: QueueingNodeId;

    private readonly reservationTime: DateTime;

    private readonly serverWastedTime: Duration;

    constructor(reservationId: ReservationId, clientId: ClientId, queueingNodeId: QueueingNodeId,
                reservationTime: DateTime, serverWastedTime: Duration) {
        this.reservationId = reservationId;
        this.clientId = clientId;
        this.queueingNodeId = queueingNodeId;
        this.reservationTime = reservationTime;
        this.serverWastedTime = serverWastedTime;
    }

    public static from(reservationId: ReservationId, clientId: ClientId, queueingNodeId: QueueingNodeId,
                       reservationTime: DateTime, serverWastedTime: Duration) {
        return new CancelledReservation(reservationId, clientId, queueingNodeId, reservationTime, serverWastedTime);
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

    getServerWastedTime(): Duration {
        return this.serverWastedTime;
    }
}
