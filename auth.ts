import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // console.log("credentials", credentials);

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();

            const token = data.token;

            if (data) {
              const sessionData = {
                _id: data.data._id,
                name: data.data.name,
                email: data.data.email,
                image: data.data.profilePic,
                accessToken: token,
              };
              user = sessionData;
              // console.log("user data from auth.js", sessionData);
              return user;
            }
          } else {
            return null;
          }
        } catch (error) {
          console.error("error in auth", error);
          return null;
        }
        return user;
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    // signIn: "http://localhost:3000/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }: any) {
      if (!token?.accessToken) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/sociallogin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: token.email }),
            }
          );
          if (response.ok) {
            const data = await response.json();
            const accessToken = data?.token;
            const dataWithToken = {
              ...token,
              _id: data.data._id,
              accessToken: accessToken,
            };
            session.user = dataWithToken;
            return session;
          }
        } catch (error) {
          console.error("error occur from social signin", error);
        }
      } else {
        session.user = token;
        return session;
      }
    },
  },
});
