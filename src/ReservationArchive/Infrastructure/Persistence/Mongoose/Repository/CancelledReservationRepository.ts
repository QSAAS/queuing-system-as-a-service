import ICancelledReservationRepository from "@app/ReservationArchive/Domain/Service/ICancelledReservationRepository";
import ClientId from "@app/SharedKernel/ValueObject/ClientId";
import CancelledReservation from "@app/ReservationArchive/Domain/Entity/CancelledReservation";
import {
    CancelledReservationModel,
    CancelledReservationDoc,
} from "@app/ReservationArchive/Infrastructure/Persistence/Mongoose/Model/CancelledReservationModel";

export default class CancelledReservationRepository implements ICancelledReservationRepository {
    private readonly CancelledReservationModel: CancelledReservationModel;

    constructor(cancelledReservationModel: CancelledReservationModel) {
        this.CancelledReservationModel = cancelledReservationModel;
    }

    public async getClientReservations(clientId: ClientId): Promise<CancelledReservation[]> {
        const cancelledReservationDocs: CancelledReservationDoc[] = await this.CancelledReservationModel.find(
            { clientId: clientId.toString() },
        );
        const cancelledReservations: CancelledReservation[] = [];
        for (let i = 0; i < cancelledReservationDocs.length; ++i) {
            cancelledReservations.push(
                this.CancelledReservationModel.toCancelledReservationEntity(cancelledReservationDocs[i]),
            );
        }
        return cancelledReservations;
    }

    public async save(cancelledReservation: CancelledReservation): Promise<void> {
        const cancelledReservationDoc = this.CancelledReservationModel.toCancelledReservationDoc(
            cancelledReservation,
        );
        await cancelledReservationDoc.save();
    }
}
