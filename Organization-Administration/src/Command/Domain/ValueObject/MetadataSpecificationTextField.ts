import MetadataSpecificationField from "@app/Command/Domain/ValueObject/MetadataSpecificationField";

export default class MetadataSpecificationTextField extends MetadataSpecificationField {
  constructor(name: string,
    isRequired: boolean,
    private maxLength: number,
    private minLength: number,
    private regex: string, // TODO use RegExp?
    private placeholder: string) {
    super(name, isRequired);
  }

  getMaxLength(): number {
    return this.maxLength;
  }

  setMaxLength(value: number): void {
    this.maxLength = value;
  }

  getMinLength(): number {
    return this.minLength;
  }

  setMinLength(value: number): void {
    this.minLength = value;
  }

  getRegex(): string {
    return this.regex;
  }

  setRegex(value: string): void {
    this.regex = value;
  }

  getPlaceholder(): string {
    return this.placeholder;
  }

  setPlaceHolder(value: string): void {
    this.placeholder = value;
  }

  equals(other: this): boolean {
    return this.name === other.name
        && this.isRequired === other.isRequired
        && this.maxLength === other.maxLength
        && this.minLength === other.minLength
        && this.regex === other.regex
        && this.placeholder === other.placeholder;
  }
}
