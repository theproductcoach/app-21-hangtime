"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

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
          {gyms.map((gym) => (
            <div
              key={gym.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-lg text-primary">
                  {gym.name}
                </h3>
                <p className="flex items-center text-text-muted text-sm">
                  <span className="text-accent mr-1">📍</span>
                  {gym.location} • {gym.distance} miles away
                </p>
                <div className="flex items-center text-sm">
                  <span className="flex items-center text-accent">
                    ⭐{" "}
                    <span className="ml-1 text-text-muted">{gym.rating}</span>
                  </span>
                  <span className="mx-2 text-text-muted">•</span>
                  <span className="text-primary">
                    Open {gym.hours.open} - {gym.hours.close}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-text-dark">Recent Updates</h2>
        <div className="space-y-4">
          {[1, 2].map((update) => (
            <div key={update} className="bg-white p-4 rounded-xl shadow-md">
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="ml-3">
                    <p className="font-medium text-primary">
                      Gym Update {update}
                    </p>
                    <p className="text-sm text-text-muted">2 hours ago</p>
                  </div>
                </div>
                <p className="text-text-dark">
                  New routes just set in the bouldering area! Come check them
                  out! <span className="text-accent">🧗‍♂️</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
