import { InferSchemaType, Schema, model, models } from "mongoose";

export const userScehma=new Schema({
    name:{type:String,required:true},
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
       type:String,reuired:true,
    },
},{timestamps:true})

export type user = InferSchemaType<typeof userScehma>;


export const User=models?.User || model<user>("User",userScehma);