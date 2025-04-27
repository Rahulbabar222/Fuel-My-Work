import mongoose, { model } from "mongoose";

const PaymentSchema=new  mongoose.Schema({
    name:{type:String, required:true},
    to_user:{type:String, required:true},
    ref_id:{type:String, required:true},
    message:{type:String, required:true},
    Amount:{type:Number, required:true},
    paidAt:{type:Date, default:Date.now},
    done:{type:Boolean,default:false}
})
export const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
