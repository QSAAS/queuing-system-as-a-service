import express from "express";
import "express-async-errors"
import dotenv from "dotenv";
import createOrganizationAdministrationRouter from "@app/Command/Presentation/Api/Routes/Router";

dotenv.config();

const PORT = process.env.SERVER_PORT || "N/A";

const app = express();
app.use(express.json());

app.use("/administration", createOrganizationAdministrationRouter())

  app.listen(80, () => {
    console.log(`Server started, forwarding host port ${PORT} to port 80`);
  });
