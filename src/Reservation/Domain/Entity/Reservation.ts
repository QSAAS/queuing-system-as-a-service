import CustomerId from "../ValueObject/CustomerId";
import QueuingNodeId from "../ValueObject/QueuingNodeId";
import ReservationId from "../ValueObject/ReservationId";
import NumberInQueue from "../ValueObject/NumberInQueue";
import VerificationCode from "../ValueObject/VerificationCode";
import {ReservationState} from "../ValueObject/ReservationState";
import Metadata from "../ValueObject/Metadata";

export default class Reservation{
    private _reservationId: ReservationId;
    private _customerId: CustomerId;
    private _queuingNodeId: QueuingNodeId;
    private _time: Date;
    private _numberInQueue: NumberInQueue;
    private _verificationCode: VerificationCode;
    private _metadata: Metadata;
    private _state: ReservationState;

    constructor(reservationId: ReservationId, customerId: CustomerId, queuingNodeId: QueuingNodeId, time: Date, numberInQueue: NumberInQueue, verificationCode: VerificationCode, metadata: Metadata,state: ReservationState) {
        this._reservationId = reservationId;
        this._customerId = customerId;
        this._queuingNodeId = queuingNodeId;
        this._time = time;
        this._numberInQueue = numberInQueue;
        this._verificationCode = verificationCode;
        this._metadata = metadata;
        this._state = state;
    }

    setAsFinished(){
        this._state = ReservationState.FINISHED;
    }

    get reservationId(): ReservationId {
        return this._reservationId;
    }

    get customerId(): CustomerId {
        return this._customerId;
    }

    get queuingNodeId(): QueuingNodeId {
        return this._queuingNodeId;
    }

    get time(): Date {
        return this._time;
    }

    get numberInQueue(): NumberInQueue {
        return this._numberInQueue;
    }

    get verificationCode(): VerificationCode {
        return this._verificationCode;
    }

    get state(): ReservationState {
        return this._state;
    }
}