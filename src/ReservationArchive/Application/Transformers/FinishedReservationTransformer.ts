import FinishedReservationDTO from "@app/ReservationArchive/Application/DataTransferObjects/FinishedReservationDTO";
import FinishedReservation from "@app/ReservationArchive/Domain/Entity/FinishedReservation";
import ReservationId from "@app/SharedKernel/ValueObject/ReservationId";
import ClientId from "@app/SharedKernel/ValueObject/ClientId";
import QueueingNodeId from "@app/SharedKernel/ValueObject/QueueingNodeId";
import DateTime from "@app/SharedKernel/ValueObject/DateTime";
import QueueServerId from "@app/SharedKernel/ValueObject/QueueServerId";
import OrganizationAccountId from "@app/SharedKernel/ValueObject/OrganizationAccountId";

export default class FinishedReservationTransformer {
    public static toDTO(entity: FinishedReservation): FinishedReservationDTO {
        return new FinishedReservationDTO(entity.getReservationId().toString(),
                                          entity.getClientId().toString(),
                                          entity.getqueueingNodeId().toString(),
                                          entity.getReservationTime().toUnixTime(),
                                          entity.getServingStartTime().toUnixTime(),
                                          entity.getServingFinishTime().toUnixTime(),
                                          entity.getQueueServerId().toString(),
                                          entity.getServerOperatorId().toString());
    }

    public static toEntity(dto: FinishedReservationDTO): FinishedReservation {
        return FinishedReservation.from(ReservationId.from(dto.reservationId),
                                        ClientId.from(dto.clientId),
                                        QueueingNodeId.from(dto.queueingNodeId),
                                        DateTime.from(dto.reservationTime),
                                        DateTime.from(dto.servingStartTime),
                                        DateTime.from(dto.servingFinishTime),
                                        QueueServerId.from(dto.queueServerId),
                                        OrganizationAccountId.from(dto.serverOperatorId));
    }
}
