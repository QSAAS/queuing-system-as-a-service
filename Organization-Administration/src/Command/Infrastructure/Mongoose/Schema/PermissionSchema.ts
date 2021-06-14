import { Schema } from "mongoose";
import ResourceType from "@app/Command/Domain/Enum/ResourceType";
import AuthorizedAction from "@app/Command/Domain/Enum/AuthorizedAction";

const PermissionSchema = new Schema({
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

export default PermissionSchema;
