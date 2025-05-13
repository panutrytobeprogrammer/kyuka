import React from "react";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return <div className="flex w-full background-theme p-2">{children}</div>;
}

export default Layout;
