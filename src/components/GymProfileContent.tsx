// Client component
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import { getGymBanner } from "@/utils/gymImages";

interface GymStats {
  visitCount: number;
  climbCount: number;
  lastVisited: string;
}

interface Gym {
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
  stats: GymStats;
}

interface Facility {
  id: string;
  label: string;
  icon: string;
}

interface GymProfileContentProps {
  gymId: string;
}

export default function GymProfileContent({ gymId }: GymProfileContentProps) {
  const [gym, setGym] = useState<Gym | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isHomeGym, setIsHomeGym] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const bannerImage = gym ? getGymBanner(gym.name) : "/default-gym-banner.jpg";

  useEffect(() => {
    const fetchGym = async () => {
      try {
        const response = await fetch("/api/gyms");
        if (!response.ok) {
          throw new Error("Failed to fetch gyms");
        }

        const gyms = await response.json();
        const decodedGymName = decodeURIComponent(gymId);

        // Find the gym by exact name match
        const selectedGym = gyms.find((g: Gym) => g.name === decodedGymName);

        if (selectedGym) {
          console.log("Found gym:", selectedGym.name);
          setGym(selectedGym);

          // Check if this is the home gym
          const homeGymId = localStorage.getItem("homeGymId");
          setIsHomeGym(homeGymId === selectedGym.id.toString());
        } else {
          console.error("No gym found with name:", decodedGymName);
          console.log(
            "Available gyms:",
            gyms.map((g: Gym) => g.name)
          );
          setError("Gym not found");
        }
      } catch (err) {
        console.error("Error fetching gym:", err);
        setError("Failed to load gym data");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchFacilities = async () => {
      setFacilities([
        { id: "moonboard", label: "Moonboard", icon: "🌙" },
        { id: "cafe", label: "Cafe", icon: "☕" },
        { id: "weights", label: "Weights", icon: "🏋️" },
        { id: "sauna", label: "Sauna", icon: "🧖" },
        { id: "yoga", label: "Yoga Studio", icon: "🧘" },
        { id: "showers", label: "Showers", icon: "🚿" },
        { id: "lockers", label: "Lockers", icon: "🔒" },
        { id: "training", label: "Training Area", icon: "💪" },
      ]);
    };

    fetchGym();
    fetchFacilities();
  }, [gymId]);

  const handleSetHomeGym = () => {
    if (!gym) return;
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !gym) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center">
          {error || "Gym not found"}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Banner Image */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src={bannerImage}
          alt={gym.name}
          fill
          className="object-cover object-center brightness-90"
          priority
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 100vw,
                 100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-white">
                {gym.name}
              </h1>

              {/* Location and Hours */}
              <div className="flex items-center gap-4 md:gap-6 text-white/90 mb-4 md:mb-6 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <span>{gym.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <span>
                    {gym.hours.open} - {gym.hours.close}
                  </span>
                </div>
              </div>

              {/* Stats */}
              {gym.stats && (
                <div className="flex items-center gap-4 md:gap-8 text-white/90">
                  <div>
                    <span className="text-2xl md:text-3xl font-bold">
                      {gym.stats.visitCount}
                    </span>
                    <span className="ml-2 text-base md:text-lg">visits</span>
                  </div>
                  <div>
                    <span className="text-2xl md:text-3xl font-bold">
                      {gym.stats.climbCount}
                    </span>
                    <span className="ml-2 text-base md:text-lg">climbs</span>
                  </div>
                  <div className="text-xs md:text-sm opacity-75">
                    Last visited:{" "}
                    {new Date(gym.stats.lastVisited).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {!isHomeGym && (
              <button
                onClick={handleSetHomeGym}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg backdrop-blur-sm transition-colors text-sm md:text-base"
              >
                Set as Home Gym
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Facilities Card */}
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Facilities</h2>
            <div className="flex flex-wrap gap-2">
              {gym.facilities.map((facilityId) => {
                const facility = facilities.find((f) => f.id === facilityId);
                return (
                  facility && (
                    <span
                      key={facility.id}
                      className="inline-flex items-center bg-gray-50 rounded-md px-2 py-1 text-sm"
                    >
                      <span className="mr-1">{facility.icon}</span>
                      <span className="text-gray-600">{facility.label}</span>
                    </span>
                  )
                );
              })}
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
            {gym.stats ? (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Total Visits</div>
                  <div className="text-2xl font-bold">
                    {gym.stats.visitCount}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Climbs</div>
                  <div className="text-2xl font-bold">
                    {gym.stats.climbCount}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">
                    Average Climbs per Visit
                  </div>
                  <div className="text-2xl font-bold">
                    {Math.round(gym.stats.climbCount / gym.stats.visitCount)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">No stats available</div>
            )}
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            {gym.stats ? (
              <div>
                <div className="text-sm text-gray-500 mb-2">Last Visit</div>
                <div className="text-lg">
                  {new Date(gym.stats.lastVisited).toLocaleDateString()}
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-500 mb-2">
                    Climbs This Visit
                  </div>
                  <div className="text-lg">
                    {Math.round(gym.stats.climbCount / gym.stats.visitCount)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">No recent activity</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
