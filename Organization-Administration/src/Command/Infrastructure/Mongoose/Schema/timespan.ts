import { Schema } from "mongoose";
import clockSchema from "@app/Command/Infrastructure/Mongoose/Schema/clock";

const timespanSchema = new Schema({
  start: clockSchema,
  end: clockSchema,
});

export default timespanSchema;
