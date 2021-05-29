import mongoose from "mongoose";
import IQueueNode from "@app/Command/Infrastructure/Mongoose/Types/IQueueNode";
import queueNodeSchema from "@app/Command/Infrastructure/Mongoose/Schema/queueNode";

export default function modelFactory(conn: mongoose.Connection) {
  return conn.model<IQueueNode&mongoose.Document>("QueueNode", queueNodeSchema);
}
