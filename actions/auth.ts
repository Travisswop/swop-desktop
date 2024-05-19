"use server";

import { signIn, signOut } from "@/auth";
// import { redirect } from "next/navigation";

export async function doSignOut() {
  await signOut({ redirectTo: `${process.env.WEB_LIVE_BASE_URL}/signin` });
}

export async function doSignInWithGoogle() {
  await signIn("google", { redirectTo: `${process.env.WEB_LIVE_BASE_URL}` });
}

export async function login(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
}
