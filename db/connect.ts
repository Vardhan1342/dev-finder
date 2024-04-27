import mongoose from "mongoose";

export const conntecttodb=async()=>{
    await mongoose.connect(process.env.MONGODB_URI !).catch(err=>{console.log("mongoose connection error")}).then(()=>console.log("connected"));

}