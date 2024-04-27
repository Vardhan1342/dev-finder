"use client"
import React, {  useEffect, useState } from 'react';
import { FiGithub } from "react-icons/fi";
  import { Button } from "@/components/ui/button"
import {   Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle, } from './ui/card';
import { getRooms } from '@/serveractions/createroom';
import { room } from '@/db/models/Room';
import Link from 'next/link';
import { Input } from './ui/input';
import { useSession } from 'next-auth/react';

export type rooms=room & { id :string}

const RoomCard = () => {
  const session=useSession();
  console.log(session)
    const [rooms, setRooms] = useState<Array<rooms>>([]);
    const [query,setQuery]=useState("");
     const filteredrooms=rooms.filter((room)=>{
        return room.roomname.toLowerCase().includes(query.toLowerCase());
     })
     console.log(filteredrooms)
    const room=async()=>{
      try{

        const rooms=await getRooms();
        setRooms(rooms)
      }
      catch(error){
        return (<h1> Room Not Found</h1>)
      }
  }
  useEffect(()=>{
       room()
  },[])

  return (<>
  <div className="flex items-center justify-between gap-4">
            <div className=" flex">
               
               <Input onChange={(e)=>setQuery(e.target.value)} placeholder="Find Rooms..."/>
               
            </div>
            <div className="flex gap-x-2">

            <Button asChild>
              <Link href="/create-room" >Create Room </Link>
              
            </Button>
            <Button variant="outline">
                 <Link href={`/your-rooms/`+session.data?.user?.id} >My rooms </Link>
             </Button>
            </div>
    </div>
    <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {filteredrooms && filteredrooms.map((room)=>(
      <Card className="w-full m-2">
      <CardHeader>
        <CardTitle>{room.roomname}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader> 
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex  space-x-1.5">
                <FiGithub size={20}/> <p className='text-sm'>Github <a href={room.githubrepo} className='underline text-blue-600'>Link</a></p>
            </div>  
          </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className=''>
            <Link href={`room/${room.id}`}>Join Room</Link></Button>
      </CardFooter>
    </Card>
            
        ))}
     
    </div>
  </>
  );
}

export default RoomCard;
