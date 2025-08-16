import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { IconHome } from "./Icons";

type Props = {
  children: React.ReactNode;
};

function NavBar({ children }: Props) {
  const session = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <div className="fixed bottom-0 bg-white w-full pb-12 pt-4 rounded-t-[3rem]">
      <div className="flex gap-4 w-full justify-evenly">
        <Button isIconOnly>
          <IconHome />
        </Button>
        {children}
        <Dropdown>
          <DropdownTrigger>
            <div className="flex gap-2 items-center border-1 rounded-full">
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
    </div>
  );
}

export default NavBar;
