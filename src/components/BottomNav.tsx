"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  MapPinIcon,
  UserIcon,
  TrophyIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  MapPinIcon as MapPinIconSolid,
  UserIcon as UserIconSolid,
  TrophyIcon as TrophyIconSolid,
  UsersIcon as UsersIconSolid,
} from "@heroicons/react/24/solid";

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
    activeIcon: HomeIconSolid,
  },
  {
    name: "Gyms",
    href: "/directory",
    icon: MapPinIcon,
    activeIcon: MapPinIconSolid,
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: TrophyIcon,
    activeIcon: TrophyIconSolid,
  },
  {
    name: "Community",
    href: "/community",
    icon: UsersIcon,
    activeIcon: UsersIconSolid,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: UserIcon,
    activeIcon: UserIconSolid,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = isActive ? item.activeIcon : item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center py-2 px-3 text-sm ${
                  isActive ? "text-accent" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="mt-1 text-xs">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
