import { Schema } from "mongoose";
import metaSpecsSchema from "@app/Command/Infrastructure/Mongoose/Schema/MetaSpecs";
import timespanSchema from "@app/Command/Infrastructure/Mongoose/Schema/Timespan";

const QueueNodeSchema = new Schema({
  id: String,
  endpointId: String,
  metaSpecs: metaSpecsSchema,
  timeSpan: timespanSchema,
});

export default QueueNodeSchema;
