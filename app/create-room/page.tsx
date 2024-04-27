import CreateForm from '@/components/Create-room-form';
import React from 'react';

const page = () => {
  return (
    <div className=' max-w-lg mx-auto container mt-4'>
      <h1 className='text-4xl font-semibold'>Create Room</h1>
      <div>
        <CreateForm />
      </div>
    </div>
  );
}

export default page;
