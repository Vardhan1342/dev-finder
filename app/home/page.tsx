"use client"
import { Suspense } from "react";
import Loading from "../loading";
import RoomCard from "@/components/Room-Card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BounceLoader } from "react-spinners";

export default function Page() {
 const session=useSession();
 const router = useRouter();
 if(!session){
  router.push("/")
 }
  return (
    <main className="container mt-4">
             
            <Suspense fallback={<Loading />}>
                 <RoomCard />    
            </Suspense>
    </main>
  );
}

