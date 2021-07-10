import { Schema } from "mongoose";

// TODO: Add unique indexes
const OrganizationEmployeeSchema = new Schema({
  id: String,
  organizationId: String,
  name: String,
  passwordHash: String,
  passwordHashType: String,
  username: String,
});

export default OrganizationEmployeeSchema;
