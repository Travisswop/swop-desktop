"use client";
import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import HomePageLoading from "./loading/HomePageLoading";

const Testing = () => {
  useEffect(() => {
    signOut();
  }, []);

  return <HomePageLoading />;
};

export default Testing;
