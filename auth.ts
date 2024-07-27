import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
// import axios from "axios";

export const maxDuration = 60;

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
              // console.log("user data from auth.js", user);
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
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // console.log("initial token", token);
      // console.log("jwt user", user);
      // console.log("jwt account", account);

      if (account && account.provider === "google") {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/sociallogin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: user.email }),
            }
          );
          if (response.ok) {
            const data = await response.json();
            const dataWithToken = {
              ...token,
              _id: data.data._id,
              accessToken: data.token,
            };
            token = dataWithToken;
          }
        } catch (error) {
          console.error("error occur from social signin", error);
        }
        return token;
      } else {
        const data = {
          ...token,
          ...user,
        };
        return data;
      }
    },

    session({ session, token }) {
      // console.log("session token", token);
      // console.log("session data", session);
      const value = {
        ...token,
        ...session,
      };
      return value;
    },

    // async jwt({ token, user }) {
    //   console.log("call on every time");

    //   return { ...token, ...user };
    // },

    // async signIn({ user, account }) {
    //   console.log("user", user);

    //   if (account?.provider === "google") {
    //     const response = await axios.post(
    //       `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/sociallogin`,
    //       {
    //         email: user.email,
    //       }
    //     );

    //     if (response.data) {
    //       account = {
    //         ...account,
    //         _id: response.data.data._id,
    //         accessToken: response.data.token,
    //       };

    //       // account._id = response.data._id;
    //       // account.accessToken = response.data.token;
    //     }
    //     console.log("account in signIn", account);
    //   }
    //   return true;
    // },

    // async jwt({ token, account }) {
    //   if (account?.provider === "google") {
    //     console.log("token", token);
    //     console.log("account in jwt", account);

    //     token._id = account._id;
    //     token.accessToken = account.acessToken;
    //   }
    //   return token;
    // },

    // async session({ session, token }) {
    //   console.log("session", session);

    //   session.user._id = token._id;
    //   session.user.accessToken = token.accessToken;
    //   return session;
    // },

    // async jwt({ token, account }) {
    //   if (account && account.provider === "google") {
    //     try {
    //       const response = await fetch(
    //         `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/sociallogin`,
    //         {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({ email: token.email }),
    //         }
    //       );
    //       if (response.ok) {
    //         const data = await response.json();
    //         // console.log("token data in auth.ts", data.token);
    //         // console.log("data form auth", data);

    //         const dataWithToken = {
    //           ...token,
    //           _id: data.data._id,
    //           accessToken: data.token,
    //         };
    //         token = dataWithToken;
    //       }
    //     } catch (error) {
    //       console.error("error occur from social signin", error);
    //     }
    //     return token;
    //   }
    // },
    // async session({ session, token }) {
    //   session.user.accessToken = token.accessToken; // Add the token to the session
    //   session.user._id = token._id; // Add the token to the session
    //   return session;
    // },
  },
});
