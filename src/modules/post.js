import { model, Schema } from "mongoose";

const postschema = new Schema({
    autorID: {
        type: String,
        required: true,
    },
    title: {
        type:String,
        required:true,
    },
    body: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
})

export const Post = model("Post", postschema);