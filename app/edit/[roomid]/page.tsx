"use client"
import EditForm from '@/components/Edit-form';
import { getRoom } from '@/serveractions/createroom';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const page = () => {
    
  return (
    <div className=' container mt-4'>
      <h1 className='text-4xl font-semibold'>Edit Room</h1>
      <div>
        <EditForm />
      </div>
    </div>
  );
}

export default page;
