"use client";
import { Link } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {};

function AdminPage({}: Props) {
  const sidebarLink = [
    {
      href: "/",
      icon: null,
      label: "Home",
      itemKey: "Home",
      selectedIcon: null,
      isVisible: true,
    },
    {
      href: "/admin/add-trip",
      icon: null,
      label: "Add trip",
      itemKey: "Add trip",
      selectedIcon: null,
      isVisible: true,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <p className="font-medium text-xl">admin console</p>
      <div className="flex flex-col gap-2">
        {sidebarLink.map((item) => (
          <Link
            key={item.itemKey}
            href={item.href}
            className="p-4 border-[1px] rounded-2xl text-gray-900 w-full"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
