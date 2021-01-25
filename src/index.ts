import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import clientRouter from "./Client/Presentation/routes";

dotenv.config();

const serverPort: string | undefined = process.env.SERVER_PORT;
if (!serverPort) {
    console.log("dotenv could not read SERVER_PORT");
    process.exit(1);
}

const dbURL: string | undefined = process.env.DB_URL;
if (!dbURL) {
    console.log("dotenv could not read DB_URL");
    process.exit(1);
}

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("Connected to MongoDB", dbURL))
    .catch((reason) => console.log(reason));

const app = express();

app.use(express.json());
app.use("/api/clients", clientRouter);

app.listen(serverPort, () => {
    console.log(`Server started, listening on ${serverPort}`);
});
