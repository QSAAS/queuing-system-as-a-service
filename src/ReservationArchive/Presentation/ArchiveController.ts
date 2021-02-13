import { Request, Response } from "express";
import CancelledReservationDTO from "@app/ReservationArchive/Application/DataTransferObjects/CancelledReservationDTO";
import ArchiveCancelledReservationService
    from "@app/ReservationArchive/Application/Services/ArchiveCancelledReservationService";
import ArchiveFinishedReservationService
    from "@app/ReservationArchive/Application/Services/ArchiveFinishedReservationService";
import FinishedReservationDTO from "@app/ReservationArchive/Application/DataTransferObjects/FinishedReservationDTO";
import GetCancelledReservationsService
    from "@app/ReservationArchive/Application/Services/GetCancelledReservationsService";
import ClientIdDTO from "@app/ReservationArchive/Application/DataTransferObjects/ClientIdDTO";
import GetFinishedReservationsService
    from "@app/ReservationArchive/Application/Services/GetFinishedReservationsService";

export default class ReservationArchiveController {
    public async archiveCancelledReservation(request: Request, response: Response,
                                             service: ArchiveCancelledReservationService): Promise<void> {
        const { body } = request;
        const dto = new CancelledReservationDTO(body.reservationId, body.clientId, body.queueingNodeId,
                                                body.reservationTime, body.serverWastedTime);
        try {
            await service.run(dto);
            response.status(200).send();
        } catch (e) {
            // TODO: Log these exceptions (Maybe only in debug mode?)
            response.status(400).send(e.message);
        }
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
            response.status(200).send();
        } catch (e) {
            response.status(400).send(e.message);
        }
    }

    public async getCancelledReservations(request: Request, response: Response,
                                          service: GetCancelledReservationsService): Promise<void> {
        const { query } = request;

        if (!query.clientId) {
            response.status(400).send();
            return;
        }

        // TODO discuss: query.clientId returns string | string[] | ParsedQs | ParsedQs[]
        const dto = new ClientIdDTO(query.clientId.toString());
        try {
            const ret: CancelledReservationDTO[] = await service.run(dto);
            response.status(200).send(ret);
        } catch (e) {
            // TODO: Log these exceptions (Maybe only in debug mode?)
            response.status(400).send(e.message);
        }
    }

    public async getFinishedReservations(request: Request, response: Response,
                                         service: GetFinishedReservationsService): Promise<void> {
        const { query } = request;
        if (!query.clientId) {
            response.status(400).send();
            return;
        }

        const dto = new ClientIdDTO(query.clientId.toString());
        try {
            const ret: FinishedReservationDTO[] = await service.run(dto);
            response.status(200).send(ret);
        } catch (e) {
            response.status(400).send(e.message);
        }
    }
}
