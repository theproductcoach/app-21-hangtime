"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { StarIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

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
}

interface Facility {
  id: string;
  label: string;
  icon: string;
}

export default function GymProfile() {
  const params = useParams();
  const [gym, setGym] = useState<Gym | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isHomeGym, setIsHomeGym] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGym = async () => {
      try {
        const response = await fetch("/api/gyms");
        const gyms = await response.json();
        const selectedGym = gyms.find(
          (g: Gym) => g.id.toString() === params.id
        );

        if (selectedGym) {
          setGym(selectedGym);
          // Check if this is the home gym
          const homeGymId = localStorage.getItem("homeGymId");
          setIsHomeGym(homeGymId === selectedGym.id.toString());
        } else {
          setError("Gym not found");
        }
      } catch (err) {
        setError("Failed to load gym data");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchFacilities = async () => {
      // In a real app, this would be an API call
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
  }, [params.id]);

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
    <div className="min-h-screen bg-background-soft">
      {/* Hero Section */}
      <div className="relative h-64 bg-gray-100">
        {gym.imageUrl ? (
          <img
            src={gym.imageUrl}
            alt={gym.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-primary/10">
            🧗
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{gym.name}</h1>
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5" />
            <span>{gym.location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-6 -mt-8 relative z-10">
          {/* Stats Row */}
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-1">
              <StarIconSolid className="h-6 w-6 text-accent" />
              <span className="text-lg font-medium">{gym.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-text-muted">
              <MapPinIcon className="h-5 w-5" />
              <span>{gym.distance} miles</span>
            </div>
            <div className="flex items-center gap-1 text-text-muted">
              <ClockIcon className="h-5 w-5" />
              <span>
                {gym.hours.open} - {gym.hours.close}
              </span>
            </div>
          </div>

          {/* Facilities */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Facilities</h2>
            <div className="flex flex-wrap gap-2">
              {gym.facilities.map((facilityId) => {
                const facility = facilities.find((f) => f.id === facilityId);
                return (
                  facility && (
                    <span
                      key={facilityId}
                      className="inline-flex items-center bg-background-soft rounded-full px-3 py-1.5"
                    >
                      <span className="mr-1.5">{facility.icon}</span>
                      <span className="text-text-dark">{facility.label}</span>
                    </span>
                  )
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {!isHomeGym && (
              <button
                onClick={handleSetHomeGym}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                🏠 Set as Home Gym
              </button>
            )}
            <button className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors">
              <StarIcon className="h-5 w-5" />
              Rate Gym
            </button>
            <button className="flex items-center gap-2 bg-gray-100 text-text-dark px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              ✓ Mark as Visited
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
