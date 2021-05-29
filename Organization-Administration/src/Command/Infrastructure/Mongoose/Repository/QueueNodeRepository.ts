import mongoose from "mongoose";
import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import IMetadataSpecificationDropdownField
  from "@app/Command/Infrastructure/Mongoose/Types/IMetadataSpecificationDropdownField";
import IMetadataSpecificationTextField
  from "@app/Command/Infrastructure/Mongoose/Types/IMetadataSpecificationTextField";
import MetadataSpecificationTextField from "@app/Command/Domain/ValueObject/MetadataSpecificationTextField";
import FieldType from "@app/Command/Infrastructure/Mongoose/Types/FieldType";
import MetadataSpecificationDropdownField from "@app/Command/Domain/ValueObject/MetadataSpecificationDropdownField";
import IQueueNode from "@app/Command/Infrastructure/Mongoose/Types/IQueueNode";
import MetadataSpecificationField from "@app/Command/Domain/ValueObject/MetadataSpecificationField";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import Clock from "@app/Command/Domain/ValueObject/Clock";

// TODO implement interface from Domain layer
export default class QueueNodeRepository {
  constructor(private readonly QueueNodeModel: mongoose.Model<IQueueNode&mongoose.Document>) {}

  async save(node: QueueNode) {
    const instance = new this.QueueNodeModel(this.typedObjectFrom(node));
    return instance.save();
  }

  async findById(id: string): Promise<QueueNode> {
    const node = await this.QueueNodeModel.findOne({ id });
    if (node) {
      return this.classInstanceFrom(node);
    }
    throw new Error("Client not found"); // TODO create ResourceNotFoundError and extend it
  }

  private classInstanceFrom(node: IQueueNode) {
    const id = QueueNodeId.from(node.id);
    const endpointId = OrganizationEndpointId.from(node.endpointId);

    const { start, end } = node.timeSpan;

    const timeSpan = new TimeSpan(
      new Clock(start.hours, start.minutes, start.seconds),
      new Clock(end.hours, end.minutes, end.seconds),
    );

    const fields: MetadataSpecificationField[] = [];
    node.metaSpecs.fields.forEach((field) => {
      if (field.kind === FieldType.Text) {
        fields.push(new MetadataSpecificationTextField(
          field.name,
          field.isRequired,
          field.maxLength,
          field.minLength,
          field.regex,
          field.placeholder,
        ));
      }
      if (field.kind === FieldType.Dropdown) {
        fields.push(new MetadataSpecificationDropdownField(field.name, field.isRequired, field.options));
      }
    });

    const metaSpecs = new MetadataSpecification(fields);

    return new QueueNode(id, endpointId, metaSpecs, timeSpan);
  }

  private typedObjectFrom(node: QueueNode): IQueueNode {
    const fields: (IMetadataSpecificationDropdownField|IMetadataSpecificationTextField)[] = [];
    node.getMetaSpecs().getFields().forEach((field) => {
      if (field instanceof MetadataSpecificationTextField) {
        const textField: IMetadataSpecificationTextField = {
          ...(field.toPlainObject()),
          kind: FieldType.Text,
        };
        fields.push(textField);
      }
      if (field instanceof MetadataSpecificationDropdownField) {
        const dropdownField: IMetadataSpecificationDropdownField = {
          ...(field.toPlainObject()),
          kind: FieldType.Dropdown,
        };
        fields.push(dropdownField);
      }
    });

    return {
      id: node.getId().toString(),
      endpointId: node.getEndPointId().toString(),
      timeSpan: {
        start: {
          hours: node.getTimeSpan().getStartTime().getHours()!,
          minutes: node.getTimeSpan().getStartTime().getMinutes()!,
          seconds: node.getTimeSpan().getStartTime().getSeconds()!,
        },
        end: {
          hours: node.getTimeSpan().getEndTime().getHours()!,
          minutes: node.getTimeSpan().getEndTime().getMinutes()!,
          seconds: node.getTimeSpan().getEndTime().getSeconds()!,
        },
      },
      metaSpecs: {
        fields,
      },
    };
  }
}
