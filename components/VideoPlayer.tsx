"use client"
import { Token, findUserBYEmail } from '@/serveractions/UserDetails';
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const apiKey = "t2dy3m3evgye";
// process.env.STREAM_APIKEY! 
const callId = "csb-" + Math.random().toString(16).substring(2);


      export const VideoPlayer = ({id}:any ) => {
        console.log("idddddd" , id)
        const router=useRouter();
        const session=useSession();
        const [client, setClient] = useState<StreamVideoClient>();
        const [call, setCall] = useState<Call>();
        useEffect(() => {
          if(!session){
            return ;
          }
       
          const myClient = new StreamVideoClient({ 
            apiKey, 
            user:{
              id:  id,
              name:session.data?.user?.name ?? undefined,
              image:session.data?.user?.image ?? undefined
            },
             tokenProvider:()=>Token(id),
              });
    setClient(myClient);
    const call=myClient.call("default",callId)
    call.join({create:true})
    setCall(call)
    return () => {
      call.leave()
      .then(()=> { 
        myClient.disconnectUser().then(()=>{
        })
      })
      .catch(()=>{
        console.error
      })
       
    };
  }, []);


  if (!client || !call) return null;

  return (
   client && call &&(  <StreamVideo client={client}>
      <StreamTheme >
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls />
          <CallParticipantsList onClose={()=>router.push("/")
} />
        </StreamCall>
      </StreamTheme>
    </StreamVideo>)
  );
};