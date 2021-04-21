import express from "express";
import LoginService from "@app/Command/Application/Service/LoginService";
import MongooseClientRepository from "@app/Command/Infrastructure/Persistence/Mongoose/MongooseClientRepository";
import LoginRequestDTO from "@app/Command/Application/DataTransferObject/LoginRequestDTO";

const router = express.Router();

router.get("/login", (request, response) => {
  const service = new LoginService(new MongooseClientRepository());
  try {
    service.execute(new LoginRequestDTO("wesso", "123"));
  } catch (AuthorizationError) {
    response.status(401).send("Unauthorized");
  }
});

// QUERY

class ClientResponseDTO {
  constructor(
    public name: String,
    public phone: String,
  ) {
  }
}

router.get("/getClient/:id", (request, response) => {
  const c = new ClientResponseDTO("Wesso", "123"); // <-- whatever
  response.send(JSON.stringify(c));
});

export default router;
