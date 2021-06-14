import { Schema } from "mongoose";

const ClockSchema = new Schema({
  hours: Number,
  minutes: Number,
  seconds: Number,
});

export default ClockSchema;
// TODO add suffix 'Schema' to file name
