import mongoose, { model } from "mongoose";

const UserprofileSchema = new mongoose.Schema({
    profileImage: { type: String,default:"/profile.png" },
    coverImage: { type: String,default:"/cover.png" },
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
