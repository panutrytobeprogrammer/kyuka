"use client";
import { GoogleIcon } from "@components/Icons";
import { addToast, Button } from "@heroui/react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type Props = {};

function LoginPage({}: Props) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");

  useEffect(() => {
    if (!!error) {
      addToast({
        title: "you don't have a permission to log in this website.",
        color: "danger",
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[105vh] w-full overflow-y-auto">
      <div className="flex flex-col items-center justify-center bg-box rounded-[12px] p-4 gap-4">
        <p className="text-xl font-medium text-gray-50">Welcome to Kyūka</p>
        <Button
          className="body-lg bold bg-item"
          onPress={() => signIn("google", { callbackUrl })}
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
