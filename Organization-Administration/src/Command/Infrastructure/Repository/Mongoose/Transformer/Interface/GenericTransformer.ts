export default interface GenericTransformer<MongooseObject, DomainInstance> {
  mongooseObjectFrom(instance: DomainInstance): MongooseObject;
  domainInstanceFrom(object: MongooseObject): DomainInstance;
}
