import {
    Connection, Document, Model, Schema,
} from "mongoose";
import FinishedReservation from "@app/ReservationArchive/Domain/Entity/FinishedReservation";
import ReservationId from "@app/SharedKernel/ValueObject/ReservationId";
import ClientId from "@app/SharedKernel/ValueObject/ClientId";
import QueueingNodeId from "@app/SharedKernel/ValueObject/QueueingNodeId";
import DateTime from "@app/SharedKernel/ValueObject/DateTime";
import QueueServerId from "@app/SharedKernel/ValueObject/QueueServerId";
import OrganizationAccountId from "@app/SharedKernel/ValueObject/OrganizationAccountId";
import ConnectionManager from "@app/SharedKernel/Infrastructure/Persistence/Mongoose/Connection/ConnectionManager";

export interface FinishedReservationDoc extends Document {
    reservationId: string;

    clientId: string;

    queueingNodeId: string;

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
        queueingNodeId: {
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
                                    QueueingNodeId.from(finishedReservation.queueingNodeId),
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
        queueingNodeId: finishedReservation.getqueueingNodeId().toString(),

        reservationTime: finishedReservation.getReservationTime()
            .toUnixTime(),

        servingStartTime: finishedReservation.getServingStartTime()
            .toUnixTime(),

        servingFinishTime: finishedReservation.getServingFinishTime()
            .toUnixTime(),

        queueServerId: finishedReservation.getQueueServerId().toString(),

        serverOperatorId: finishedReservation.getServerOperatorId()
            .toString(),
    });
}

finishedReservationSchema.statics.toFinishedReservationEntity = toFinishedReservationEntity;
finishedReservationSchema.statics.toFinishedReservationDoc = toFinishedReservationDoc;

export default function finishedReservationModelFactory(
    connectionManager: ConnectionManager,
): FinishedReservationModel {
    const connection: Connection = connectionManager.getConnection();
    return connection.model<FinishedReservationDoc, FinishedReservationModel>("FinishedReservationModel",
                                                                              finishedReservationSchema);
}
