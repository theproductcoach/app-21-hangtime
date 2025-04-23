"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  MapIcon,
  UsersIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  MapIcon as MapIconSolid,
  UsersIcon as UsersIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";

const navItems = [
  { name: "Home", href: "/", Icon: HomeIcon, IconSolid: HomeIconSolid },
  {
    name: "Directory",
    href: "/directory",
    Icon: MapIcon,
    IconSolid: MapIconSolid,
  },
  {
    name: "Community",
    href: "/community",
    Icon: UsersIcon,
    IconSolid: UsersIconSolid,
  },
  {
    name: "Profile",
    href: "/profile",
    Icon: UserIcon,
    IconSolid: UserIconSolid,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map(({ name, href, Icon, IconSolid }) => {
          const isActive = pathname === href;
          const IconComponent = isActive ? IconSolid : Icon;

          return (
            <Link
              key={name}
              href={href}
              className={`flex flex-col items-center justify-center w-full h-full
                ${
                  isActive
                    ? "text-primary"
                    : "text-text-muted hover:text-text-dark"
                }`}
            >
              <IconComponent className="h-6 w-6" />
              <span className="text-xs mt-1">{name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
