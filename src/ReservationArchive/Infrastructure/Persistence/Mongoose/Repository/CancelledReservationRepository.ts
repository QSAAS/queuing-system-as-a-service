import ICancelledReservationRepository from "@app/ReservationArchive/Domain/Service/CancelledReservationRepository";
import ClientId from "@app/SharedKernel/ValueObject/ClientId";
import CancelledReservation from "@app/ReservationArchive/Domain/Entity/CancelledReservation";
import PersistenceError from "@app/ReservationArchive/Domain/Error/Persistence/PersistenceError";
import {
    CancelledReservationModel,
    CancelledReservationDoc
} from "@app/ReservationArchive/Infrastructure/Persistence/Mongoose/Model/CancelledReservationModel";

export default class CancelledReservationRepository implements ICancelledReservationRepository {
    private readonly CancelledReservationModel: CancelledReservationModel;

    constructor(CancelledReservationModel: CancelledReservationModel) {
        this.CancelledReservationModel = CancelledReservationModel;
    }

    public async getClientReservations(clientId: ClientId): Promise<CancelledReservation[]> {
        try {
            const cancelledReservationDocs: CancelledReservationDoc[] = await this.CancelledReservationModel.find(
                    { clientId: clientId.toString() },
            );
            const cancelledReservations: CancelledReservation[] = [];
            for (let i = 0; i < cancelledReservationDocs.length; ++i) {
                cancelledReservations.push(
                        this.CancelledReservationModel.toCancelledReservationEntity(cancelledReservationDocs[i]));
            }
            return cancelledReservations;
        } catch (e) {
            throw new PersistenceError("Read error");
        }
    }

    public async save(cancelledReservation: CancelledReservation): Promise<void> {
        const cancelledReservationDoc: CancelledReservationDoc = this.CancelledReservationModel.toCancelledReservationDoc(
                cancelledReservation);
        try {
            await cancelledReservationDoc.save();
        } catch (e) {
            throw new PersistenceError("Save error");
        }
    }
}
