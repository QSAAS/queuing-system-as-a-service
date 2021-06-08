import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";

export default class OrganizationEmployee {
  public getId(): OrganizationEmployeeId {
    // dummy value until class implementation is provided
    return OrganizationEmployeeId.create();
  }
}
