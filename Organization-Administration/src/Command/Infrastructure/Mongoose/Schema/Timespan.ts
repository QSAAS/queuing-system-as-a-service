import { Schema } from "mongoose";
import clockSchema from "@app/Command/Infrastructure/Mongoose/Schema/Clock";

const TimespanSchema = new Schema({
  start: clockSchema,
  end: clockSchema,
});

export default TimespanSchema;
