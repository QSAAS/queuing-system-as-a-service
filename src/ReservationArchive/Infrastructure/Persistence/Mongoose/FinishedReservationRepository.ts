import IFinishedReservationRepository from "@app/ReservationArchive/Domain/Service/FinishedReservationRepository";
import ClientId from "@app/SharedKernel/ValueObject/ClientId";
import FinishedReservation from "@app/ReservationArchive/Domain/Entity/FinishedReservation";
import {
    Connection, Document, Model, Schema,
} from "mongoose";
import DateTime from "@app/SharedKernel/ValueObject/DateTime";
import OrganizationAccountId from "@app/SharedKernel/ValueObject/OrganizationAccountId";
import ReservationId from "@app/SharedKernel/ValueObject/ReservationId";
import QueuingNodeId from "@app/SharedKernel/ValueObject/QueuingNodeId";
import QueueServerId from "@app/SharedKernel/ValueObject/QueueServerId";
import ConnectionManager
    from "@app/SharedKernel/Infrastructure/Persistence/Mongoose/Connection/ConnectionManager";
import PersistenceError from "@app/ReservationArchive/Domain/Error/Persistence/PersistenceError";

interface IFinishedReservationDoc extends Document {
    reservationId: string;

    clientId: string;

    queuingNodeId: string;

    reservationTime: string;

    servingStartTime: string;

    servingFinishTime: string;

    queueServerId: string;

    serverOperatorId: string;
}

const finishedReservationSchema: Schema<IFinishedReservationDoc> = new Schema({
    reservationId: {
        type: String,
        required: true,
        unique: true,
    },
    clientId: {
        type: String,
        required: true,
    },
    queuingNodeId: {
        type: String,
        required: true,
    },
    reservationTime: {
        type: String,
        required: true,
    },
    servingStartTime: {
        type: String,
        required: true,
    },
    servingFinishTime: {
        type: String,
        required: true,
    },
    queueServerId: {
        type: String,
        required: true,
    },
    serverOperatorId: {
        type: String,
        required: true,
    },
}, { collection: "FinishedReservations" });
export default class FinishedReservationRepository implements IFinishedReservationRepository {
    private readonly FinishedReservationModel: Model<IFinishedReservationDoc>;

    constructor(connectionManager: ConnectionManager) {
        const connection: Connection = connectionManager.getConnection();
        this.FinishedReservationModel = connection.model<IFinishedReservationDoc>("FinishedReservations",
                                                                                  finishedReservationSchema);
    }

    public async getClientReservations(clientId: ClientId): Promise<FinishedReservation[]> {
        try {
            const finishedReservationDocs: IFinishedReservationDoc[] = await this.FinishedReservationModel.find(
                { clientId: clientId.toString() },
            );
            const finishedReservations: FinishedReservation[] = [];
            for (let i = 0; i < finishedReservationDocs.length; ++i) {
                finishedReservations.push(this.toFinishedReservationEntity(finishedReservationDocs[i]));
            }
            return finishedReservations;
        } catch (e) {
            throw new PersistenceError("Read error");
        }
    }

    public async save(finishedReservation: FinishedReservation): Promise<void> {
        const finishedReservationDoc: IFinishedReservationDoc = this.toIFinishedReservationDoc(finishedReservation);
        try {
            await finishedReservationDoc.save();
        } catch (e) {
            throw new PersistenceError("Save error");
        }
    }

    private toFinishedReservationEntity(finishedReservation: IFinishedReservationDoc): FinishedReservation {
        return FinishedReservation.from(ReservationId.from(finishedReservation.reservationId),
                                        ClientId.from(finishedReservation.clientId),
                                        QueuingNodeId.from(finishedReservation.queuingNodeId),
                                        DateTime.from(finishedReservation.reservationTime),
                                        DateTime.from(finishedReservation.servingStartTime),
                                        DateTime.from(finishedReservation.servingFinishTime),
                                        QueueServerId.from(finishedReservation.queueServerId),
                                        OrganizationAccountId.from(finishedReservation.serverOperatorId));
    }

    private toIFinishedReservationDoc(finishedReservation: FinishedReservation): IFinishedReservationDoc {
        return new this.FinishedReservationModel({
            reservationId: finishedReservation.getReservationId().toString(),

            clientId: finishedReservation.getClientId().toString(),
            queuingNodeId: finishedReservation.getQueuingNodeId().toString(),

            reservationTime: finishedReservation.getReservationTime().toString(),

            servingStartTime: finishedReservation.getServingStartTime().toString(),

            servingFinishTime: finishedReservation.getServingFinishTime().toString(),

            queueServerId: finishedReservation.getQueueServerId().getString(),

            serverOperatorId: finishedReservation.getQueueServerId().getString(),
        });
    }
}
