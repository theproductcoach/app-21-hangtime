"use client";

import { useEffect, useState } from "react";
import { TrophyIcon, PencilIcon } from "@heroicons/react/24/solid";
import { getGymStats, type GymVisit } from "@/utils/gymStats";
import {
  getUserProfile,
  updateUserProfile,
  getHomeGymData,
  type UserProfile,
} from "@/utils/userProfile";
import EditProfileModal from "@/components/EditProfileModal";

type TabType = "overview" | "activity";

interface HomeGymData {
  name: string;
  location: string;
}

// Mock data for recent visits
const MOCK_VISITS: GymVisit[] = [
  {
    gymId: "boulder-district",
    gymName: "Boulder District",
    lastVisited: new Date("2024-03-15").toISOString(),
    visitCount: 42,
    climbCount: 156,
  },
  {
    gymId: "sbp-poplar",
    gymName: "Seattle Bouldering Project - Poplar",
    lastVisited: new Date("2024-03-12").toISOString(),
    visitCount: 28,
    climbCount: 98,
  },
  {
    gymId: "vertical-world-seattle",
    gymName: "Vertical World - Seattle",
    lastVisited: new Date("2024-03-08").toISOString(),
    visitCount: 15,
    climbCount: 45,
  },
  {
    gymId: "momentum-sodo",
    gymName: "Momentum - SODO",
    lastVisited: new Date("2024-03-05").toISOString(),
    visitCount: 8,
    climbCount: 24,
  },
  {
    gymId: "sbp-fremont",
    gymName: "Seattle Bouldering Project - Fremont",
    lastVisited: new Date("2024-03-01").toISOString(),
    visitCount: 12,
    climbCount: 36,
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [totalVisits, setTotalVisits] = useState(105);
  const [totalClimbs, setTotalClimbs] = useState(359);
  const [recentVisits, setRecentVisits] = useState<GymVisit[]>(MOCK_VISITS);
  const [userProfile, setUserProfile] = useState<UserProfile>(getUserProfile());
  const [homeGymData, setHomeGymData] = useState<HomeGymData | null>(
    getHomeGymData()
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const stats = getGymStats();
    const visits = Object.values(stats.visits);

    if (visits.length > 0) {
      setTotalVisits(visits.reduce((sum, gym) => sum + gym.visitCount, 0));
      setTotalClimbs(stats.totalClimbs);

      const sortedVisits = visits
        .sort(
          (a: GymVisit, b: GymVisit) =>
            new Date(b.lastVisited).getTime() -
            new Date(a.lastVisited).getTime()
        )
        .slice(0, 5);

      setRecentVisits(sortedVisits);
    }
  }, []);

  const handleProfileUpdate = (updates: Partial<UserProfile>) => {
    const updated = updateUserProfile(updates);
    setUserProfile(updated);
  };

  // Calculate progress tier based on total climbs
  const getTierInfo = () => {
    if (totalClimbs >= 1000) return { name: "Elite", color: "text-purple-500" };
    if (totalClimbs >= 500) return { name: "Advanced", color: "text-blue-500" };
    if (totalClimbs >= 100)
      return { name: "Intermediate", color: "text-green-500" };
    return { name: "Beginner", color: "text-gray-500" };
  };

  const tier = getTierInfo();

  const TabButton = ({ tab, label }: { tab: TabType; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 font-medium text-sm rounded-lg transition-colors ${
        activeTab === tab
          ? "bg-accent text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );

  const OverviewTab = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Visits</p>
              <p className="text-3xl font-bold">{totalVisits}</p>
            </div>
            <TrophyIcon className="h-8 w-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Climbs</p>
              <p className="text-3xl font-bold">{totalClimbs}</p>
            </div>
            <TrophyIcon className="h-8 w-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Unique Gyms</p>
              <p className="text-3xl font-bold">{recentVisits.length}</p>
            </div>
            <TrophyIcon className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Recent Visits</h2>
        {recentVisits.length > 0 ? (
          <div className="bg-white rounded-lg shadow divide-y">
            {recentVisits.map((visit) => (
              <div key={visit.gymId} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{visit.gymName}</h3>
                    <p className="text-sm text-gray-600">
                      Last visited:{" "}
                      {new Date(visit.lastVisited).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{visit.visitCount} visits</p>
                    <p className="text-sm text-gray-600">
                      {visit.climbCount} climbs
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No gym visits recorded yet.</p>
        )}
      </section>
    </>
  );

  const ActivityTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentVisits.map((visit) => (
            <div
              key={visit.gymId}
              className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0"
            >
              <div>
                <div className="font-medium text-primary">{visit.gymName}</div>
                <div className="text-sm text-text-muted">
                  Last visited:{" "}
                  {new Date(visit.lastVisited).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-text-muted">
                  <span className="font-medium text-primary">
                    {visit.visitCount}
                  </span>{" "}
                  visits
                </div>
                <div className="text-sm text-text-muted">
                  <span className="font-medium text-primary">
                    {visit.climbCount}
                  </span>{" "}
                  climbs
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-text-muted mb-1">Total Visits</div>
            <div className="text-2xl font-bold text-primary">{totalVisits}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-text-muted mb-1">Total Climbs</div>
            <div className="text-2xl font-bold text-primary">{totalClimbs}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-text-muted mb-1">
              Average Climbs per Visit
            </div>
            <div className="text-2xl font-bold text-primary">
              {totalVisits ? Math.round(totalClimbs / totalVisits) : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      {/* Profile Summary Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-8">
        {/* Gradient Bar */}
        <div
          className={`h-2 bg-gradient-to-r ${
            tier.name === "Elite"
              ? "from-purple-500 to-purple-300"
              : tier.name === "Advanced"
              ? "from-blue-500 to-blue-300"
              : tier.name === "Intermediate"
              ? "from-green-500 to-green-300"
              : "from-gray-500 to-gray-300"
          }`}
        />

        <div className="p-6">
          {/* Edit Button */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="float-right bg-gray-50 text-gray-600 rounded-md px-2.5 py-1.5 text-sm hover:bg-accent/10 transition-colors"
          >
            <PencilIcon className="h-4 w-4" />
          </button>

          {/* Main Content */}
          <div className="flex gap-6">
            {/* Left Column - Avatar */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gray-50 border-2 border-accent/20 flex items-center justify-center text-3xl">
                {userProfile.avatar}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="flex-grow min-w-0">
              {/* Name and Level */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {userProfile.displayName}
                  </h2>
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                      tier.name === "Elite"
                        ? "bg-purple-50 text-purple-700"
                        : tier.name === "Advanced"
                        ? "bg-blue-50 text-blue-700"
                        : tier.name === "Intermediate"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    <TrophyIcon className="h-4 w-4 mr-1 opacity-75" />
                    {tier.name} Climber
                  </div>
                </div>
              </div>

              {/* Join Date */}
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="flex items-center">
                  📅 Joined{" "}
                  {new Date(userProfile.joinDate).toLocaleDateString()}
                </span>
              </div>

              {/* Home Gym */}
              {homeGymData && (
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-1">🏠</span>
                  <span className="font-medium text-gray-900">
                    {homeGymData.name}
                  </span>
                  <span className="mx-1.5">•</span>
                  <span className="flex items-center">
                    <span className="mr-1">📍</span>
                    {homeGymData.location}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Climbing Stats</h2>
        <div className="flex gap-2 bg-gray-50 p-1 rounded-lg">
          <TabButton tab="overview" label="Overview" />
          <TabButton tab="activity" label="Activity" />
        </div>
      </div>

      {activeTab === "overview" ? <OverviewTab /> : <ActivityTab />}

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={userProfile}
        onSave={handleProfileUpdate}
        gyms={recentVisits.map((v) => ({
          id: v.gymId,
          name: v.gymName,
          location: "Unknown", // You might want to add location to your gym visits data
        }))}
      />
    </main>
  );
}
