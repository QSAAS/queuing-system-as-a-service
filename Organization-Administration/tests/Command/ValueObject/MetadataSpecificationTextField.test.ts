import MetadataSpecificationTextField from "@app/Command/Domain/ValueObject/MetadataSpecificationTextField";

class TextFieldBuilder {
  private readonly textField: MetadataSpecificationTextField;
  constructor() {
    this.textField = new MetadataSpecificationTextField("name",
      true,
      16,
      4,
      "w+",
      "placeholder");
  }

  name(name: string) {
    this.textField.setName(name);
    return this;
  }

  isRequired(isRequired: boolean) {
    this.textField.setIsRequired(isRequired);
    return this;
  }

  maxLength(value: number) {
    this.textField.setMaxLength(value);
    return this;
  }

  minLength(value: number) {
    this.textField.setMinLength(value);
    return this;
  }

  regex(value: string) {
    this.textField.setRegex(value);
    return this;
  }

  placeholder(value: string) {
    this.textField.setPlaceHolder(value);
    return this;
  }

  build() {
    return this.textField;
  }
}

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
