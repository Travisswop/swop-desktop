"use client";

import { Spinner } from "@nextui-org/react";
// import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const ErrorMessage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  // const router = useRouter();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     signOut();
  //     // router.push("/signin");
  //   }, 4000);

  //   return () => clearTimeout(timer);
  // }, [router]);

  let errorMessage;

  switch (error) {
    case "Configuration":
      errorMessage =
        "You may have pressed the back button, refreshed during login, opened too many login dialogs, or there is some issue with cookies, since we couldn't find your session. Try logging in again from the application and if the problem persists please contact the administrator.";
      break;
    case "AccessDenied":
      errorMessage = "You do not have permission to sign in.";
      break;
    case "Verification":
      errorMessage = "The verification request has expired or is invalid.";
      break;
    case "CredentialsSignin":
      errorMessage =
        "Sign in failed. Please check your credentials and try again.";
      break;
    default:
      errorMessage = "An unexpected error occurred. Please try again later.";
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6">
      <Image
        alt="swop logo"
        src={"/images/logo/swop-logo.svg"}
        width={260}
        height={90}
        className="w-48 h-auto"
      />
      <h1 className="font-bold text-2xl text-gray-600">
        Oops!, something went wrong
      </h1>
      <p className="font-medium text-sm text-gray-500 text-center w-1/2 leading-loose">
        {errorMessage}
      </p>
      <p className="flex items-center gap-2 font-medium">
        Redirecting <Spinner size="sm" color="primary" />
      </p>
    </div>
  );
};

const AuthErrorPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorMessage />
    </Suspense>
  );
};

export default AuthErrorPage;
