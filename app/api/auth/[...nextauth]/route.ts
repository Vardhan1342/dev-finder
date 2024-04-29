import GoogleProvider from "next-auth/providers/google"
import NextAuth, { NextAuthOptions } from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/adapter"
import { Adapter } from "next-auth/adapters"

export const authoptions=
  {
    secret: process.env.NEXTAUTH_SECRET!,
    session:{
      strategy:"jwt"
    },
    adapter:MongoDBAdapter(clientPromise) as Adapter,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        allowDangerousEmailAccountLinking: true,
      })
    ],
    callbacks: {
      async session({ session, token }) {
       if(session)
        session.user.id=token.sub ;
        return session 
      },
      async jwt({ token, user, account, profile }) {
        console.log(token)
        return token
      }
    },
     
  } satisfies NextAuthOptions


const handler = NextAuth(authoptions)

export { handler as GET, handler as POST };


