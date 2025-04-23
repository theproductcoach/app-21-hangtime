export interface UserProfile {
  displayName: string;
  avatar: string;
  homeGymId: string | null;
  joinDate: string;
}

const DEFAULT_PROFILE: UserProfile = {
  displayName: "Jane Smith",
  avatar: "🧗",
  homeGymId: null,
  joinDate: new Date().toISOString()
};

export const getUserProfile = (): UserProfile => {
  const stored = localStorage.getItem("userProfile");
  if (!stored) {
    // If no profile exists, check if we have an install date
    const installDate = localStorage.getItem("installDate");
    if (!installDate) {
      localStorage.setItem("installDate", new Date().toISOString());
    }
    return {
      ...DEFAULT_PROFILE,
      joinDate: installDate || new Date().toISOString()
    };
  }
  return JSON.parse(stored);
};

export const updateUserProfile = (updates: Partial<UserProfile>): UserProfile => {
  const current = getUserProfile();
  const updated = { ...current, ...updates };
  localStorage.setItem("userProfile", JSON.stringify(updated));
  return updated;
};

export const getHomeGymData = () => {
  const stored = localStorage.getItem("homeGymData");
  if (!stored) return null;
  return JSON.parse(stored);
}; 