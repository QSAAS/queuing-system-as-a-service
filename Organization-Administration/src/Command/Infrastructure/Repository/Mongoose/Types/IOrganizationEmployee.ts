type PasswordHashType = "bcrypt";

export default interface IOrganizationEmployee {
  id: string;
  organizationId: string;
  name: string;
  passwordHash: string;
  passwordHashType: PasswordHashType;
  username: string;
}
