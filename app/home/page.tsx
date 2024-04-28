"use client"
import { Suspense, useEffect, useState } from "react";
import Loading from "../loading";
import RoomCard, { rooms } from "@/components/Room-Card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BounceLoader } from "react-spinners";
import { getRooms } from "@/serveractions/createroom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
 const router = useRouter();
 const session=useSession();
 if(!session){
  router.push("/")
 }
 console.log(session)
   const [rooms, setRooms] = useState<rooms[]>([]);
   const [query,setQuery]=useState("");
    const filteredrooms=rooms.filter((room)=>{
       return room.roomname.toLowerCase().includes(query.toLowerCase());
    })
    console.log("filterd roos",filteredrooms)
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

  return (
    <main className="container mt-4">
             <div className="flex items-center justify-between gap-x-4">
               
               <Input onChange={(e)=>setQuery(e.target.value)} placeholder="Find Rooms..."/>
               
            <div className="flex gap-x-2">

            <Button asChild>
              <Link href="/create-room" >Create Room </Link>
              
            </Button>
            <Button variant="outline">
                 <Link href={`/your-rooms/`+session.data?.user?.id} >My rooms </Link>
             </Button>
            </div>
    </div>
            <Suspense fallback={<Loading />}>
                 <RoomCard rooms={filteredrooms} />    
            </Suspense>
    </main>
  );
}

