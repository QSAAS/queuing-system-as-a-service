import EntityId from "@app/Command/Domain/ValueObject/EntityId";

export default class EntityIdBuilder {
  constructor(public id: string = "") {
  }

  public withId(id: string): EntityIdBuilder {
    this.id = id;
    return this;
  }

  public build(): EntityId {
    return EntityId.from(this.id);
  }
}
