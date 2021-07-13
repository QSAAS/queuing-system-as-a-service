export default class RegisterRequest{
  constructor(public readonly username: string,
              public readonly password: string,
              public readonly organizationId: string,
              public readonly name: string) {}
}
