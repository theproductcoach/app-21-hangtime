"use client";

import { useEffect, useState } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

interface HomeGymData {
  name: string;
  location: string;
}

export default function Profile() {
  const [homeGym, setHomeGym] = useState<HomeGymData | null>(null);

  useEffect(() => {
    const homeGymData = localStorage.getItem("homeGymData");
    if (homeGymData) {
      setHomeGym(JSON.parse(homeGymData));
    }
  }, []);

  const handleClearHomeGym = () => {
    localStorage.removeItem("homeGymId");
    localStorage.removeItem("homeGymData");
    setHomeGym(null);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-dark">Profile</h1>
        <button className="p-2 hover:bg-white rounded-full text-text-muted hover:text-text-dark transition-colors">
          <Cog6ToothIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-text-dark">John Doe</h2>
            <p className="text-text-muted">Member since 2023</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-highlight p-4 rounded-lg">
            <p className="text-2xl font-bold text-primary">V5</p>
            <p className="text-sm text-text-muted">Top Boulder</p>
          </div>
          <div className="bg-highlight p-4 rounded-lg">
            <p className="text-2xl font-bold text-primary">5.11c</p>
            <p className="text-sm text-text-muted">Top Route</p>
          </div>
          <div className="bg-highlight p-4 rounded-lg">
            <p className="text-2xl font-bold text-primary">127</p>
            <p className="text-sm text-text-muted">Sessions</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-text-dark mb-4">Home Gym</h2>

        {homeGym ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏠</span>
              <div>
                <h3 className="font-medium text-primary">{homeGym.name}</h3>
                <p className="text-sm text-text-muted">{homeGym.location}</p>
              </div>
            </div>

            <button
              onClick={handleClearHomeGym}
              className="text-accent hover:text-accent/90 text-sm font-medium transition-colors"
            >
              Change Home Gym
            </button>
          </div>
        ) : (
          <p className="text-text-muted">
            No home gym set. Visit the directory to set your home gym!
          </p>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-text-dark">Recent Activity</h3>
        {[1, 2, 3].map((activity) => (
          <div key={activity} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-dark">
                  Completed a V4 boulder
                </p>
                <p className="text-sm text-text-muted">2 days ago</p>
              </div>
              <span className="text-accent">+50 pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
