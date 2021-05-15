import TextFieldBuilder from "@tests/Builders/TextFieldBuilder";

const base = new TextFieldBuilder().build();

describe("Unequal attributes", () => {
  it("Should return false on unequal names", () => {
    const other = new TextFieldBuilder().name(`${base.getName()}#`).build();
    expect(base.equals(other)).toBeFalsy();
  });

  it("Should return false on unequal required", () => {
    const other = new TextFieldBuilder().isRequired(!base.getIsRequired()).build();
    expect(base.equals(other)).toBeFalsy();
  });

  it("Should return false on unequal max length", () => {
    const other = new TextFieldBuilder().maxLength(base.getMaxLength() + 1).build();
    expect(base.equals(other)).toBeFalsy();
  });

  it("Should return false on unequal min length", () => {
    const other = new TextFieldBuilder().minLength(base.getMinLength() + 1).build();
    expect(base.equals(other)).toBeFalsy();
  });

  it("Should return false on unequal regex", () => {
    const other = new TextFieldBuilder().regex(`${base.getRegex()}#`).build();
    expect(base.equals(other)).toBeFalsy();
  });

  it("Should return false on unequal placeholders", () => {
    const other = new TextFieldBuilder().placeholder(`${base.getPlaceholder()}#`).build();
    expect(base.equals(other)).toBeFalsy();
  });
});

describe("Equal attributes", () => {
  it("Should return true if all attributes have equal values", () => {
    const other = new TextFieldBuilder().build();
    expect(base.equals(other)).toBeTruthy();
  });
});
