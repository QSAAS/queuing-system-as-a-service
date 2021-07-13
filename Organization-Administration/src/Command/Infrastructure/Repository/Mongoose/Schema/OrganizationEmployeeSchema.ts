import { Schema } from "mongoose";

const OrganizationEmployeeSchema = new Schema({
  id: String,
  organizationId: String,
  name: String,
  passwordHash: String,
  passwordHashType: String,
  username: {
    type: String,
    unique: true,
  },
});

export default OrganizationEmployeeSchema;
