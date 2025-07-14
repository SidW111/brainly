import mongoose from "mongoose";
import { Schema,model } from "mongoose";


const userSchema = new mongoose.Schema({
    username:{type:String, unique:true},
    password:{type:String}
})
export const userModel = model('User',userSchema)
const contentSchema = new mongoose.Schema({
    link:{type:String},
    title:{type:String},
    type:String,
    tags:[{type:mongoose.Types.ObjectId, ref:'Tag'}],
    userId:[{type:mongoose.Types.ObjectId,ref:'User',required:true}]
})

export const contentModel = model('content',contentSchema);

const shareSchema = new mongoose.Schema({
    hash:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
})

export const shareModel = model('share',shareSchema);