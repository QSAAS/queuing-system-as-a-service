import {
    Connection, Document, Model, Schema,
} from "mongoose";
import FinishedReservation from "@app/ReservationArchive/Domain/Entity/FinishedReservation";
import ReservationId from "@app/SharedKernel/ValueObject/ReservationId";
import ClientId from "@app/SharedKernel/ValueObject/ClientId";
import QueuingNodeId from "@app/SharedKernel/ValueObject/QueuingNodeId";
import DateTime from "@app/SharedKernel/ValueObject/DateTime";
import QueueServerId from "@app/SharedKernel/ValueObject/QueueServerId";
import OrganizationAccountId from "@app/SharedKernel/ValueObject/OrganizationAccountId";
import ConnectionManager from "@app/SharedKernel/Infrastructure/Persistence/Mongoose/Connection/ConnectionManager";

export interface FinishedReservationDoc extends Document {
    reservationId: string;

    clientId: string;

    queuingNodeId: string;

    reservationTime: number;

    servingStartTime: number;

    servingFinishTime: number;

    queueServerId: string;

    serverOperatorId: string;
}

const finishedReservationSchema: Schema<FinishedReservationDoc> = new Schema(
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
            type: Number,
            required: true,
        },
        servingStartTime: {
            type: Number,
            required: true,
        },
        servingFinishTime: {
            type: Number,
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
    },
    { collection: "FinishedReservations" },
);

export interface FinishedReservationModel extends Model<FinishedReservationDoc> {
    toFinishedReservationEntity(finishedReservation: FinishedReservationDoc): FinishedReservation;

    toFinishedReservationDoc(finishedReservation: FinishedReservation): FinishedReservationDoc
}

function toFinishedReservationEntity(finishedReservation: FinishedReservationDoc): FinishedReservation {
    return FinishedReservation.from(ReservationId.from(finishedReservation.reservationId),
                                    ClientId.from(finishedReservation.clientId),
                                    QueuingNodeId.from(finishedReservation.queuingNodeId),
                                    DateTime.from(finishedReservation.reservationTime),
                                    DateTime.from(finishedReservation.servingStartTime),
                                    DateTime.from(finishedReservation.servingFinishTime),
                                    QueueServerId.from(finishedReservation.queueServerId),
                                    OrganizationAccountId.from(finishedReservation.serverOperatorId));
}

function toFinishedReservationDoc(this: Model<FinishedReservationDoc>,
    finishedReservation: FinishedReservation): FinishedReservationDoc {
    return new this({
        reservationId: finishedReservation.getReservationId().toString(),

        clientId: finishedReservation.getClientId().toString(),
        queuingNodeId: finishedReservation.getQueuingNodeId().toString(),

        reservationTime: finishedReservation.getReservationTime()
            .toUnixTimeStamp(),

        servingStartTime: finishedReservation.getServingStartTime()
            .toUnixTimeStamp(),

        servingFinishTime: finishedReservation.getServingFinishTime()
            .toUnixTimeStamp(),

        queueServerId: finishedReservation.getQueueServerId().toString(),

        serverOperatorId: finishedReservation.getQueueServerId()
            .toString(),
    });
}

finishedReservationSchema.statics.toFinishedReservationEntity = toFinishedReservationEntity;
finishedReservationSchema.statics.toFinishedReservationDoc = toFinishedReservationDoc;

export default function FinishedReservationModelFactory(
    connectionManager: ConnectionManager,
): FinishedReservationModel {
    const connection: Connection = connectionManager.getConnection();
    return connection.model<FinishedReservationDoc, FinishedReservationModel>("FinishedReservationModel",
                                                                              finishedReservationSchema);
}
