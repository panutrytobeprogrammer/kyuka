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
  const session = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-row justify-between px-4 py-2 w-full">
      <p
        className="text-[32px] font-medium text-gray-900"
        onClick={() => refetch()}
      >
        {title}
      </p>
      <Dropdown>
        <DropdownTrigger>
          <div className="flex gap-2 items-center">
            {session.status === "authenticated" && (
              <>
                <Avatar
                  className={`cursor-pointer label-md bold`}
                  // src={session.data.user?.image || undefined}
                  isBordered
                />
              </>
            )}
          </div>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            key="user"
            color="default"
            className="label-md cursor-default"
            closeOnSelect={false}
          >
            Sign in as{" "}
            <span className="bold">
              {session.data?.user?.email?.split("@")[0]}
            </span>
          </DropdownItem>
          <DropdownItem
            key="sign out"
            color="danger"
            className="text-red-500 hover:text-white"
            onClick={() =>
              signOut({
                callbackUrl: `/login?callbackUrl=${encodeURIComponent(
                  pathname + "?" + searchParams.toString()
                )}`,
                redirect: true,
              })
            }
          >
            <p className="label-md bold">Sign out</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default Header;
