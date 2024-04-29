"use server"

import { authoptions } from "@/app/api/auth/[...nextauth]/route"
import { roomschema } from "@/components/Create-room-form"
import { conntecttodb } from "@/db/connect"
import { Room } from "@/db/models/Room"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export const checkSession=async()=>{
    const session =await getServerSession(authoptions)
       if(!session){
           return false;
       }
       const user=session.user as any
       if(!user){
           return false;
       }
       return user
}
export const createroom=async(room :roomschema)=>{
   
    const user=await checkSession();
    if(!user){
        return {error:"please Login"}
    }
    try {
        const res=await Room.create({
            roomname:room.roomname,
            description:room.description,
            githubrepo:room.githubrepo,
            language:room.language,
            creator:user.id 
        })
        return res._id.toString();
    } catch (error) {
        throw error
    }
    finally{
        revalidatePath("/")
    }
}


export const getRooms=async()=>{
    await conntecttodb();
    const rooms =await Room.find({});
    const plainObjects = rooms.map(item => {
        const { _id, creator,...rest } = item.toObject();
        return { id: _id.toString(),creator:creator.toString(), ...rest };
      });
      return plainObjects
}


export const getRoom=async(roomid:string)=>{
    await conntecttodb();
    const user=await checkSession();
    if(!user){
        return "please Login"
    }
 try {
     const room=await  Room.findById(roomid);
     const roomPlain={
        id:room._id.toString(),
        roomname:room.roomname,
        description:room.description,
        githubrepo:room.githubrepo,
        language:room.language,
        creator:room.creator.toString()
     }
     return roomPlain;
 } catch (error) {
    return "Room Not Found"
 }


}