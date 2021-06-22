import jwt from "jsonwebtoken";
import AccessToken from "@app/Command/Presentation/Api/Type/AccessToken";

export default class JwtTokenGenerator {
  constructor(private key: string) {}
  createToken(employeeId: string) {
    const accessToken: AccessToken = {
      type: "ACCESS_TOKEN",
      employeeId,
    }
    return jwt.sign(accessToken, this.key, { expiresIn: "24h" });
  }
}
