"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoadingSpinner from "../components/LoadingSpinner";
import { getGymLogo } from "@/utils/gymImages";

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
}

export default function Home() {
  const router = useRouter();
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGyms() {
      try {
        const response = await fetch("/api/gyms");
        if (!response.ok) {
          throw new Error("Failed to fetch gyms");
        }
        const data = await response.json();
        setGyms(data);
        setError(null);
      } catch (err) {
        setError("Failed to load gyms");
      } finally {
        setIsLoading(false);
      }
    }

    fetchGyms();
  }, []);

  const handleGymClick = (gym: Gym) => {
    router.push(`/gym/${encodeURIComponent(gym.name)}`);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <h1 className="text-xl font-bold text-text-dark">Featured Gyms</h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center">
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          {gyms.map((gym) => {
            const logoPath = getGymLogo(gym.name);
            return (
              <div
                key={gym.id}
                onClick={() => handleGymClick(gym)}
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
              >
                <div className="flex p-4 gap-4 items-center">
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-white rounded-lg">
                    {logoPath ? (
                      <Image
                        src={logoPath}
                        alt={`${gym.name} Logo`}
                        width={64}
                        height={64}
                        className="object-contain p-1"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                        🧗
                      </div>
                    )}
                  </div>
                  <div className="flex-grow min-w-0 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg text-primary">
                        {gym.name}
                      </h3>
                      <button
                        className="text-accent hover:text-accent/90 text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGymClick(gym);
                        }}
                      >
                        View Profile →
                      </button>
                    </div>
                    <p className="flex items-center text-text-muted text-sm">
                      <span className="text-accent mr-1">📍</span>
                      {gym.location} • {gym.distance} miles away
                    </p>
                    <div className="flex items-center text-sm">
                      <span className="flex items-center text-accent">
                        ⭐{" "}
                        <span className="ml-1 text-text-muted">
                          {gym.rating}
                        </span>
                      </span>
                      <span className="mx-2 text-text-muted">•</span>
                      <span className="text-primary">
                        Open {gym.hours.open} - {gym.hours.close}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-text-dark">Recent Updates</h2>
        <div className="space-y-4">
          {[
            {
              id: 1,
              image: "/gym-update-1.png",
              title: "New Equipment Update",
              time: "2 hours ago",
              description:
                "New routes just set in the bouldering area! Come check them out!",
            },
            {
              id: 2,
              image: "/gym-update-2.png",
              title: "Climbing Wall Update",
              time: "4 hours ago",
              description: "Added new training equipment in the weight room!",
            },
          ].map((update) => (
            <div key={update.id} className="bg-white p-4 rounded-xl shadow-md">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={update.image}
                      alt={update.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-primary">{update.title}</p>
                    <p className="text-sm text-text-muted">{update.time}</p>
                  </div>
                </div>
                <p className="text-text-dark">
                  {update.description} <span className="text-accent">🧗‍♂️</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
