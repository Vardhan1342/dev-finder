"use client"
import React from 'react';
import { FiGithub } from "react-icons/fi";
  import { Button } from "@/components/ui/button"
import {   Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle, } from './ui/card';
import { room } from '@/db/models/Room';
import Link from 'next/link';
import { Badge } from './ui/badge';

export type rooms=room & { id :string}

const RoomCard = ({rooms}:any) => {
  console.log("romsfhdhfjh",rooms)
  return (<>
  
    <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {rooms && rooms.map((room :any)=>(
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
            <div>
                    {room &&
                      room.language
                        .split(",")
                        .map((item: string) => (
                          <Badge className="mr-1 rounded-3xl">{item}</Badge>
                        ))}
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
