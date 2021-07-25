import Transformer from "@app/Command/Application/Transformer/Transformer";
import MetadataSpecificationField from "@app/Command/Domain/ValueObject/MetadataSpecificationField";
import MetadataSpecificationFieldDTO
  from "@app/Command/Application/DataTransferObject/Object/MetadataSpecificationFieldDTO";
import MetadataSpecificationTextField from "@app/Command/Domain/ValueObject/MetadataSpecificationTextField";
import MetadataSpecificationDropdownField from "@app/Command/Domain/ValueObject/MetadataSpecificationDropdownField";

export default class MetadataSpecificationFieldDtoTransformer implements Transformer<MetadataSpecificationField, MetadataSpecificationFieldDTO> {
  toDTO(object: MetadataSpecificationField): MetadataSpecificationFieldDTO {
    let kind; let data;
    if (object instanceof MetadataSpecificationTextField) {
      kind = "text";
      data = JSON.stringify({
        maxLength: object.getMaxLength(),
        minLength: object.getMinLength(),
        placeholder: object.getPlaceholder(),
      });
    }
    else if (object instanceof MetadataSpecificationDropdownField) {
      kind = "dropdown";
      data = JSON.stringify(object.getOptions());
    }
    else {
      throw new Error("Unsupported field type");
    }

    return new MetadataSpecificationFieldDTO(
      object.getName(),
      object.getIsRequired(),
      kind,
      data,
    );

  }

  toDtoFromJson(object: {
    name: string,
    isRequired: boolean,
    kind: string,
    options?: string[],
    maxLength?: number,
    minLength?: number,
    placeholder?: string,
  }): MetadataSpecificationFieldDTO {
    let data: string;
    if (object.kind === "text") {
      const {maxLength, minLength, placeholder} = object;
      data = JSON.stringify({
        maxLength,
        minLength,
        placeholder,
      });
    } else if (object.kind === "dropdown") {
      data = JSON.stringify(object.options)
    } else {
      throw new Error(`${object.kind} is an unsupported field type`);
    }
    return new MetadataSpecificationFieldDTO(object.name, object.isRequired, object.kind, data);
  }

  toObject(dto: MetadataSpecificationFieldDTO): MetadataSpecificationField {
    if (dto.kind === "text") {
      const data: {
        maxLength: number,
        minLength: number,
        placeholder: string,
      } = JSON.parse(dto.data);
      return new MetadataSpecificationTextField(
        dto.name,
        dto.isRequired,
        data.maxLength,
        data.minLength,
        data.placeholder,
      )
    } if (dto.kind === "dropdown") {
      const data: string[]= JSON.parse(dto.data);
      return new MetadataSpecificationDropdownField(
        dto.name,
        dto.isRequired,
        data,
      )
    }
    throw new Error(`${dto.kind} is an unsupported field type`);
  }

}
