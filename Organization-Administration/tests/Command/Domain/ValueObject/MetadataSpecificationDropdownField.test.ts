import DropdownFieldBuilder from "@tests/Builders/DropdownFieldBuilder";

const base = new DropdownFieldBuilder().build();

describe("Unequal attributes", () => {
  it("Should return false on unequal names", () => {
    const other = new DropdownFieldBuilder().withName("other").build();
    expect(base.equals(other)).toBeFalsy();
  });

  it("Should return false on unequal required", () => {
    const other = new DropdownFieldBuilder().withIsRequired(false).build();
    expect(base.equals(other)).toBeFalsy();
  });

  it("Should return false on unequal options length", () => {
    const other = new DropdownFieldBuilder().withOptions(["option_1"]).build();
    expect(base.equals(other)).toBeFalsy();
  });

  it("Should return false on different options", () => {
    const other = new DropdownFieldBuilder().withOptions(["option_1", "different_option_2"]).build();
    expect(base.equals(other)).toBeFalsy();
  });
});

describe("Equal attributes", () => {
  it("Should return true if all attributes have equal values", () => {
    const other = new DropdownFieldBuilder().build();
    expect(base.equals(other)).toBeTruthy();
  });
});
