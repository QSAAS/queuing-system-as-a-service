export default class MetadataSpecificationFieldDTO{
  constructor(public name: string,
              public isRequired: boolean,
              public kind: string,
              public data: string) {}
}
