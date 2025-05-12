"use client";
import { Button } from "@heroui/react";
import { signIn } from "next-auth/react";

type Props = {};

function LoginPage({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex flex-col items-center justify-center bg-box rounded-lg p-4">
        <p className="text-xl">Login</p>
        <Button onPress={() => signIn("google")} variant="solid">
          Login
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
