"use client"
import EditForm from '@/components/Edit-form';
import { getRoom } from '@/serveractions/createroom';
import { unstable_noStore } from 'next/cache';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const page = ({
  params,
}:{
  params:{
    roomid:string
  }
}) => {
  unstable_noStore();
  const [room, setRoom] = useState<any>(null); // Assuming room is of any type

  useEffect(() => {
    const fetchRoom = async () => {
      const roomData = await getRoom(params.roomid);
      if (!roomData) {
        // Handle case where room is not found
        console.log('No Room');
      } else {
        setRoom(roomData);
      }
    };

    fetchRoom();

    // Since this effect runs only once, we don't need to specify any dependencies
  }, []);

  if (!room) {
    return <div>No Room</div>;
  }

  return (
    <div className=' container mt-4'>
      <h1 className='text-4xl font-semibold'>Edit Room</h1>
      <div>
        <EditForm room={room} />
      </div>
    </div>
  );
}

export default page;
