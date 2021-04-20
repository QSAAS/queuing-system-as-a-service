import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.SERVER_PORT || 80;

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Client Account System");
});

app.listen(PORT, () => {
  console.log(`Server started, listening on port ${PORT}`);
});
