import { Schema } from "mongoose";
import ClockSchema from "@app/Command/Infrastructure/Mongoose/Schema/Clock";

const TimespanSchema = new Schema({
  start: ClockSchema,
  end: ClockSchema,
});

export default TimespanSchema;
// TODO add suffix 'Schema' to file name
