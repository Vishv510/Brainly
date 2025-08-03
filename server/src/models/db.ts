import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    title: {type: String, required: true},
    link: String,
    type: String,
    description: {type: String, default: ""},
    tags: [{type: mongoose.Types.ObjectId, ref : 'Tag'}],
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true},
})
export const ContentModel = model("Content", ContentSchema);

const LinkSchema = new Schema({
    hash : String,
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true},
})

export const LinkModel = model("Links", LinkSchema);