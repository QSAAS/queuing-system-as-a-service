import { Router, Request, Response } from "express";
import ReservationArchiveController from "@app/ReservationArchive/Presentation/ArchiveController";
import ConnectionManager from "@app/SharedKernel/Infrastructure/Persistence/Mongoose/Connection/ConnectionManager";
import SingletonConnectionManager
    from "@app/SharedKernel/Infrastructure/Persistence/Mongoose/Connection/SingletonConnectionManager";
import cancelledReservationModelFactory
    from "@app/ReservationArchive/Infrastructure/Persistence/Mongoose/Model/CancelledReservationModel";
import ArchiveCancelledReservationService
    from "@app/ReservationArchive/Application/Services/ArchiveCancelledReservationService";
import MongooseCancelledReservationRepo
    from "@app/ReservationArchive/Infrastructure/Persistence/Mongoose/Repository/CancelledReservationRepository";
import MongooseFinishedReservationRepo
    from "@app/ReservationArchive/Infrastructure/Persistence/Mongoose/Repository/FinishedReservationRepository";
import ConfigReader from "@app/SharedKernel/Services/ConfigReader";
import finishedReservationModelFactory
    from "@app/ReservationArchive/Infrastructure/Persistence/Mongoose/Model/FinishedReservationModel";
import ArchiveFinishedReservationService
    from "@app/ReservationArchive/Application/Services/ArchiveFinishedReservationService";

const router = Router();
const dbURL: string = ConfigReader.read("DB_URL");
const controller: ReservationArchiveController = new ReservationArchiveController();

router.post("/cancelled_reservations", async (request: Request, response: Response) => {
    const connectionManager: ConnectionManager = new SingletonConnectionManager(dbURL);
    const cancelledReservationModel = cancelledReservationModelFactory(connectionManager);
    const service = new ArchiveCancelledReservationService(
        new MongooseCancelledReservationRepo(cancelledReservationModel),
    );
    await controller.archiveCancelledReservation(request, response, service);
});

router.post("/finished_reservations", async (request: Request, response: Response) => {
    const connectionManager: ConnectionManager = new SingletonConnectionManager(dbURL);
    const finishedReservationModel = finishedReservationModelFactory(connectionManager);
    const service = new ArchiveFinishedReservationService(
        new MongooseFinishedReservationRepo(finishedReservationModel),
    );
    await controller.archiveFinishedReservation(request, response, service);
});

export default router;
