"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface GymCardProps {
  gym: {
    id: number;
    name: string;
    location: string;
    distance: number;
    rating: number;
    hours: {
      open: string;
      close: string;
    };
    imageUrl: string;
    facilities: string[];
  };
  facilities: {
    id: string;
    label: string;
    icon: string;
  }[];
}

const getGymLogo = (gymName: string): string => {
  const name = gymName.toLowerCase();
  if (name.includes("vertical world")) {
    return "/vertical-world-logo.png";
  }
  if (name.includes("seattle boulder") || name.includes("sbp")) {
    return "/seattle-boulder-project-logo.png";
  }
  if (name.includes("boulder district")) {
    return "/boulder-district-logo.png";
  }
  return "";
};

export default function GymCard({ gym, facilities }: GymCardProps) {
  const router = useRouter();
  const [isHomeGym, setIsHomeGym] = useState(false);
  const logoPath = getGymLogo(gym.name);

  useEffect(() => {
    const homeGymId = localStorage.getItem("homeGymId");
    setIsHomeGym(homeGymId === gym.id.toString());
  }, [gym.id]);

  const handleSetHomeGym = () => {
    localStorage.setItem("homeGymId", gym.id.toString());
    localStorage.setItem(
      "homeGymData",
      JSON.stringify({
        name: gym.name,
        location: gym.location,
      })
    );
    setIsHomeGym(true);
  };

  const handleViewGym = () => {
    router.push(`/gym/${gym.id}`);
  };

  return (
    <article className="h-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header Section */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-primary truncate pr-2">
            {gym.name}
          </h3>
          {isHomeGym && (
            <span className="inline-flex items-center bg-accent/10 text-accent rounded-full px-2 py-1 text-sm">
              🏠 Home Gym
            </span>
          )}
        </div>
        <div className="flex items-center text-text-muted text-sm mt-1">
          <span className="flex-shrink-0 text-accent">📍</span>
          <span className="ml-1 truncate">{gym.location}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div className="flex gap-4 items-center">
          {/* Left Column - Image */}
          <div className="flex-shrink-0 w-28 h-28 flex items-center justify-center bg-white rounded-lg">
            {logoPath ? (
              <Image
                src={logoPath}
                alt={`${gym.name} Logo`}
                width={112}
                height={112}
                className="object-contain p-2"
              />
            ) : (
              <div className="w-28 h-28 bg-primary/10 rounded-lg flex items-center justify-center text-3xl">
                🧗
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="flex-1 min-w-0">
            {/* Stats Row */}
            <div className="flex items-center text-sm mb-2">
              <div className="flex items-center text-accent">
                <span>⭐</span>
                <span className="ml-1 text-text-muted">{gym.rating}</span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-text-muted">{gym.distance} miles</span>
            </div>

            {/* Hours */}
            <div className="text-sm mb-3">
              <span className="text-primary font-medium">
                Open {gym.hours.open} - {gym.hours.close}
              </span>
            </div>

            {/* Facilities */}
            <div className="relative">
              <div className="flex flex-wrap gap-2">
                {gym.facilities.map((facilityId) => {
                  const facility = facilities.find((f) => f.id === facilityId);
                  return (
                    facility && (
                      <span
                        key={facilityId}
                        className="inline-flex items-center bg-gray-50 rounded-md px-2 py-1 text-sm"
                        title={facility.label}
                      >
                        <span className="mr-1">{facility.icon}</span>
                        <span className="text-text-muted">
                          {facility.label}
                        </span>
                      </span>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-2 mt-4 pt-3 border-t border-gray-100">
          {!isHomeGym && (
            <button
              onClick={handleSetHomeGym}
              className="text-accent hover:text-accent/90 px-3 py-1.5 text-sm font-medium transition-colors"
            >
              Set as Home
            </button>
          )}
          <button
            onClick={handleViewGym}
            className="bg-accent hover:bg-accent/90 text-white rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            View
          </button>
        </div>
      </div>
    </article>
  );
}
