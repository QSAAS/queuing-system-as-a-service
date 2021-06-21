import express from "express";
import dotenv from "dotenv";
import DependencyInjectionContainer from "@app/Command/Infrastructure/Config/DependencyInjectionContainer";
import DependencyDefinitions from "@app/Command/Infrastructure/Config/DependencyDefinitions";
import createOrganizationEndpointRouter from "@app/Command/Presentation/Api/Routes/OrganizationEndpointRouter";

dotenv.config();

const PORT = process.env.SERVER_PORT || "N/A";

const app = express();
app.use(express.json());

const container = new DependencyInjectionContainer();

container.addDefinitions(DependencyDefinitions).then(() => {
  app.use("/endpoint", createOrganizationEndpointRouter(container));
  app.listen(80, () => {
    console.log(`Server started, forwarding host port ${PORT} to port 80`);
  });
});
