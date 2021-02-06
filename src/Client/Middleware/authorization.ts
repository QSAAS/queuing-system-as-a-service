import { Request, Response } from "express";
import ClientJwtAuth from "@app/Client/Domain/ValueObjects/ClientJwtAuth";

// TODO decide in which layer/file this stackoverflow copied snippet should reside
declare module "express-serve-static-core" {
    interface Request {
        client?: Object
    }
    interface Response {
        client?: Object
    }
}

export default function authorize(request: Request, response: Response, next: Function): void {
    const token = request.header("x-auth-token");
    if (!token) {
        response.status(401).send("Access denied. No token provided");
        return;
    }

    const clientAuth = new ClientJwtAuth();
    try {
        request.client = clientAuth.decode(token);
        next();
    } catch (e) {
        response.status(401).send(e.message);
    }
}
