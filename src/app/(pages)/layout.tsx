"use client";
import { Button } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const urlParams = useSearchParams();
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  useEffect(() => {
    const id = urlParams.get("id") || "default";

    const manifestLink = document.createElement("link");
    manifestLink.rel = "manifest";
    manifestLink.href = `/api/manifest?id=${id}`;
    document.head.appendChild(manifestLink);
  }, [urlParams]);

  if (isIOS && !isStandalone && process.env.NODE_ENV === "production") {
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
