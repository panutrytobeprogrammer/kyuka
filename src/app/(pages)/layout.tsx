"use client";
import { Button } from "@heroui/react";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isIOS && !isStandalone) {
    return (
      <div className="background-theme">
        <div className="flex flex-col items-center justify-center h-screen w-full gap-4 p-4">
          <p className="text-white text-2xl font-bold">Install App</p>
          <Button variant="light" color="primary">
            Add to Home Screen
          </Button>
          {isIOS && (
            <p className="text-white text-sm text-center">
              To install this app on your iOS device, tap the share button
              <span role="img" aria-label="share icon">
                {" "}
                ⎋{" "}
              </span>
              and then &quot;Add to Home Screen&quot;
              <span role="img" aria-label="plus icon">
                {" "}
                ➕{" "}
              </span>
              .
            </p>
          )}
        </div>
      </div>
    );
  }

  return <div className="flex w-full background-theme p-2">{children}</div>;
}

export default Layout;
