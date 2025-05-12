import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { signOut, useSession } from "next-auth/react";

type Props = {
  title: string;
};

function Header({ title }: Props) {
  const session = useSession();

  return (
    <div className="flex justify-between px-4 py-2">
      <p className="text-[32px] font-medium text-gray-50">{title}</p>
      <Dropdown>
        <DropdownTrigger>
          <div className="flex gap-2 items-center">
            {session.status === "authenticated" && (
              <>
                <Avatar
                  className={`cursor-pointer label-md bold bg-opacity-45`}
                  src={session.data.user?.image || undefined}
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
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <p className="label-md bold">Sign out</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default Header;
