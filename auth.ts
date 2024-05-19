import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    //   CredentialsProvider({
    //     credentials: {
    //       email: {},
    //       password: {}
    //     },
    //     async authorize(credentials){
    //       if(credentials === null) return null;
    //       try {

    //       } catch (error) {
    //         throw new Error(error);
    //       }
    //     }
    //   }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
});
