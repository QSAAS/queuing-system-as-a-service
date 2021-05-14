import MetadataSpecificationDropdownField from "@app/Command/Domain/ValueObject/MetadataSpecificationDropdownField";

class DropdownFieldBuilder {
  private readonly dropdown: MetadataSpecificationDropdownField;

  constructor() {
    this.dropdown = new MetadataSpecificationDropdownField("name",
      true,
      ["option_1", "option_2"]);
  }

  name(name: string) {
    this.dropdown.setName(name);
    return this;
  }

  isRequired(isRequired: boolean) {
    this.dropdown.setIsRequired(isRequired);
    return this;
  }

  options(options: string[]) {
    this.dropdown.setOptions(options);
    return this;
  }

  build() {
    return this.dropdown;
  }
}

const base = new DropdownFieldBuilder().build();

describe("Unequal attributes", () => {
  it("Should return false on unequal names", () => {
    const other = new DropdownFieldBuilder().name("other").build();
    expect(base.equals(other)).toBeFalsy();
  });

  it("Should return false on unequal required", () => {
    const other = new DropdownFieldBuilder().isRequired(false).build();
    expect(base.equals(other)).toBeFalsy();
  });

  it("Should return false on unequal options length", () => {
    const other = new DropdownFieldBuilder().options(["option_1"]).build();
    expect(base.equals(other)).toBeFalsy();
  });

  it("Should return false on different options", () => {
    const other = new DropdownFieldBuilder().options(["option_1", "different_option_2"]).build();
    expect(base.equals(other)).toBeFalsy();
  });
});

describe("Equal attributes", () => {
  it("Should return true if all attributes have equal values", () => {
    const other = new DropdownFieldBuilder().build();
    expect(base.equals(other)).toBeTruthy();
  });
});
