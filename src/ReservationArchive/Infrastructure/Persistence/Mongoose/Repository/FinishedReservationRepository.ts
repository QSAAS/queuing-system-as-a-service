import IFinishedReservationRepository from "@app/ReservationArchive/Domain/Service/IFinishedReservationRepository";
import ClientId from "@app/SharedKernel/ValueObject/ClientId";
import FinishedReservation from "@app/ReservationArchive/Domain/Entity/FinishedReservation";
import PersistenceError from "@app/ReservationArchive/Domain/Error/Persistence/PersistenceError";
import {
    FinishedReservationDoc,
    FinishedReservationModel,
} from "@app/ReservationArchive/Infrastructure/Persistence/Mongoose/Model/FinishedReservationModel";

export default class FinishedReservationRepository implements IFinishedReservationRepository {
    private readonly FinishedReservationModel: FinishedReservationModel;

    constructor(model: FinishedReservationModel) {
        this.FinishedReservationModel = model;
    }

    public async getClientReservations(clientId: ClientId): Promise<FinishedReservation[]> {
        try {
            const finishedReservationDocs: FinishedReservationDoc[] = await this.FinishedReservationModel.find(
                    { clientId: clientId.toString() },
            );
            const finishedReservations: FinishedReservation[] = [];
            for (let i = 0; i < finishedReservationDocs.length; ++i) {
                finishedReservations.push(
                        this.FinishedReservationModel.toFinishedReservationEntity(finishedReservationDocs[i]),
                );
            }
            return finishedReservations;
        } catch (e) {
            throw new PersistenceError("Read error");
        }
    }

    public async save(finishedReservation: FinishedReservation): Promise<void> {
        const finishedReservationDoc: FinishedReservationDoc = this.FinishedReservationModel.toFinishedReservationDoc(
                finishedReservation,
        );
        try {
            await finishedReservationDoc.save();
        } catch (e) {
            throw new PersistenceError("Save error");
        }
    }
}
