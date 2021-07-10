import { Schema } from "mongoose";

const GeolocationSchema = new Schema({
  latitude: Number,
  longitude: Number,
});

export default GeolocationSchema;
