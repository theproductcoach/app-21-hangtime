"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  MapPinIcon,
  UserIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  MapPinIcon as MapPinIconSolid,
  UserIcon as UserIconSolid,
  TrophyIcon as TrophyIconSolid,
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
    href: "/gyms",
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
    name: "Profile",
    href: "/profile",
    icon: UserIcon,
    activeIcon: UserIconSolid,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full
                ${
                  isActive
                    ? "text-primary"
                    : "text-text-muted hover:text-text-dark"
                }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
