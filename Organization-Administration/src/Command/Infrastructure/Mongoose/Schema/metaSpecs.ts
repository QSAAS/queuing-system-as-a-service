import { Schema } from "mongoose";

const metaSpecsSchema = new Schema({
  fields: [Schema.Types.Mixed],
});

export default metaSpecsSchema;
