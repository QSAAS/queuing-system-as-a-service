import ClientUsername from "@app/Command/Domain/ValueObject/ClientUsername";
import ClientUsernameValidationError from "@app/Command/Domain/Error/ClientUsernameValidationError";

describe("Can validate client usernames", () => {
  test("Disallows shorter than 3 characters", () => {
    expect(() => new ClientUsername("fo")).toThrowError(ClientUsernameValidationError);
  });

  test("Disallows longer than 10 characters", () => {
    expect(() => new ClientUsername("foobarfooba")).toThrowError(ClientUsernameValidationError);
  });

  test("Allows usernames between 3 and 10 characters", () => {
    expect(new ClientUsername("bobross")).toBeInstanceOf(ClientUsername);
  });
});
