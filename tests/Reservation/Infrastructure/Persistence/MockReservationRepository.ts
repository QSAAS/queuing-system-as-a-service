import ReservationRepository from "../../../../src/Reservation/Domain/Repositories/ReservationRepository";
import Reservation from "../../../../src/Reservation/Domain/Entity/Reservation";
import CustomerId from "../../../../src/Reservation/Domain/ValueObject/CustomerId";
import QueuingNodeId from "../../../../src/Reservation/Domain/ValueObject/QueuingNodeId";

export default class MockReservationRepository implements ReservationRepository {
    private reservations: Reservation[];

    constructor() {
        this.reservations = [];
    }

    getActiveByCustomerIdAndQueuingNodeId(customerId: CustomerId, queuingNodeId: QueuingNodeId): Reservation {
        for (const reservation of this.reservations) {
            if (reservation.customerId == customerId && reservation.queuingNodeId == queuingNodeId) {
                return reservation;
            }
        }
        throw new Error("Reservation not found"); // todo to be of type ReservationNotFoundError
    }

    save(reservation: Reservation): void {
        for (let i = 0; i < this.reservations.length; ++i) {
            if (this.reservations[i].reservationId == reservation.reservationId) {
                throw new Error("Reservation already exists");
            }
        }
        this.reservations.push(reservation);
    }
}
