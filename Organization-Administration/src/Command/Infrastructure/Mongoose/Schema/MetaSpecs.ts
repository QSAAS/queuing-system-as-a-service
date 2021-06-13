import { Schema } from "mongoose";

const MetaSpecsSchema = new Schema({
  fields: [Schema.Types.Mixed],
});

export default MetaSpecsSchema;
