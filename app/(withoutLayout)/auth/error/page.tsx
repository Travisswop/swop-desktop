"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ErrorMessage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage;

  switch (error) {
    case "Configuration":
      errorMessage =
        "There is a problem with the server configuration. Please check the server logs for more information.";
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
    <div>
      <h1>Authentication Error</h1>
      <p>{errorMessage}</p>
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
