import BCryptPasswordHashFactory from "@app/Command/Infrastructure/Service/BCryptPasswordHashFactory";

describe("Can match passwords", () => {
  const factory = new BCryptPasswordHashFactory();
  it("Returns false on non-matching passwords", async () => {
    const passwordHash = await factory.create("12341234");
    expect(await passwordHash.matches("1234")).toBe(false);
  });
  it("Returns true on matching passwords", async () => {
    const passwordHash = await factory.create("123412344");
    expect(await passwordHash.matches("12341234")).toBe(true);
  });
});
