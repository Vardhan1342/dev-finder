"use client"
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import {  useRouter, useSearchParams } from "next/navigation";


export default function Home() {
  const session =useSession();
  const router=useRouter()
  const searchParams=useSearchParams()
  return (
    <main className="mt-10">
          
          <div className=" max-w-md m-auto text-center py-8">
            <Image src='/icon.png' alt="Logo" width="200" height='100' className="inline" />
           <div className="max-w-md mx-auto text-center flex flex-col items-center justify-center space-y-3">

           <h1 className="text-4xl font-semibold"> Find other awsome devs to pair with online </h1>
           
           <p className="text-xs dark:text-gray-200 text-gray-800">This paltform is for sharing your screen and working with other random developers online so that you can work together</p>
            <Button onClick={()=>signIn('google', { callbackUrl: searchParams.get('callbackUrl') || '/dashboard' })}>Get Started</Button>
           </div>
          </div>
    </main>
  );
}


