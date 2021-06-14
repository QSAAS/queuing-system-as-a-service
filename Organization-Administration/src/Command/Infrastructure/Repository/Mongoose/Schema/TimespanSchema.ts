import { Schema } from "mongoose";
import ClockSchema from "@app/Command/Infrastructure/Repository/Mongoose/Schema/ClockSchema";

const TimespanSchema = new Schema({
  start: ClockSchema,
  end: ClockSchema,
});

export default TimespanSchema;
