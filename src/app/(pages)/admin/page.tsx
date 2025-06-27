"use client";
import { IconOpenIn } from "@components/Icons";
import { getAllTrip } from "@libs/service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

type Props = {};

function AdminPage({}: Props) {
  const sidebarLink = [
    // {
    //   href: "/",
    //   icon: null,
    //   label: "Home",
    //   itemKey: "Home",
    //   selectedIcon: null,
    //   isVisible: true,
    // },
    {
      href: "/admin/add-trip",
      icon: null,
      label: "Add trip",
      itemKey: "Add trip",
      selectedIcon: null,
      isVisible: true,
    },
  ];

  const allTripQuery = useQuery({
    queryKey: ["allTrip"],
    queryFn: async () => await getAllTrip(),
  });

  return (
    <div className="flex flex-col gap-4">
      <p className="font-medium text-xl">admin console</p>
      {/* <div className="flex gap-2">
        {sidebarLink.map((item) => (
          <Link
            key={item.itemKey}
            href={item.href}
            className="p-4 border-[1px] rounded-2xl text-gray-900 w-full"
          >
            {item.label}
          </Link>
        ))}
      </div> */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <p className="text-md font-normal">all trip</p>
          <Link
            href="/admin/add-trip"
            className="py-1 px-2 rounded-lg text-white bg-item"
          >
            add trip
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {allTripQuery.data?.data.data.map((item) => (
            <Link
              key={item.url}
              className="p-2 border-[1px] rounded-xl text-gray-900 w-full flex justify-between items-center"
              href={item.url}
            >
              {item.name}
              <IconOpenIn width={16} height={16} color="#a2a2a2" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
