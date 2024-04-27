"use client"
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";


export default function Home() {

  return (
    <main className="mt-10">
          
          <div className=" max-w-md m-auto text-center py-8">
            <Image src='/icon.png' alt="Logo" width="200" height='100' className="inline" />
          
          
           <div className="max-w-md mx-auto text-center flex flex-col items-center justify-center space-y-3">

           <h1 className="text-4xl font-semibold"> Find other awsome devs to pair with online </h1>
           
           <p className="text-xs text-gray-200">This paltform is for sharing your screen and working with other random developers online so that you can work together</p>
            <Button onClick={()=>signIn("google", {callbackUrl: "/home"})}>Get Started</Button>
           </div>
          </div>
    </main>
  );
}


