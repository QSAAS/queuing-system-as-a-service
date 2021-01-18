import ReservationRepository from "../Repositories/ReservationRepository";
import QueuingNode from "../Entity/QueuingNode";
import CustomerId from "../ValueObject/CustomerId";
import Metadata from "../ValueObject/Metadata";
import Reservation from "../Entity/Reservation";
import ReservationId from "../ValueObject/ReservationId";
import VerificationCode from "../ValueObject/VerificationCode";
import {ReservationState} from "../ValueObject/ReservationState";

export default class ReservationFactory {

    newReservationForCustomer(
        reservationRepository: ReservationRepository,
        queuingNode: QueuingNode,
        customerId: CustomerId,
        metadata: Metadata
    ): Reservation {
        const numberInQueue = queuingNode.getNext();
        const verificationCode = new VerificationCode("123");
        // todo raise reservation created event
        // todo preconditions
        return new Reservation(
            ReservationId.create(),
            customerId,
            queuingNode.getId(),
            new Date(Date.now()),
            numberInQueue,
            verificationCode,
            metadata,
            ReservationState.ACTIVE
        );
    }
}