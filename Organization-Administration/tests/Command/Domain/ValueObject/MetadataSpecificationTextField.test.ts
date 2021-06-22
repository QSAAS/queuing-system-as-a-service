import TextFieldBuilder from "@tests/Command/Domain/ValueObject/Builder/MetadataSpecificationTextFieldBuilder";

const base = new TextFieldBuilder().build();

describe("Unequal attributes", () => {
  it("Should return false on unequal names", () => {
    const other = new TextFieldBuilder().withName(`${base.getName()}#`).build();
    expect(base.equals(other)).toBeFalsy();
  });

  it("Should return false on unequal required", () => {
    const other = new TextFieldBuilder().withIsRequired(!base.getIsRequired()).build();
    expect(base.equals(other)).toBeFalsy();
  });

  it("Should return false on unequal max length", () => {
    const other = new TextFieldBuilder().withMaxLength(base.getMaxLength() + 1).build();
    expect(base.equals(other)).toBeFalsy();
  });

  it("Should return false on unequal min length", () => {
    const other = new TextFieldBuilder().withMinLength(base.getMinLength() + 1).build();
    expect(base.equals(other)).toBeFalsy();
  });

  it("Should return false on unequal placeholders", () => {
    const other = new TextFieldBuilder().withPlaceholder(`${base.getPlaceholder()}#`).build();
    expect(base.equals(other)).toBeFalsy();
  });
});

describe("Equal attributes", () => {
  it("Should return true if all attributes have equal values", () => {
    const other = new TextFieldBuilder().build();
    expect(base.equals(other)).toBeTruthy();
  });
});
