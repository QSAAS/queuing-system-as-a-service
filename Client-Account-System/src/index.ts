import express from "express";
import dotenv from "dotenv";
import router from "@app/Command/Presentation/Http/routes";

dotenv.config();

const PORT = process.env.SERVER_PORT || "N/A";

const app = express();
app.use(express.json());

app.use("/client", router);

app.get("/", (request, response) => {
  response.send("Client Account System");
});

app.listen(80, () => {
  console.log(`Server started, forwarding host port ${PORT} to port 80`);
});
