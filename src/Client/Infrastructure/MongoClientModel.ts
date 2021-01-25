import mongoose, { Schema } from "mongoose";

const schema: Schema = new Schema({
    id: { // TODO replace code base id with mongo object id or vice versa
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 256,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
    },
});

export default mongoose.model("Client", schema);
