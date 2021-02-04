import { Schema } from "mongoose";
import IFinishedReservation
    from "@app/ReservationArchive/Infrastructure/Persistence/Mongoose/FinishedReservation/IFinishedReservation";
import FinishedReservation from "@app/ReservationArchive/Domain/Entity/FinishedReservation";

const FinishedReservationSchema: Schema<IFinishedReservation> = new Schema({
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
});

export default FinishedReservationSchema;
