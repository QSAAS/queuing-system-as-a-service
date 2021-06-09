import { v4 as uuidv4 } from "uuid";
import EntityIdBuilder from "@tests/Command/Domain/ValueObject/EntityIdBuilder";

export default class EntityIdMother {
  public static complete(): EntityIdBuilder {
    const id = uuidv4();
    return new EntityIdBuilder(id);
  }
}
