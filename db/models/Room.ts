import { InferSchemaType, Schema, model, models } from "mongoose";

export const roomSchema=new Schema({
    roomname:{type:String,required:true},
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
        
    },
    description:{
       type:String,required:true,
    },
    githubrepo:{type:String,required:true},
    language:{type:String,required:true}
},{timestamps:true})

export type room = InferSchemaType<typeof roomSchema>;


export const Room=models?.Room || model<room>("Room",roomSchema);