"use server";

import { signIn, signOut } from "@/auth";
// import { delay } from "@/util/WaitAMoment";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export async function doSignOut() {
  await signOut({ redirectTo: `/signin` });
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
      redirect: false,
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
export async function checkIsUserExist(email: string) {
  try {
    // console.log("email", email);

    const emailData = {
      email: email,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/checkUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
