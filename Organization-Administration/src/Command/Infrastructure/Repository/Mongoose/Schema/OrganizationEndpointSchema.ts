import { Schema } from "mongoose";
import GeolocationSchema from "@app/Command/Infrastructure/Repository/Mongoose/Schema/GeolocationSchema";

const OrganizationEndpointSchema = new Schema({
  id: String,
  organizationId: String,
  name: String,
  geolocation: GeolocationSchema,
});

export default OrganizationEndpointSchema;
