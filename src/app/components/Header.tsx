import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { signOut, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { APIResponse, TransactionData } from "../types";

type Props = {
  title: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<
    QueryObserverResult<
      AxiosResponse<APIResponse<TransactionData[]>, any>,
      Error
    >
  >;
};

function Header({ title, refetch }: Props) {
  return (
    <div className="flex flex-row justify-between px-4 pt-8 pb-4 w-full">
      <p
        className="text-[32px] font-medium text-gray-900"
        onClick={() => refetch()}
      >
        {title}
      </p>
    </div>
  );
}

export default Header;
