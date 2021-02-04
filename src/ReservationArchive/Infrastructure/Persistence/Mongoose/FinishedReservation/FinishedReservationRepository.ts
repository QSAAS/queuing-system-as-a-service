import IFinishedReservationRepository from "@app/ReservationArchive/Domain/Service/FinishedReservationRepository";
import ClientId from "@app/ReservationArchive/SharedKernel/ClientId";
import FinishedReservation from "@app/ReservationArchive/Domain/Entity/FinishedReservation";
import IFinishedReservation
    from "@app/ReservationArchive/Infrastructure/Persistence/Mongoose/FinishedReservation/IFinishedReservation";
import {
    Connection, Model, Promise, Schema,
} from "mongoose";
import { finished } from "stream";
import DateTime from "@app/ReservationArchive/SharedKernel/DateTime";
import OrganizationAccountId from "@app/ReservationArchive/SharedKernel/OrganizationAccountId";
import ReservationId from "@app/ReservationArchive/SharedKernel/ReservationId";
import QueuingNodeId from "@app/ReservationArchive/SharedKernel/QueuingNodeId";
import QueueServerId from "@app/ReservationArchive/SharedKernel/QueueServerId";

export default class FinishedReservationRepository implements IFinishedReservationRepository {
    private readonly connection: Connection;

    private readonly model: Model<IFinishedReservation>;

    constructor(connection: Connection, finishedReservationSchema: Schema<IFinishedReservation>) {
        this.connection = connection;
        // probably bad design. but gotta move fast for now.
        this.model = connection.model<IFinishedReservation>("FinishedReservations", finishedReservationSchema);
    }

    public getClientReservations(clientId: ClientId): Promise<FinishedReservation[]> {
        return Promise.resolve([]);
    }

    public async save(finishedReservation: FinishedReservation): Promise<IFinishedReservation> {
        try {
            await this.model.save();
        } catch (e) {
            throw e;
        }
    }

    private toFinishedReservationEntity(finishedReservation: IFinishedReservation): FinishedReservation {
        return FinishedReservation.from(ReservationId.from(finishedReservation.reservationId),
                                        ClientId.from(finishedReservation.clientId),
                                        QueuingNodeId.from(finishedReservation.queuingNodeId),
                                        DateTime.from(finishedReservation.reservationTime),
                                        DateTime.from(finishedReservation.servingStartTime),
                                        DateTime.from(finishedReservation.servingFinishTime),
                                        QueueServerId.from(finishedReservation.queueServerId),
                                        OrganizationAccountId.from(finishedReservation.serverOperatorId));
    }
}
