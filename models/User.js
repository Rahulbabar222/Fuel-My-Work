import mongoose, { model } from "mongoose";

const UserSchema=new  mongoose.Schema({
    name:{type:String},
    email:{type:String, required:true},
    username:{type:String, required:true},
    profileimage:{type:String},
    coverimage:{type:String},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now}

})
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
