import { Document } from "mongoose";

export default interface IFinishedReservation extends Document {
    reservationId: string;

    clientId: string;

    queuingNodeId: string;

    reservationTime: string;

    servingStartTime: string;

    servingFinishTime: string;

    queueServerId: string;

    serverOperatorId: string;
}
