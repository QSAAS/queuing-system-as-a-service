import Reservation from "../../Domain/Entity/Reservation";
import ReservationResponseDTO from "../DataTransferObject/ReservationResponseDTO";
import { ReservationState } from "../../Domain/ValueObject/ReservationState";

export default class ReservationDTOTransformer {
    toReservationDTO(reservation: Reservation) {
        return new ReservationResponseDTO(
            reservation.reservationId.getString(),
            reservation.customerId.getString(),
            reservation.queuingNodeId.getString(),
            reservation.time.toISOString(),
            reservation.numberInQueue.getString(),
            reservation.verificationCode.getString(),
            ReservationState[reservation.state],
        );
    }
}
