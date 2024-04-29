"use client";
import { rooms } from "@/components/Room-Card";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { findUserBYEmail } from "@/serveractions/UserDetails";
import { getRoom } from "@/serveractions/createroom";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiGithub } from "react-icons/fi";

const page = () => {
  const [room, setRoom] = useState<any>();
  const [userid, setUserid] = useState<any>(" ");
  const params = useParams();
  const roomid = params.roomid as string;
  const roomdetails = () => {
    getRoom(roomid).then((res) => {
      setRoom(res);
    });
  };
  const session = useSession();
  const email = session?.data?.user?.email;
  console.log(email);

  console.log(room);
  useEffect(() => {
    console.log("useEffect called");
    roomdetails();
    findUserBYEmail(email as string).then((res) => {
      setUserid(res);
    });
  }, []);

  return (
    <div className="flex flex-col-reverse  md:flex-row justify-between  mt-2">
      <div className="flex-1">
        <VideoPlayer id={userid} />
      </div>
      <div className="flex-none max-w-[20rem]">
        <Card className=" ml-2 ">
          <CardHeader>
            <CardTitle>{room && room.roomname}</CardTitle>
            <CardDescription className="break-words">
              {room && room.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex  space-x-1.5">
                <FiGithub size={20} />{" "}
                <p className="text-sm">
                  Github{" "}
                  <a
                    href={room && room.githubrepo}
                    className="underline text-blue-600"
                    target="_blank"
                  >
                    Link
                  </a>
                </p>
              </div>
              <div>
                {room && room.language && room.language.includes(",") ? (
                  room.language
                    .split(",")
                    .map((item: string) => (
                      <Badge className="mr-1 rounded-3xl">{item}</Badge>
                    ))
                ) : (
                  <Badge className="mr-1 rounded-3xl">{room?.language}</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
