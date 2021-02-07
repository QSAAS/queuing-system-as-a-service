import { Model, Schema, Document } from "mongoose";
import ICancelledReservationRepository from "@app/ReservationArchive/Domain/Service/CancelledReservationRepository";
import ConnectionManager from "@app/SharedKernel/Infrastructure/Persistence/Mongoose/Connection/ConnectionManager";
import ClientId from "@app/SharedKernel/ValueObject/ClientId";
import CancelledReservation from "@app/ReservationArchive/Domain/Entity/CancelledReservation";
import PersistenceError from "@app/ReservationArchive/Domain/Error/Persistence/PersistenceError";
import ReservationId from "@app/SharedKernel/ValueObject/ReservationId";
import QueuingNodeId from "@app/SharedKernel/ValueObject/QueuingNodeId";
import DateTime from "@app/SharedKernel/ValueObject/DateTime";
import Duration from "@app/SharedKernel/ValueObject/Duration";

interface ICancelledReservationDoc extends Document {
    reservationId: string;

    clientId: string;

    queuingNodeId: string;

    reservationTime: string;

    serverWastedTime: number;
}

const cancelledReservationSchema: Schema<ICancelledReservationDoc> = new Schema(
    {
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
        serverWastedTime: {
            type: Number,
            required: true,
        },
    },
    { collection: "CancelledReservations" },
);

export default class CancelledReservationRepository implements ICancelledReservationRepository {
    private readonly CancelledReservationModel: Model<ICancelledReservationDoc>;

    constructor(connectionManager: ConnectionManager) {
        const connection = connectionManager.getConnection();
        this.CancelledReservationModel = connection.model<ICancelledReservationDoc>("CancelledReservation",
                                                                                    cancelledReservationSchema);
    }

    public async getClientReservations(clientId: ClientId): Promise<CancelledReservation[]> {
        try {
            const cancelledReservationDocs: ICancelledReservationDoc[] = await this.CancelledReservationModel.find(
                { clientId: clientId.toString() },
            );
            const cancelledReservations: CancelledReservation[] = [];
            for (let i = 0; i < cancelledReservationDocs.length; ++i) {
                cancelledReservations.push(this.toCancelledReservationEntity(cancelledReservationDocs[i]));
            }
            return cancelledReservations;
        } catch (e) {
            throw new PersistenceError("Read error");
        }
    }

    public async save(cancelledReservation: CancelledReservation): Promise<void> {
        const cancelledReservationDoc: ICancelledReservationDoc = this.toICancelledReservationDoc(cancelledReservation);
        try {
            await cancelledReservationDoc.save();
        } catch (e) {
            throw new PersistenceError("Save error");
        }
    }

    private toCancelledReservationEntity(cancelledReservation: ICancelledReservationDoc): CancelledReservation {
        return CancelledReservation.from(ReservationId.from(cancelledReservation.reservationId),
                                         ClientId.from(cancelledReservation.clientId),
                                         QueuingNodeId.from(cancelledReservation.queuingNodeId),
                                         DateTime.from(cancelledReservation.reservationTime),
                                         Duration.from(cancelledReservation.serverWastedTime));
    }

    private toICancelledReservationDoc(cancelledReservation: CancelledReservation): ICancelledReservationDoc {
        return new this.CancelledReservationModel({
            reservationId: cancelledReservation.getReservationId().toString(),

            clientId: cancelledReservation.getClientId().toString(),
            queuingNodeId: cancelledReservation.getQueuingNodeId().toString(),

            reservationTime: cancelledReservation.getReservationTime()
                .toString(),

            serverWastedTime: cancelledReservation.getServerWastedTime()
                .toNumber(),
        });
    }
}
