import { Schema } from "mongoose";
import MetaSpecsSchema from "@app/Command/Infrastructure/Repository/Mongoose/Schema/MetaSpecsSchema";
import TimespanSchema from "@app/Command/Infrastructure/Repository/Mongoose/Schema/TimespanSchema";

const QueueNodeSchema = new Schema({
  id: String,
  endpointId: String,
  metaSpecs: MetaSpecsSchema,
  timeSpan: TimespanSchema,
});

export default QueueNodeSchema;
