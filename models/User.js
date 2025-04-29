import mongoose, { model } from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, default: "huvcdjsbcadsg" },
    profileimage: { type: String },
    coverimage: { type: String }
}, {
    timestamps: true
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
