import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions ={
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID as string,
          clientSecret: process.env.GOOGLE_SECRET as string,
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
        }),
    ],
    session: {
      maxAge: 30 * 24 * 60 * 60,
      strategy: 'jwt'

    },
    callbacks: {
      async jwt({ token, account, trigger, session }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.idToken = account.id_token
          token.provider = account.provider
        }
        if (trigger === "update" && session?.data) {
          // Note, that `session` can be any arbitrary object, remember to validate it!
          token.data = session.data
        }
        
        return token
      },
      async session({ session, token }) {
        // Send properties to the client, like an access_token from a provider.
        //@ts-ignore
        session.provider = token.provider
        //@ts-ignore
        session.idToken = token.idToken
        if(token?.data){
          // @ts-ignore
          session.access = token.data.tokens.access
          // @ts-ignore
          session.refresh = token.data.tokens.refresh
        }
        return session
      }
    },
    pages: {
      signIn: '/auth/signin',
      // signOut: '/auth/signout',
      // error: '/auth/error', // Error code passed in query string as ?error=
      // verifyRequest: '/auth/verify-request', // (used for check email message)
      // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    debug: false,
};

export default NextAuth(authOptions);