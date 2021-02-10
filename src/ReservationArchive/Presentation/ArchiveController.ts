import { Request, Response } from "express";
import CancelledReservationDTO from "@app/ReservationArchive/Application/DataTransferObjects/CancelledReservationDTO";
import ArchiveCancelledReservationService
    from "@app/ReservationArchive/Application/Services/ArchiveCancelledReservationService";
import ArchiveFinishedReservationService
    from "@app/ReservationArchive/Application/Services/ArchiveFinishedReservationService";
import FinishedReservationDTO from "@app/ReservationArchive/Application/DataTransferObjects/FinishedReservationDTO";

export default class ReservationArchiveController {
    public async archiveCancelledReservation(request: Request, response: Response,
                                             service: ArchiveCancelledReservationService): Promise<void> {
        const { body } = request;
        const dto = new CancelledReservationDTO(body.reservationId, body.clientId, body.queueingNodeId,
                                                body.reservationTime, body.serverWastedTime);
        await service.run(dto);
        response.status(200).send();
    }

    public async archiveFinishedReservation(request: Request, response: Response,
                                            service: ArchiveFinishedReservationService): Promise<void> {
        const { body } = request;
        const dto = new FinishedReservationDTO(body.reservationId, body.clientId,
                                               body.queueingNodeId, body.reservationTime,
                                               body.servingStartTime, body.servingFinishTime,
                                               body.queueServerId, body.serverOperatorId);
        try {
            await service.run(dto);
        } catch (e) {
            response.status(400).send();
        }
        response.status(200).send();
    }
}
