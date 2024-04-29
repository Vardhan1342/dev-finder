"use client"
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Image from 'next/image';
import { GoSignOut } from "react-icons/go";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useTheme } from "next-themes"
import { MdDeleteOutline } from "react-icons/md";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogFooter
  } from './ui/alert-dialog';
import { deleteUser } from '@/serveractions/UserDetails';
import { useToast } from './ui/use-toast';
import Link from 'next/link';

const Header = () => {
    const {data}=useSession();
  const { setTheme } = useTheme()
  const [dark,setdark]=useState<boolean>(false);
  const [open,setOpen]=useState<boolean>(false);
 const {toast}=useToast()
  const handleclick=()=>{
    setdark(prev=> !prev)
    dark ? setTheme("dark") :setTheme("light")
  }
  return (
  <div className="">
       <AlertDialog open={open} onOpenChange={setOpen} >
                 
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          deleteUser()
                            .then(() => {
                              toast({
                                title: "Account Deleted ",
                              });
                              setOpen(false)
                              signOut({callbackUrl:"/"})
                            })
                            .catch(() => {
                              toast({
                                variant: "destructive",
                                title: "Uh oh! Something went wrong.",
                              });
                            })
                        }
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
      {data && <div>
            <Link href="/home" className='underline'>Home</Link>
      </div>
      }
      <div className='mr-2'> 
           
            
      {data &&
             <DropdownMenu >
                <DropdownMenuTrigger>
                    <Avatar className=' flex rounded-3xl items-center border-2 border-gray-700 dark:border-white p-[4px]' >
                      <AvatarImage src={data?.user?.image?? ""} alt="name" className='rounded-full' width='40' />
                      <span className='text-sm p-2'>{data?.user?.name}</span>
                    </Avatar>
                  </DropdownMenuTrigger>
                <DropdownMenuContent>
                    
                    <Button variant="outline" className='w-full' onClick={()=>signOut({ callbackUrl: '/' })}><GoSignOut /> Sign out</Button>
                     <DropdownMenuSeparator />
                     <Button variant="outline" onClick={()=>setOpen(true)}><MdDeleteOutline />Delete Account</Button>
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
