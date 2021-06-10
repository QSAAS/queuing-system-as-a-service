// TODO: Remove those after Hanafy implements his part
// eslint-disable-next-line max-classes-per-file
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";

// TODO: Remove those after Hanafy implements his part

export class EmployeeUsername {
}

export class PasswordHash {
}

export default class OrganizationEmployee {
  constructor(
    private id: OrganizationEmployeeId,
    private organizationId: OrganizationId,
    private username: EmployeeUsername,
    private passwordHash: PasswordHash,
    private name: string,
  ) {
  }

  public getId(): OrganizationEmployeeId {
    return this.id;
  }
}
