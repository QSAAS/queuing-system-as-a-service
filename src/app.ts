import express from "express";
import {default as ReservationRouter} from "./Reservation/Presentation/routes";

const app = express();

app.use(express.json());
app.use("/reservation", ReservationRouter);

app.listen(8080, ()=>{
    console.log("Started");
});