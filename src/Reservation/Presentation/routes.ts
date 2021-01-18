import express from "express";
import {Reservation} from "./Controller/Reservation";

// const express = express();

const router = express.Router();

router.post("/", (request) => {
    const controller = new Reservation();
    return controller.makeAReservation(request);
});

export default router;