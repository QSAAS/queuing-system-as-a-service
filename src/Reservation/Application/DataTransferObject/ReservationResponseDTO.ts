export default class ReservationResponseDTO {
    public reservationId: string;
    public customerId: string;
    public queuingNodeId: string;
    public time: string;
    public numberInQueue: string;
    public verificationCode: string;
    public state: string;


    constructor(reservationId: string, customerId: string, queuingNodeId: string, time: string, numberInQueue: string, verificationCode: string, state: string) {
        this.reservationId = reservationId;
        this.customerId = customerId;
        this.queuingNodeId = queuingNodeId;
        this.time = time;
        this.numberInQueue = numberInQueue;
        this.verificationCode = verificationCode;
        this.state = state;
    }
}