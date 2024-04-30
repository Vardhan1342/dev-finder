"use client";

import { rooms } from "@/components/Room-Card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { deleteUserRoom, getUserRooms } from "@/serveractions/UserDetails";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiGithub } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Pencil1Icon } from "@radix-ui/react-icons";

const page = () => {
  const { toast } = useToast();
  const [rooms, setRooms] = useState<Array<rooms>>([]);
  useEffect(() => {
    getUserRooms().then((res) => {
      setRooms(res);
    });
  }, []);
  if (rooms.length==0) {
    return (
      <>
        
      </>
    );
  }
  return (
    <div>
        <h1 className="text-3xl font-semibold m-2">Your Rooms</h1>
        {rooms && rooms.length==0 ?
              <div className=" absolute top-1/2 left-[45%]  flex flex-col justify-center items-center space-y-2">
              <h1>No Rooms</h1>
              <Button asChild>
                <Link href="/create-room">Create Room</Link>
              </Button>
            </div>
        :
      <div className="relative container grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
                 
          {rooms.map((room) => (
            <Card className=" m-2 realtive">
              <CardHeader>
                <CardTitle className="flex gap-x-1 items-center ">
                  {room.roomname}
                  <Button variant="ghost" size="sm" className="p-0 px-1" asChild>
                    <Link href={`/edit/${room.id}`}><Pencil1Icon /></Link>
                  </Button>
                  </CardTitle>
                <CardDescription>{room.description}</CardDescription>
              </CardHeader>
                
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex  space-x-1.5">
                    <FiGithub size={20} />{" "}
                    <p className="text-sm">
                      Github{" "}
                      <a
                        href={room.githubrepo}
                        className="underline text-blue-600"
                      >
                        Link
                      </a>
                    </p>
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
              <CardFooter className="flex justify-end gap-x-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Room</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your Room and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          deleteUserRoom(room.id)
                            .then(() => {
                              toast({
                                title: "Room Deleted ",
                              });
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

                <Button className="">
                  <Link href={`/room/${room.id}`} replace>Join Room</Link>
                </Button>
              </CardFooter>
             
            </Card>
          ))}
      </div>

        }</div>
  );
};
export default page;
