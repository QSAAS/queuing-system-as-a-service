import { Schema } from "mongoose";

const clockSchema = new Schema({
  hours: Number,
  minutes: Number,
  seconds: Number,
});

export default clockSchema;
