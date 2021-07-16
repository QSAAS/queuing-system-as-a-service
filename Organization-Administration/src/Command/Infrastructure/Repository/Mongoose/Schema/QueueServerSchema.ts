import { Schema } from "mongoose";

const QueueServerSchema = new Schema({
  id: String,
  endpointId: String,
  servers: [String],
});

export default QueueServerSchema;
