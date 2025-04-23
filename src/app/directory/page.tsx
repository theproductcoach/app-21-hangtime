"use client";

import { useState, useEffect } from "react";
import SearchInput from "@/components/SearchInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import FilterChip from "@/components/FilterChip";

interface Facility {
  id: string;
  label: string;
  icon: string;
}

const facilities: Facility[] = [
  { id: 'moonboard', label: 'Moonboard', icon: '🌙' },
  { id: 'cafe', label: 'Cafe', icon: '☕' },
  { id: 'weights', label: 'Weights', icon: '🏋️' },
  { id: 'sauna', label: 'Sauna', icon: '🧖' },
  { id: 'yoga', label: 'Yoga Studio', icon: '🧘' },
  { id: 'showers', label: 'Showers', icon: '🚿' },
  { id: 'lockers', label: 'Lockers', icon: '🔒' },
  { id: 'training', label: 'Training Area', icon: '💪' },
];

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

export default function Directory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState<Set<string>>(new Set());
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

  const toggleFacility = (facilityId: string) => {
    setSelectedFacilities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(facilityId)) {
        newSet.delete(facilityId);
      } else {
        newSet.add(facilityId);
      }
      return newSet;
    });
  };

  const filteredGyms = gyms.filter((gym) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      gym.name.toLowerCase().includes(searchLower) ||
      gym.location.toLowerCase().includes(searchLower);

    const matchesFacilities = selectedFacilities.size === 0 || 
      Array.from(selectedFacilities).every(facility => 
        gym.facilities.includes(facility)
      );

    return matchesSearch && matchesFacilities;
  });

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search gyms by name or location..."
      />

      <div className="flex flex-wrap gap-2">
        {facilities.map((facility) => (
          <FilterChip
            key={facility.id}
            label={facility.label}
            icon={facility.icon}
            isSelected={selectedFacilities.has(facility.id)}
            onClick={() => toggleFacility(facility.id)}
          />
        ))}
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center">
          {error}
        </div>
      ) : filteredGyms.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-text-muted">
            No gyms found. Try adjusting your filters?
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredGyms.map((gym) => (
            <div
              key={gym.id}
              className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="flex-grow">
                <h3 className="font-semibold text-primary">{gym.name}</h3>
                <p className="text-sm text-text-muted mt-1">
                  <span className="text-accent">📍</span> {gym.location}
                </p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-accent flex items-center">
                    ⭐{" "}
                    <span className="ml-1 text-text-muted">{gym.rating}</span>
                  </span>
                  <span className="mx-2 text-text-muted">•</span>
                  <span className="text-text-muted">{gym.distance} miles</span>
                  <span className="mx-2 text-text-muted">•</span>
                  <span className="text-primary">
                    Open {gym.hours.open} - {gym.hours.close}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {gym.facilities.map(facilityId => {
                    const facility = facilities.find(f => f.id === facilityId);
                    return facility && (
                      <span key={facilityId} className="text-sm" title={facility.label}>
                        {facility.icon}
                      </span>
                    );
                  })}
                </div>
              </div>
              <button className="px-4 py-2 bg-accent text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors">
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
