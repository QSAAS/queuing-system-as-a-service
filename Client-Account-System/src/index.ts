import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
const port = process.env.SERVER_PORT || 8080;
app.get("/", (request, response) => {
    response.send("hello world");
});
app.get("/database-health", (request, response) => {
    const dbUrl: string | undefined = process.env.DB_URL;
    const { DB_PORT } = process.env;
    const { DB_NAME } = process.env;
    const connectionString = `mongodb://${dbUrl}:${DB_PORT}/${DB_NAME}`;
    if (dbUrl) {
        mongoose.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(() => {
                console.log(`connected to ${dbUrl} successfully`);
                response.send(`connected to ${dbUrl} successfully`);
            }).catch((e) => {
            console.log(`we faced an error in connecting to db ${e}`);
        });
    } else {
        // fixme handle the case of failure in env variables

    }
});
app.listen(port, () => {
    console.log(`Server started, listening on ${port}`);
});
