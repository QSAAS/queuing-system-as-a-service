import mongoose, { Schema } from "mongoose";

const schema: Schema = new Schema({
    node_id: {
        type: String,
        required: true,
        unique: true,
    },
    service_id: {
        type: String,

    },
    endpoint_id: {

    },
    service_start_time: {

    },
    service_end_time: {

    },
});
