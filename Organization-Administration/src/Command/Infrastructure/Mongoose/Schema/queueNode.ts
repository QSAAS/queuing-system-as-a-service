import { Schema } from "mongoose";
import metaSpecsSchema from "@app/Command/Infrastructure/Mongoose/Schema/metaSpecs";
import timespanSchema from "@app/Command/Infrastructure/Mongoose/Schema/timespan";

const queueNodeSchema = new Schema({
  id: String,
  endpointId: String,
  metaSpecs: metaSpecsSchema,
  timeSpan: timespanSchema,
});

export default queueNodeSchema;