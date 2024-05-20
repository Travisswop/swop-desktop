"use server";

import { signIn, signOut } from "@/auth";
import { delay } from "@/util/WaitAMoment";
import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export async function doSignOut() {
  cookies().delete("accessToken");
  await signOut({ redirectTo: `/signin` });
  // await signOut({ redirectTo: `${process.env.WEB_LIVE_BASE_URL}/signin` });
}

export async function doSignInWithGoogle() {
  await signIn("google", { redirectTo: `/` });
  // await signIn("google", { redirectTo: `${process.env.WEB_LIVE_BASE_URL}` });
}

export async function signInWithCredentials(formData: FormData) {
  try {
    // await delay(20000);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      // redirect: false,
      redirectTo: "/",
    });
    // console.log({
    //   email: formData.get("email"),
    //   password: formData.get("password"),
    // });
    return response;
  } catch (err) {
    throw err;
  }
}
