// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// // For more information on each option (and a full list of options) go to
// // https://next-auth.js.org/configuration/options
// export default NextAuth({
//   // https://next-auth.js.org/configuration/providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID as string,
//       clientSecret: process.env.GOOGLE_SECRET as string,
//     }),
//   ],

//   // secret: process.env.SECRET,

//   // session: {
//   //   // Use JSON Web Tokens for session instead of database sessions.
//   //   // This option can be used with or without a database for users/accounts.
//   //   // Note: `strategy` should be set to 'jwt' if no database is used.
//   //   strategy: 'jwt'

//   //   // Seconds - How long until an idle session expires and is no longer valid.
//   //   // maxAge: 30 * 24 * 60 * 60, // 30 days

//   //   // Seconds - Throttle how frequently to write to database to extend a session.
//   //   // Use it to limit write operations. Set to 0 to always update the database.
//   //   // Note: This option is ignored if using JSON Web Tokens
//   //   // updateAge: 24 * 60 * 60, // 24 hours
//   // },

//   // // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
//   // // option is set - or by default if no database is specified.
//   // // https://next-auth.js.org/configuration/options#jwt
//   // jwt: {
//   //   // A secret to use for key generation (you should set this explicitly)
//   //   secret: process.env.SECRET,
//   //   // Set to true to use encryption (default: false)
//   //   // encryption: true,
//   //   // You can define your own encode/decode functions for signing and encryption
//   //   // if you want to override the default behaviour.
//   //   // encode: async ({ secret, token, maxAge }) => {},
//   //   // decode: async ({ secret, token, maxAge }) => {},
//   // },

//   // // You can define custom pages to override the built-in ones. These will be regular Next.js pages
//   // // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
//   // // The routes shown here are the default URLs that will be used when a custom
//   // // pages is not specified for that route.
//   // // https://next-auth.js.org/configuration/pages
//   pages: {
//     // signIn: '/signin',  // Displays signin buttons
//   //   // signOut: '/auth/signout', // Displays form with sign out button
//   //   // error: '/auth/error', // Error code passed in query string as ?error=
//   //   // verifyRequest: '/auth/verify-request', // Used for check email page
//   //   // newUser: null // If set, new users will be directed here on first sign in
//   },

//   // Callbacks are asynchronous functions you can use to control what happens
//   // when an action is performed.
//   // https://next-auth.js.org/configuration/callbacks
//   // callbacks: {
//   //   async signIn({ user, account, profile, email, credentials }) { return true },
//   //   async redirect({ url, baseUrl }) { return baseUrl },
//   //   async session({ session, token, user }) { return session },
//   //   async jwt({ token, user, account, profile, isNewUser }) { return token }
//   // },

//   // // Events are useful for logging
//   // // https://next-auth.js.org/configuration/events
//   // events: {},

//   // Enable debug messages in the console if you are having problems
//   debug: true,
// })

import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

interface SessionExtension extends DefaultSession {
  accessToken: string;
  refreshToken: string;
}

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    callbacks: {
      async jwt({ token, account }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.accessToken = account.access_token
          token.idToken = account.id_token
        }
        return token
      },
      async session({ session, token }) {
        // Send properties to the client, like an access_token from a provider.
        //@ts-ignore
        session.accessToken = token.accessToken
        //@ts-ignore
        session.idToken = token.idToken

        return session
      }
    }
});