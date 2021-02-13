import server from "@app/index";
import ConnectionManager from "@app/SharedKernel/Infrastructure/Persistence/Mongoose/Connection/ConnectionManager";
import finishedReservationModelFactory, {
    FinishedReservationDoc,
    FinishedReservationModel,
} from "@app/ReservationArchive/Infrastructure/Persistence/Mongoose/Model/FinishedReservationModel";
import SimpleConnectionManager
    from "@app/SharedKernel/Infrastructure/Persistence/Mongoose/Connection/SimpleConnectionManager";
import ConfigReader from "@app/SharedKernel/Services/ConfigReader";
import FinishedReservationDTO from "@app/ReservationArchive/Application/DataTransferObjects/FinishedReservationDTO";
import UUID from "@app/SharedKernel/ValueObject/UUID";
import request from "supertest";

function finishedReservationDTOBuilder(params? : {
    reservationId?: string, clientId?: string,
    queueingNodeId?: string, reservationTime?: number,
    servingStartTime?: number, servingFinishTime?: number,
    queueServerId?: string, serverOperatorId?: string
}): FinishedReservationDTO {
    // eslint-disable-next-line no-param-reassign
    if (!params) params = {};
    return new FinishedReservationDTO(
        params.reservationId || UUID.create().toString(),
        params.clientId || UUID.create().toString(),
        params.queueingNodeId || UUID.create().toString(),
        params.reservationTime || 1613065024, // unix timestamp
        params.servingStartTime || 1613145262, // unix timestamp
        params.servingFinishTime || 1581515662,
        params.queueServerId || UUID.create().toString(),
        params.serverOperatorId || UUID.create().toString(),
    );
}

let connectionManager: ConnectionManager;
let finishedReservationModel: FinishedReservationModel;
const finishedReservationURL = "/api/archive/finished_reservations";

beforeAll(() => {
    connectionManager = new SimpleConnectionManager(ConfigReader.read("DB_URL"));
    finishedReservationModel = finishedReservationModelFactory(connectionManager);
});

afterAll(async () => {
    await connectionManager.closeConnection();
    await server.close();
});

describe(`POST ${finishedReservationURL}`, () => {
    let finishedReservationDTO: FinishedReservationDTO;
    beforeEach(async () => {
        finishedReservationDTO = finishedReservationDTOBuilder();
        await finishedReservationModel.deleteMany({});
    });

    it("Should save finished reservation", async () => {
        await request(server)
            .post(finishedReservationURL)
            .send(finishedReservationDTO)
            .expect(200);
        const result: FinishedReservationDoc | null = await finishedReservationModel.findOne({
            reservationId: finishedReservationDTO.reservationId,
        });
        expect(result).toBeTruthy();
        expect(result).toMatchObject(finishedReservationDTO);
    });

    it("Should return status code 400 on any missing parameter", async () => {
        // eslint-disable-next-line no-restricted-syntax
        for (const parameter of Object.getOwnPropertyNames(finishedReservationDTO)) {
            const badDTO = JSON.parse(JSON.stringify(finishedReservationDTO));
            delete badDTO[parameter];
            // eslint-disable-next-line no-await-in-loop
            await request(server)
                .post(finishedReservationURL)
                .send(badDTO)
                .expect(400);
        }
    });

    it("Should return status code 400 bad request on invalid UUIDs", async () => {
        const idParameters: string[] = ["reservationId", "clientId", "queueingNodeId",
            "queueServerId", "serverOperatorId"];

        // eslint-disable-next-line no-restricted-syntax
        for (const param of idParameters) {
            const badDTO = JSON.parse(JSON.stringify(finishedReservationDTO));
            badDTO[param] = "1";
            // eslint-disable-next-line no-await-in-loop
            await request(server)
                .post(finishedReservationURL)
                .send(badDTO)
                .expect(400);
        }
    });

    it("Should return status code 400 on negative unix timestamp", async () => {
        const timeParameters: string[] = ["reservationTime", "servingStartTime", "servingFinishTime"];

        // eslint-disable-next-line no-restricted-syntax
        for (const param of timeParameters) {
            const badDTO = JSON.parse(JSON.stringify(finishedReservationDTO));
            badDTO[param] = -1; // negative unix timestamp
            // eslint-disable-next-line no-await-in-loop
            await request(server)
                .post(finishedReservationURL)
                .send(badDTO)
                .expect(400);
        }
    });
});

describe(`GET ${finishedReservationURL}`, () => {
    let clientId: string;
    let finishedReservations: FinishedReservationDTO[];

    beforeAll(async () => {
        await finishedReservationModel.deleteMany({});

        // creating 2 reservations for a client
        clientId = UUID.create().toString();
        const dto1 = finishedReservationDTOBuilder({ clientId });
        const dto2 = finishedReservationDTOBuilder({ clientId });

        // creating 1 reservation for a different client
        const clientId2 = UUID.create().toString();
        const dto3 = finishedReservationDTOBuilder({ clientId: clientId2 });

        finishedReservations = [dto1, dto2];

        await finishedReservationModel.insertMany([dto1, dto2, dto3]);
    });

    it("Should retrieve finished reservations by client id with status code 200", async () => {
        const response = await request(server)
            .get(finishedReservationURL)
            .expect(200)
            .query({ clientId });
        const { body } = response;
        expect(body).toEqual(finishedReservations);
    });

    it("Should return an empty container for a valid "
               + "client id with no archived finished reservations with status code 200",
       async () => {
           const id = UUID.create().toString();
           const response = await request(server)
               .get(finishedReservationURL)
               .expect(200)
               .query({ clientId: id });
           const { body } = response;
           expect(body.length).toBe(0);
       });

    it("Should respond with status code 400 on missing client id", async () => {
        await request(server)
            .get(finishedReservationURL)
            .query({})
            .expect(400);
    });

    it("Should respond with status code 400 on invalid client id", async () => {
        await request(server)
            .get(finishedReservationURL)
            .query({ clientId: 1 })
            .expect(400);
    });
});
