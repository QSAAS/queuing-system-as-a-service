import express from "express";
import ConfigReader from "@app/SharedKernel/Services/ConfigReader";
import archiveRouter from "@app/ReservationArchive/Presentation/routes";

const app = express();
app.use(express.json());
app.use("/api/archive", archiveRouter);

const port = ConfigReader.read("SERVER_PORT");
const httpServer = app.listen(port, () => {
    console.log(`Server started, listening on ${port}`);
});

export default httpServer;
