import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        try {
          const response = await fetch(
            "http://localhost:8000/api/v1/user/signin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            }
          );
          // console.log("response, ", response);

          if (response.ok) {
            const data = await response.json();
            const token = data.accessToken;
            cookies().set("accessToken", token, {
              httpOnly: true,
            });
            if (data) {
              const sessionData = {
                name: data.data.fullName,
                email: data.data.email,
                image: data.data.imageUrl,
                accessToken: data.accessToken,
              };
              user = sessionData;
              // console.log("user data from auth.js", sessionData);
              return user;
            }
          } else {
            return null;
          }
        } catch (error) {
          console.log("hola error", error);
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
    signIn: "http://localhost:3000/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 60,
  },
  callbacks: {
    // async signIn({ account, profile }) {
    //   if (account?.provider === "google") {
    //     try {
    //       const response = await fetch(
    //         "http://localhost:8000/api/v1/user/social-signin",
    //         {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({ email: "shahak@gmail.com" }),
    //         }
    //       );

    //       if (response.ok) {
    //         // If the response status is in the range 200-299
    //         const data = await response.json();
    //         const token = data?.accessToken;
    //         cookies().set("accessToken", token, {
    //           httpOnly: true,
    //           sameSite: "lax",
    //           // secure: true,
    //         });

    //         console.log("dataaa", data);

    //         return data;
    //       } else {
    //         // If the response status is outside the range 200-299
    //         console.error("Unexpected response status:", response.status);
    //         const errorData = await response.json();
    //         console.error("Error response from server:", errorData);
    //       }
    //       return profile;
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   return true; // Do different verification for other providers that don't have `email_verified`
    // },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }: any) {
      // console.log("session", session);
      // console.log("token", token);
      if (!token?.accessToken) {
        try {
          const response = await fetch(
            "http://localhost:8000/api/v1/user/social-signin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: "shahak@gmail.com" }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            const accessToken = data?.accessToken;
            // cookies().set("accessToken", accessToken, {
            //   httpOnly: true,
            //   sameSite: "lax",
            //   // secure: true,
            // });

            const dataWithToken = {
              ...token,
              accessToken: accessToken,
            };
            session.user = dataWithToken;
            return session;
          }
        } catch (error) {
          console.log(error);
        }
        // const data = {
        //   ...token,
        //   accessToken: "rerefddsshhdfd",
        // };
        // session.user = data;
        // return session;
      } else {
        session.user = token;
        return session;
      }
    },
  },
});
