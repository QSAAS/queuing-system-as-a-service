import server from "@app/index.ts";
import UUID from "@app/SharedKernel/ValueObject/UUID";
import cancelledReservationModelFactory
, {
    CancelledReservationDoc,
    CancelledReservationModel,
} from "@app/ReservationArchive/Infrastructure/Persistence/Mongoose/Model/CancelledReservationModel";
import ConnectionManager from "@app/SharedKernel/Infrastructure/Persistence/Mongoose/Connection/ConnectionManager";
import request from "supertest";
import SimpleConnectionManager
    from "@app/SharedKernel/Infrastructure/Persistence/Mongoose/Connection/SimpleConnectionManager";
import ConfigReader from "@app/SharedKernel/Services/ConfigReader";
import CancelledReservationDTO from "@app/ReservationArchive/Application/DataTransferObjects/CancelledReservationDTO";

/**
 * returns a cancelledReservationDTO
 * fields with a defined value in params are assigned as is
 * field with undefined value in params are assigned an arbitrary value
 * @param params field values
 */
function arbitraryCancelledReservationDTOFactory(params?: {
    reservationId?: string,
    clientId?: string,
    queueingNodeId?: string,
    reservationTime?: number,
    serverWastedTime?: number,
}) {
    // assigns params to empty object if it was undefined (not passed to the function)
    // this is to allow accessing object properties with dot notation
    // the properties may not be defined but this is handled below
    // eslint-disable-next-line no-param-reassign
    if (!params) params = {};
    return new CancelledReservationDTO(
        params.reservationId || UUID.create().toString(),
        params.clientId || UUID.create().toString(),
        params.queueingNodeId || UUID.create().toString(),
        params.reservationTime || 1613065024, // unix timestamp
        params.serverWastedTime || 1000,
    ); // amount of seconds;
}

let connectionManager: ConnectionManager;
let cancelledReservationModel: CancelledReservationModel;
const cancelledReservationURL = "/api/archive/cancelled_reservations";

// connecting to database and initializing mongoose model
// server connection is done through running index.ts as a side effect of the import statement
beforeAll(() => {
    connectionManager = new SimpleConnectionManager(ConfigReader.read("DB_URL"));
    cancelledReservationModel = cancelledReservationModelFactory(connectionManager);
});

// closing database and server connections
afterAll(async () => {
    await connectionManager.closeConnection();
    // server.close() doesn't actually terminate the server
    // it only stops the server from accepting new connections
    // open connections due to HTTP header "Connection: Keep-Alive" are alive for a while
    // this is the reason why jest doesn't terminate when tests finish
    // TODO: Either set the "Connection: close" header in every test request
    //  or do some extra work in index.ts (google it)
    await server.close();
});

describe(`POST ${cancelledReservationURL}`, () => {
    let cancelledReservationDTO: CancelledReservationDTO;
    beforeEach(async () => {
        cancelledReservationDTO = arbitraryCancelledReservationDTOFactory();
        await cancelledReservationModel.deleteMany({});
    });

    it("Should save cancelled reservation", async () => {
        await request(server)
            .post(cancelledReservationURL)
            .send(cancelledReservationDTO)
            .expect(200);
        const result: CancelledReservationDoc | null = await cancelledReservationModel.findOne({
            reservationId: cancelledReservationDTO.reservationId,
        });
        expect(result).not.toBeNull();
        expect(result).toMatchObject(cancelledReservationDTO);
    });

    it("Should return 400 bad request on any missing parameter", async () => {
        // TODO: Not sure if it's okay to disable this eslint warning
        //  it says that this foreach loop is runtime heavy or something.
        // eslint-disable-next-line no-restricted-syntax
        for (const parameter of Object.getOwnPropertyNames(cancelledReservationDTO)) {
            const badCancelledReservationDTO = JSON.parse(JSON.stringify(cancelledReservationDTO)); // hacky deep copy
            delete badCancelledReservationDTO[parameter];
            // TODO: can be optimized by firing all requests in loop and awaiting outside of the loop
            // eslint-disable-next-line no-await-in-loop
            await request(server)
                .post(cancelledReservationURL)
                .send(badCancelledReservationDTO)
                .expect(400);
        }
    });

    it("Should return 400 bad request on any invalid parameter", async () => {
        // testing invalid UUIDs
        const idParameters: string[] = ["reservationId", "clientId", "queueingNodeId"];
        // eslint-disable-next-line no-restricted-syntax
        for (const parameter of idParameters) {
            const badCancelledReservationDTO = JSON.parse(JSON.stringify(cancelledReservationDTO)); // hacky deep copy
            badCancelledReservationDTO[parameter] = "1"; // invalid uuid
            // eslint-disable-next-line no-await-in-loop
            await request(server)
                .post(cancelledReservationURL)
                .send(badCancelledReservationDTO)
                .expect(400);
        }
        // testing negative unix timestamp
        const badCancelledReservationDTO = JSON.parse(JSON.stringify(cancelledReservationDTO));
        badCancelledReservationDTO.reservationTime = -1;
        await request(server)
            .post(cancelledReservationURL)
            .send(badCancelledReservationDTO)
            .expect(400);
    });

    it("Should return 400 bad request on duplicate reservationId", async () => {
        await cancelledReservationModel.create(cancelledReservationDTO);
        await request(server)
            .post(cancelledReservationURL)
            .send(cancelledReservationDTO)
            .expect(400);
    });
});

describe(`GET ${cancelledReservationURL}`, () => {
    let clientId: string;
    let cancelledReservations:{
        reservationId: string,
        clientId: string,
        queueingNodeId: string,
        reservationTime: number,
        serverWastedTime: number,
    }[];

    beforeAll(async () => {
        await cancelledReservationModel.deleteMany();

        // creating 3 arbitrary cancelledReservationDTOs for the same client and inserting them in database
        // 2 of the reservations are on the same queuing node
        const cancelledReservationDTO = arbitraryCancelledReservationDTOFactory();
        clientId = cancelledReservationDTO.clientId;
        const onSameQueueingNode = arbitraryCancelledReservationDTOFactory({
            clientId,
            queueingNodeId: cancelledReservationDTO.queueingNodeId,
        });
        const anotherOne = arbitraryCancelledReservationDTOFactory({ clientId });
        cancelledReservations = [cancelledReservationDTO,
            onSameQueueingNode,
            anotherOne];
        await cancelledReservationModel.insertMany(cancelledReservations);
    });

    it("Should retrieve cancelled reservations by client id", async () => {
        const response = await request(server)
            .get(cancelledReservationURL)
            .query({ clientId });
        const { body } = response;
        expect(body).toEqual(cancelledReservations);
    });

    it("Should return nothing for a valid client id with no archived cancelled reservations", async () => {
        clientId = UUID.create().toString();
        const response = await request(server)
            .get(cancelledReservationURL)
            .query({ clientId });
        const { body } = response;
        expect(body.length).toBe(0);
    });

    it("Should return 400 bad request on missing client id", async () => {
        await request(server)
            .get(cancelledReservationURL)
            .query({})
            .expect(400);
    });

    it("Should return 400 bad request on invalid client id", async () => {
        await request(server)
            .get(cancelledReservationURL)
            .query({ clientId: 1 })
            .expect(400);
    });
});
