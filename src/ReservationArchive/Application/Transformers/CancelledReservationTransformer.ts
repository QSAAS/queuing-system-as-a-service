import CancelledReservation from "@app/ReservationArchive/Domain/Entity/CancelledReservation";
import CancelledReservationDTO from "@app/ReservationArchive/Application/DataTransferObjects/CancelledReservationDTO";
import ReservationId from "@app/SharedKernel/ValueObject/ReservationId";
import ClientId from "@app/SharedKernel/ValueObject/ClientId";
import QueuingNodeId from "@app/SharedKernel/ValueObject/QueuingNodeId";
import DateTime from "@app/SharedKernel/ValueObject/DateTime";
import Duration from "@app/SharedKernel/ValueObject/Duration";

export default class CancelledReservationTransformer {
    public static toDTO(cancelledReservation: CancelledReservation): CancelledReservationDTO {
        return new CancelledReservationDTO(cancelledReservation.getReservationId().toString(),
                                           cancelledReservation.getClientId().toString(),
                                           cancelledReservation.getQueuingNodeId().toString(),
                                           cancelledReservation.getReservationTime().toUnixTime(),
                                           cancelledReservation.getServerWastedTime().toNumber());
    }

    public static toEntity(dto: CancelledReservationDTO): CancelledReservation {
        return CancelledReservation.from(
            ReservationId.from(dto.reservationId),
            ClientId.from(dto.clientId),
            QueuingNodeId.from(dto.queueingNodeId),
            DateTime.from(dto.reservationTime.toString()),
            Duration.from(dto.serverWastedTime),
        );
    }
}
