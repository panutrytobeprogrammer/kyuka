"use client";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";

type Props = {};

function page({}: Props) {
  useEffect(() => {
    signOut({ callbackUrl: "/login" });
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      logging out...
    </div>
  );
}

export default page;
