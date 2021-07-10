import GenericTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/Interface/GenericTransformer";
import IOrganizationEmployee from "@app/Command/Infrastructure/Repository/Mongoose/Types/IOrganizationEmployee";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import BCryptPassowrdHash from "@app/Command/Infrastructure/ValueObject/BCryptPassowrdHash";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";

export default class OrganizationEmployeeMongooseTransformer
  implements GenericTransformer<IOrganizationEmployee, OrganizationEmployee>
{
  mongooseObjectFrom(employee: OrganizationEmployee): IOrganizationEmployee {
    return {
      name: employee.getName(),
      id: employee.getId().toString(),
      organizationId: employee.getOrganizationId().toString(),
      passwordHash: employee.getPasswordHash().toString(),
      passwordHashType: "bcrypt",
      username: employee.getUsername().toString(),
    };
  }

  domainInstanceFrom(employeeObject: IOrganizationEmployee): OrganizationEmployee {
    return new OrganizationEmployee(
      new OrganizationEmployeeId(employeeObject.id),
      new OrganizationId(employeeObject.organizationId),
      employeeObject.name,
      new BCryptPassowrdHash(employeeObject.passwordHash),
      new EmployeeUsername(employeeObject.username),
    );
  }
}
