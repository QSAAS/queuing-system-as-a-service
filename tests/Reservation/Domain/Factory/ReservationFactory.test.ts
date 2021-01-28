import { validate as uuidValidate } from "uuid";
import ReservationFactory from "../../../../src/Reservation/Domain/Factory/ReservationFactory";
import CustomerId from "../../../../src/Reservation/Domain/ValueObject/CustomerId";
import QueuingNodeBuilder from "../Entity/QueuingNodeBuilder";
import Metadata from "../../../../src/Reservation/Domain/ValueObject/Metadata";
import MockReservationRepository from "../../Infrastructure/Persistence/MockReservationRepository";

describe("Can create new reservation for customer", () => {
    test("Creates new valid uuid", () => {
        const sut = new ReservationFactory();
        const queueingNode = new QueuingNodeBuilder().build();
        const customerId = CustomerId.from("XYZ");
        const metadata = new Metadata({ national_id: "123" });
        const reservation = sut.newReservationForCustomer(
            new MockReservationRepository(),
            queueingNode,
            customerId,
            metadata,
        );
        expect(uuidValidate(reservation.reservationId.getString())).toBe(true);
    });
});
