"use client";

import { useState, useEffect } from "react";
import SearchInput from "@/components/SearchInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import FilterChip from "@/components/FilterChip";
import GymCard from "@/components/GymCard";

interface Facility {
  id: string;
  label: string;
  icon: string;
}

const facilities: Facility[] = [
  { id: "moonboard", label: "Moonboard", icon: "🌙" },
  { id: "cafe", label: "Cafe", icon: "☕" },
  { id: "weights", label: "Weights", icon: "🏋️" },
  { id: "sauna", label: "Sauna", icon: "🧖" },
  { id: "yoga", label: "Yoga Studio", icon: "🧘" },
  { id: "showers", label: "Showers", icon: "🚿" },
  { id: "lockers", label: "Lockers", icon: "🔒" },
  { id: "training", label: "Training Area", icon: "💪" },
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
  const [selectedFacilities, setSelectedFacilities] = useState<Set<string>>(
    new Set()
  );
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
        setError(
          `Failed to load gyms: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchGyms();
  }, []);

  const toggleFacility = (facilityId: string) => {
    setSelectedFacilities((prev) => {
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

    const matchesFacilities =
      selectedFacilities.size === 0 ||
      Array.from(selectedFacilities).every((facility) =>
        gym.facilities.includes(facility)
      );

    return matchesSearch && matchesFacilities;
  });

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Search */}
          <div className="max-w-3xl mx-auto">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search gyms by name or location..."
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 max-w-3xl mx-auto">
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

          {/* Results */}
          <div className="mt-8">
            {isLoading ? (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="max-w-3xl mx-auto">
                <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center">
                  {error}
                </div>
              </div>
            ) : filteredGyms.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-text-muted">
                  No gyms found. Try adjusting your filters?
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGyms.map((gym) => (
                  <GymCard key={gym.id} gym={gym} facilities={facilities} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
