import NextAuth, { Session} from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    session: {
      maxAge: 30 * 24 * 60 * 60

    },
    callbacks: {
      async jwt({ token, account }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.idToken = account.id_token
          token.provider = account.provider
        }
        return token
      },
      async session({ session, token }) {
        // Send properties to the client, like an access_token from a provider.
        //@ts-ignore
        session.provider = token.provider
        //@ts-ignore
        session.idToken = token.idToken

        return session
      }
    },
    debug: false,
});