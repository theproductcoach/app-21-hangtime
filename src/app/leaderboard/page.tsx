"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { TrophyIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  emoji: string;
  totalClimbs: number;
  totalVisits: number;
  uniqueGyms: number;
  country: string;
}

const mockUsers: LeaderboardUser[] = [
  {
    id: "1",
    name: "Alex Honnold",
    avatar: "",
    emoji: "🧗",
    totalClimbs: 892,
    totalVisits: 156,
    uniqueGyms: 12,
    country: "USA",
  },
  {
    id: "2",
    name: "Emma Stone",
    avatar: "",
    emoji: "🎯",
    totalClimbs: 745,
    totalVisits: 134,
    uniqueGyms: 8,
    country: "UK",
  },
  {
    id: "3",
    name: "Chris Sharma",
    avatar: "",
    emoji: "💪",
    totalClimbs: 678,
    totalVisits: 98,
    uniqueGyms: 15,
    country: "USA",
  },
  {
    id: "4",
    name: "Janja Garnbret",
    avatar: "",
    emoji: "⚡",
    totalClimbs: 589,
    totalVisits: 87,
    uniqueGyms: 10,
    country: "Slovenia",
  },
  {
    id: "5",
    name: "Adam Ondra",
    avatar: "",
    emoji: "🌟",
    totalClimbs: 534,
    totalVisits: 76,
    uniqueGyms: 9,
    country: "Czech Republic",
  },
  {
    id: "current",
    name: "You",
    avatar: "",
    emoji: "😎",
    totalClimbs: 359,
    totalVisits: 45,
    uniqueGyms: 5,
    country: "USA",
  },
  {
    id: "6",
    name: "Ashima Shiraishi",
    avatar: "",
    emoji: "🎨",
    totalClimbs: 423,
    totalVisits: 65,
    uniqueGyms: 7,
    country: "Japan",
  },
  {
    id: "7",
    name: "Tommy Caldwell",
    avatar: "",
    emoji: "🏔️",
    totalClimbs: 389,
    totalVisits: 54,
    uniqueGyms: 6,
    country: "USA",
  },
  {
    id: "8",
    name: "Lynn Hill",
    avatar: "",
    emoji: "🦋",
    totalClimbs: 345,
    totalVisits: 43,
    uniqueGyms: 8,
    country: "USA",
  },
  {
    id: "9",
    name: "Jimmy Webb",
    avatar: "",
    emoji: "🌊",
    totalClimbs: 312,
    totalVisits: 39,
    uniqueGyms: 5,
    country: "USA",
  },
  {
    id: "10",
    name: "Sasha DiGiulian",
    avatar: "",
    emoji: "🎭",
    totalClimbs: 289,
    totalVisits: 35,
    uniqueGyms: 4,
    country: "USA",
  },
];

const categories = [
  { id: "climbs", name: "Total Climbs", icon: "🧗" },
  { id: "visits", name: "Total Visits", icon: "🏃" },
  { id: "gyms", name: "Unique Gyms", icon: "🌍" },
];

const countries = [
  "All Countries",
  "USA",
  "UK",
  "Japan",
  "Slovenia",
  "Czech Republic",
];

const getBadgeEmoji = (index: number) => {
  switch (index) {
    case 0:
      return "🏆";
    case 1:
      return "🥈";
    case 2:
      return "🥉";
    default:
      return "";
  }
};

export default function LeaderboardPage() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");

  const getSortedUsers = (category: string, country: string) => {
    let filteredUsers = mockUsers;
    if (country !== "All Countries") {
      filteredUsers = mockUsers.filter((user) => user.country === country);
    }

    return filteredUsers.sort((a, b) => {
      switch (category) {
        case "climbs":
          return b.totalClimbs - a.totalClimbs;
        case "visits":
          return b.totalVisits - a.totalVisits;
        case "gyms":
          return b.uniqueGyms - a.uniqueGyms;
        default:
          return 0;
      }
    });
  };

  const getStatValue = (user: LeaderboardUser, category: string) => {
    switch (category) {
      case "climbs":
        return `${user.totalClimbs} climbs`;
      case "visits":
        return `${user.totalVisits} visits`;
      case "gyms":
        return `${user.uniqueGyms} gyms`;
      default:
        return "";
    }
  };

  const getCurrentUserRank = (sortedUsers: LeaderboardUser[]) => {
    return sortedUsers.findIndex((user) => user.id === "current") + 1;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <TrophyIcon className="w-6 h-6 text-yellow-500" />
            Leaderboard
          </h1>
          <div className="flex items-center gap-2">
            <GlobeAltIcon className="w-5 h-5 text-gray-500" />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Tab.Group onChange={setSelectedCategory}>
          <Tab.List className="flex space-x-1 rounded-xl bg-white p-1 shadow-sm mb-6">
            {categories.map((category) => (
              <Tab
                key={category.id}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                  ${
                    selected
                      ? "bg-accent text-white shadow"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                <span className="flex items-center justify-center gap-2">
                  <span>{category.icon}</span>
                  {category.name}
                </span>
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            {categories.map((category) => (
              <Tab.Panel key={category.id}>
                <div className="space-y-2">
                  {getSortedUsers(category.id, selectedCountry)
                    .slice(0, 10)
                    .map((user, index) => (
                      <div
                        key={user.id}
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          user.id === "current"
                            ? "bg-accent/10 ring-2 ring-accent"
                            : "bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 text-center">
                            {getBadgeEmoji(index) || index + 1}
                          </span>
                          <span className="w-8 text-2xl">{user.emoji}</span>
                          <span className="font-medium">{user.name}</span>
                        </div>
                        <span className="text-gray-700">
                          {getStatValue(user, category.id)}
                        </span>
                      </div>
                    ))}
                </div>

                {getCurrentUserRank(
                  getSortedUsers(category.id, selectedCountry)
                ) > 10 && (
                  <div className="mt-6 p-4 rounded-lg bg-gray-100 text-center">
                    <p className="text-gray-600">Your Rank</p>
                    <p className="text-xl font-bold">
                      #
                      {getCurrentUserRank(
                        getSortedUsers(category.id, selectedCountry)
                      )}
                    </p>
                  </div>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
