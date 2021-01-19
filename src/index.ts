import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const port  = process.env.SERVER_PORT || 8080 ; 
app.listen(port , () => {
    console.log(`Server started, listening on ${port}`);
});
