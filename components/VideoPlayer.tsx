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
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const apiKey = "t2dy3m3evgye";
// process.env.STREAM_APIKEY! 


      export const VideoPlayer = ({id}:any ) => {
        const params=useParams()
        const roomid=params.roomid as string 
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
              id:  session.data?.user?.id || id,
              name:session.data?.user?.name ?? undefined,
              image:session.data?.user?.image ?? undefined
            },
             tokenProvider:()=>Token(id),
              });
    setClient(myClient);
    const call=myClient.call("livestream",roomid)
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