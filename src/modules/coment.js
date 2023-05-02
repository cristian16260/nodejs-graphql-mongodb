import { model, Schema } from "mongoose";

const comentschema = new Schema({
    comment: {
        type: String,
        required: true,
    },
    userID:{
        type: String,
        required: true,
    },
    postID:{
        type: String,
        required: true,
    },
},{
    timestamps: true,
})

export const Comment = model("Comment",comentschema)