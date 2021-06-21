import express from "express";
import dotenv from "dotenv";
import { registerDependencies } from "@app/Command/Infrastructure/DependencyDefinitions";

dotenv.config();

const PORT = process.env.SERVER_PORT || "N/A";

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Organization Administration");
});

registerDependencies().then(() => {
  app.listen(80, () => {
    console.log(`Server started, forwarding host port ${PORT} to port 80`);
  });
});
