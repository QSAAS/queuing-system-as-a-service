import { Schema } from "mongoose";
import MetaSpecsSchema from "@app/Command/Infrastructure/Mongoose/Schema/MetaSpecs";
import TimespanSchema from "@app/Command/Infrastructure/Mongoose/Schema/Timespan";

const QueueNodeSchema = new Schema({
  id: String,
  endpointId: String,
  metaSpecs: MetaSpecsSchema,
  timeSpan: TimespanSchema,
});

export default QueueNodeSchema;
