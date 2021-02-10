import FinishedReservationDTO from "@app/ReservationArchive/Application/DataTransferObjects/FinishedReservationDTO";
import FinishedReservation from "@app/ReservationArchive/Domain/Entity/FinishedReservation";
import ReservationId from "@app/SharedKernel/ValueObject/ReservationId";
import ClientId from "@app/SharedKernel/ValueObject/ClientId";
import QueuingNodeId from "@app/SharedKernel/ValueObject/QueuingNodeId";
import DateTime from "@app/SharedKernel/ValueObject/DateTime";
import QueueServerId from "@app/SharedKernel/ValueObject/QueueServerId";
import OrganizationAccountId from "@app/SharedKernel/ValueObject/OrganizationAccountId";

export default class FinishedReservationTransformer {
    public static toEntity(dto: FinishedReservationDTO): FinishedReservation {
        return FinishedReservation.from(ReservationId.from(dto.reservationId),
                                        ClientId.from(dto.clientId),
                                        QueuingNodeId.from(dto.queueingNodeId),
                                        DateTime.from(dto.reservationTime.toString()),
                                        DateTime.from(dto.servingStartTime.toString()),
                                        DateTime.from(dto.servingFinishTime.toString()),
                                        QueueServerId.from(dto.queueServerId),
                                        OrganizationAccountId.from(dto.serverOperatorId));
    }
}
