import {
    Connection, Document, Model, Schema,
} from "mongoose";
import ConnectionManager from "@app/SharedKernel/Infrastructure/Persistence/Mongoose/Connection/ConnectionManager";
import CancelledReservation from "@app/ReservationArchive/Domain/Entity/CancelledReservation";
import ReservationId from "@app/SharedKernel/ValueObject/ReservationId";
import ClientId from "@app/SharedKernel/ValueObject/ClientId";
import QueuingNodeId from "@app/SharedKernel/ValueObject/QueuingNodeId";
import DateTime from "@app/SharedKernel/ValueObject/DateTime";
import Duration from "@app/SharedKernel/ValueObject/Duration";

export interface CancelledReservationDoc extends Document {
    reservationId: string;

    clientId: string;

    queuingNodeId: string;

    reservationTime: string;

    serverWastedTime: number;
}

const cancelledReservationSchema: Schema<CancelledReservationDoc> = new Schema(
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

export interface CancelledReservationModel extends Model<CancelledReservationDoc> {
    toCancelledReservationEntity(cancelledReservation: CancelledReservationDoc): CancelledReservation;

    toCancelledReservationDoc(cancelledReservation: CancelledReservation): CancelledReservationDoc;
}

function toCancelledReservationEntity(cancelledReservation: CancelledReservationDoc): CancelledReservation {
    return CancelledReservation.from(ReservationId.from(cancelledReservation.reservationId),
                                     ClientId.from(cancelledReservation.clientId),
                                     QueuingNodeId.from(cancelledReservation.queuingNodeId),
                                     DateTime.from(cancelledReservation.reservationTime),
                                     Duration.from(cancelledReservation.serverWastedTime));
}

function toCancelledReservationDoc(this: Model<CancelledReservationDoc>,
    cancelledReservation: CancelledReservation): CancelledReservationDoc {
    return new this({
        reservationId: cancelledReservation.getReservationId().toString(),

        clientId: cancelledReservation.getClientId().toString(),
        queuingNodeId: cancelledReservation.getQueuingNodeId().toString(),

        reservationTime: cancelledReservation.getReservationTime()
            .toString(),

        serverWastedTime: cancelledReservation.getServerWastedTime()
            .toNumber(),
    });
}

cancelledReservationSchema.statics.toCancelledReservationDoc = toCancelledReservationDoc;

cancelledReservationSchema.statics.toCancelledReservationEntity = toCancelledReservationEntity;

export default function cancelledReservationModelFactory(
    connectionManager: ConnectionManager,
): CancelledReservationModel {
    const connection: Connection = connectionManager.getConnection();
    return connection.model<CancelledReservationDoc, CancelledReservationModel>("CancelledReservationModel",
                                                                                cancelledReservationSchema);
}
