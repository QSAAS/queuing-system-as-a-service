import { Schema } from "mongoose";

// TODO: Add unique indexes
const OrganizationEmployeeSchema = new Schema({
  id: String,
  organizationId: String, // TODO make foreign key
  name: String,
  passwordHash: String,
  passwordHashType: String,
  username: {
    type: String,
    unique: true,
  },
});

export default OrganizationEmployeeSchema;
