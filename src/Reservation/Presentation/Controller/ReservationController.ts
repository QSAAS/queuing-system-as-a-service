import {Request, Response} from "express";
import MakeAReservationRequestDTO from "../../Application/DataTransferObject/MakeAReservationRequestDTO";
import MetadataDTO from "../../Application/DataTransferObject/MetadataDTO";
import MakeAReservationService from "../../Application/Service/MakeAReservationService";

export class ReservationController {
    private makeAReservationService: MakeAReservationService;

    constructor(
        makeAReservationService: MakeAReservationService,
    ) {
        this.makeAReservationService = makeAReservationService;
    }

    makeAReservation(request: Request, response: Response): void{
        const dto = new MakeAReservationRequestDTO(
            request.body.customerId,
            request.body.queuingNodeId,
            new MetadataDTO(request.body.metadata)
        );
        const responseDTO = this.makeAReservationService.run(dto);
        const json = JSON.stringify(responseDTO);
        response.status(200);
        response.send(json);
    }
}
