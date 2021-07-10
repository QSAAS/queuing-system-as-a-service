import express from "express";
import "express-async-errors"
import createOrganizationAdministrationRouter from "@app/Command/Presentation/Api/Routes/Router";
import dotenv from "dotenv";

dotenv.config();

export default async function createApp(){
  const app = express();
  app.use(express.json());
  app.use("/administration", await createOrganizationAdministrationRouter());
  return app;
}
