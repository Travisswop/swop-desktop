"use server";

import { signIn, signOut } from "@/auth";
// import { redirect } from "next/navigation";

export async function doSignOut() {
  await signOut({ redirectTo: "http://localhost:3000/signin" });
}

export async function doSignInWithGoogle() {
  await signIn("google", { redirectTo: "http://localhost:3000/" });
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
