"use client";
import { GoogleIcon } from "@components/Icons";
import { Button } from "@heroui/react";
import { signIn } from "next-auth/react";

type Props = {};

function LoginPage({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-[105vh] w-full overflow-y-auto">
      <div className="flex flex-col items-center justify-center bg-box rounded-[12px] p-4 gap-4">
        <p className="text-xl font-medium">Welcome to Ryoko</p>
        <Button
          className="body-lg bold bg-item"
          onPress={() => signIn("google")}
          data-testid="signin-google-btn"
          startContent={<GoogleIcon height={30} width={30} />}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
