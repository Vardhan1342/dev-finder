"use server"
import { conntecttodb } from "@/db/connect";
import { User } from "@/db/models/User";
import {StreamChat} from "stream-chat";
import { checkSession } from "./createroom";
import { Room } from "@/db/models/Room";
import { roomschema } from "@/components/Create-room-form";
import { revalidatePath } from "next/cache";

export const findUserBYEmail=async(email:string) =>{
    await conntecttodb();
    try {
        const user=await User.findOne({
            email:email
        })
        if(user){
            return user._id.toString();
        }
        return null;
    } catch (error) {
        return {error:"user not found"}
    }
    
}




export const Token=async(userid:string)=>{

    
    const api_key = process.env.STREAM_APIKEY!;
    const api_secret = process.env.TOKEN_SECRET!
    const user_id = 'john'
    const session=await checkSession();
    if(!session){
        throw new Error("No session")
    }
    // Initialize a Server Client
    const serverClient = StreamChat.getInstance( api_key, api_secret);
    // Create User Token
    const token = serverClient.createToken(userid);
    return token
}

export const getUserRooms=async()=>{
    const session=await checkSession();
    if(!session){
        throw new Error("No session")
    }
    const id=session.id;
    const rooms =await Room.find({creator:id});
    const plainObjects = rooms.map(item => {
        const { _id, creator,...rest } = item.toObject();
        return { id: _id.toString(),creator:creator.toString(), ...rest };
      });
      return plainObjects
}

export const deleteUserRoom=async(roomid:string)=>{
    const session=await checkSession();
    if(!session){
        throw new Error("No session")
    }
    console.log(roomid)
    try{
       await Room.findByIdAndDelete({
            _id:roomid
            })
    }
    catch(error){
        console.log(error)
    }
   
}


export const editUserRoom=async(room:roomschema,roomid:string)=>{
    const user=await checkSession();
    if(!user){
        return {error:"please Login"}
    }
    try {
       const res= await Room.findByIdAndUpdate(roomid,{
            roomname:room.roomname,
            description:room.description,
            githubrepo:room.githubrepo,
            language:room.language,
        })
        revalidatePath(`/edit/${roomid}`)
        revalidatePath("/home")
        revalidatePath("/your-rooms")
        return { message:"Room successfully Updated"}
    } catch (error) {
        throw error
    }
    
}



export const deleteUser=async()=>{
       const session=await checkSession();
       const id=session.id;
       if(!session){
        throw new Error ("You must be logged in to Delete Account");
       }

       try {
           await User.findByIdAndDelete(id);
           await Room.deleteMany({creator:id});
           revalidatePath("/");
             
       } catch (error) {
             throw error
       }
}