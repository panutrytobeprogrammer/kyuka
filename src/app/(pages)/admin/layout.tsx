import React from "react";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return <div className="flex flex-col p-6 w-full">{children}</div>;
}

export default layout;
