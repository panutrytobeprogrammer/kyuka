"use client";
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
    const id =
      urlParams.get("id") || urlParams.get("callbackUrl")?.split("=")[1];

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
          {isIOS && (
            <p className="flex flex-col text-white text-sm text-center items-center">
              To install this app on your iOS device, tap the share button and
              then &quot;Add to Home Screen&quot;
            </p>
          )}
        </div>
      </div>
    );
  }

  return <div className="flex w-full background-theme p-2">{children}</div>;
}

export default Layout;
