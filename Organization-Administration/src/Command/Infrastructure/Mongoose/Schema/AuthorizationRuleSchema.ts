import { Schema } from "mongoose";
import ResourceType from "@app/Command/Domain/Enum/ResourceType";
import AuthorizedAction from "@app/Command/Domain/Enum/AuthorizedAction";

const AuthorizationRuleSchema = new Schema({
  organizationEmployeeId: String,
  resourceId: {
    type: String,
    default: null,
  },
  resourceType: {
    type: String,
    enum: Object.values(ResourceType),
  },
  action: {
    type: String,
    enum: Object.values(AuthorizedAction),
  },
});

AuthorizationRuleSchema.index(
  {
    organizationEmployeeId: 1,
    resourceId: 1,
    resourceType: 1,
    action: 1,
  },
  {
    unique: true,
  },
);

export default AuthorizationRuleSchema;
