"use client"
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useTheme } from "next-themes"

const Header = () => {
    const {data}=useSession();
  const { setTheme } = useTheme()
  const [dark,setdark]=useState<boolean>(false)
  const handleclick=()=>{
    setdark(prev=> !prev)
    dark ? setTheme("dark") :setTheme("light")
  }
  return (
  <div className="">
    <div className='bg-gray-100/60  flex justify-between items-center pt-2 dark:bg-slate-900/40'>
      
      <div className='flex items-center justify-center gap-x-2'>
              <Image
               src="/icon.png"
               alt="icon"
               width="100"
               height="80"
              />
              <h1 className='text-4xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent italic invisible sm:visible p-1'>DEV XP</h1>
      </div>
      <div className='mr-2'> 
           
            
      {data &&
             <DropdownMenu >
                <DropdownMenuTrigger>
                    <Avatar className='rounded-full aspect-square w-12 border-2 border-gray-700 dark:border-white p-[4px]' >
                      <AvatarImage src={data?.user?.image?? ""} alt="name" />
                      <span className='text-sm p-2'>{data?.user?.name}</span>
                    </Avatar>
                  </DropdownMenuTrigger>
                <DropdownMenuContent>
                    
                    <Button variant="outline" className='w-full' onClick={()=>signOut({ callbackUrl: '/' })}>Sign out</Button>
                  
                </DropdownMenuContent>
              </DropdownMenu>
                
              
              }

      </div>
    </div>
    <div className='fixed  right-5 bottom-5' onClick={handleclick}>
     
        <ModeToggle />
    </div>
   </div>
  );
}

export default Header;
