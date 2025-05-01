import mongoose, { model } from "mongoose";

const UserprofileSchema = new mongoose.Schema({
    name: { type: String },
    username: { type: String},
    profileImage: { type: String },
    coverImage: { type: String },
    about:{type:String},
    fuelCost:{type:Number, default:1},
    introLink:{type:String},
    instagram:{type:String},
    youtube:{type:String},
    github:{type:String},
    website:{type:String},
}, {
    timestamps: true
});

export const Userprofile = mongoose.models.Userprofile || mongoose.model("Userprofile", UserprofileSchema);
