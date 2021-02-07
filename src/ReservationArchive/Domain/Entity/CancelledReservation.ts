import ReservationId from "@app/SharedKernel/ValueObject/ReservationId";
import QueuingNodeId from "@app/SharedKernel/ValueObject/QueuingNodeId";
import DateTime from "@app/SharedKernel/ValueObject/DateTime";
import Duration from "@app/SharedKernel/ValueObject/Duration";
import ClientId from "@app/SharedKernel/ValueObject/ClientId";

export default class CancelledReservation {
    private readonly reservationId: ReservationId;

    private readonly clientId: ClientId;

    private readonly queuingNodeId: QueuingNodeId;

    private readonly reservationTime: DateTime;

    private readonly serverWastedTime: Duration;

    constructor(reservationId: ReservationId, clientId: ClientId, queuingNodeId: QueuingNodeId,
                reservationTime: DateTime, serverWastedTime: Duration) {
        this.reservationId = reservationId;
        this.clientId = clientId;
        this.queuingNodeId = queuingNodeId;
        this.reservationTime = reservationTime;
        this.serverWastedTime = serverWastedTime;
    }

    public static from(reservationId: ReservationId, clientId: ClientId, queuingNodeId: QueuingNodeId,
                       reservationTime: DateTime, serverWastedTime: Duration) {
        return new CancelledReservation(reservationId, clientId, queuingNodeId, reservationTime, serverWastedTime);
    }

    getReservationId(): ReservationId {
        return this.reservationId;
    }

    getClientId(): ClientId {
        return this.clientId;
    }

    getQueuingNodeId(): QueuingNodeId {
        return this.queuingNodeId;
    }

    getReservationTime(): DateTime {
        return this.reservationTime;
    }

    getServerWastedTime(): Duration {
        return this.serverWastedTime;
    }
}
