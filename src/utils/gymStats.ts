export interface GymVisit {
  gymId: string;
  gymName: string;
  lastVisited: string;
  visitCount: number;
  climbCount: number;
}

interface GymStats {
  visits: { [key: string]: GymVisit };
  totalClimbs: number;
}

// Initialize gym stats in localStorage if not present
const initGymStats = (): GymStats => {
  return {
    visits: {},
    totalClimbs: 0,
  };
};

// Get all gym statistics
export const getGymStats = (): GymStats => {
  const stats = localStorage.getItem("gymStats");
  return stats ? JSON.parse(stats) : initGymStats();
};

// Mark a gym as visited
export const markGymVisit = (gymId: string, gymName: string): GymVisit => {
  const stats = getGymStats();
  const now = new Date().toISOString();

  if (stats.visits[gymId]) {
    stats.visits[gymId].visitCount += 1;
    stats.visits[gymId].lastVisited = now;
  } else {
    stats.visits[gymId] = {
      gymId,
      gymName,
      lastVisited: now,
      visitCount: 1,
      climbCount: 0,
    };
  }

  localStorage.setItem("gymStats", JSON.stringify(stats));
  return stats.visits[gymId];
};

// Log a climb for a gym
export const logClimb = (gymId: string): GymVisit => {
  const stats = getGymStats();
  
  if (stats.visits[gymId]) {
    stats.visits[gymId].climbCount += 1;
    stats.totalClimbs += 1;
    localStorage.setItem("gymStats", JSON.stringify(stats));
    return stats.visits[gymId];
  }
  throw new Error("Cannot log climb for unvisited gym");
};

// Check if a gym has been visited
export const isGymVisited = (gymId: string): boolean => {
  const stats = getGymStats();
  return !!stats.visits[gymId];
};

// Get visit count for a gym
export const getGymVisitCount = (gymId: string): number => {
  const stats = getGymStats();
  return stats.visits[gymId]?.visitCount || 0;
};

// Get climb count for a gym
export const getGymClimbCount = (gymId: string): number => {
  const stats = getGymStats();
  return stats.visits[gymId]?.climbCount || 0;
}; 