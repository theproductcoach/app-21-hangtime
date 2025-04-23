import { NextResponse } from 'next/server';

const mockGyms = [
  {
    id: 1,
    name: "Boulder District",
    location: "Downtown Seattle",
    distance: 1.2,
    rating: 4.8,
    hours: {
      open: "6:00 AM",
      close: "11:00 PM"
    },
    imageUrl: "/images/gym1.jpg",
    facilities: ['moonboard', 'cafe', 'weights', 'showers', 'lockers'],
    stats: {
      visitCount: 42,
      climbCount: 378,
      lastVisited: "2024-03-15"
    }
  },
  {
    id: 2,
    name: "Vertical World",
    location: "Ballard",
    distance: 2.5,
    rating: 4.9,
    hours: {
      open: "7:00 AM",
      close: "10:00 PM"
    },
    imageUrl: "/images/gym2.jpg",
    facilities: ['training', 'yoga', 'weights', 'showers', 'lockers', 'sauna'],
    stats: {
      visitCount: 28,
      climbCount: 196,
      lastVisited: "2024-03-10"
    }
  },
  {
    id: 3,
    name: "Seattle Bouldering Project",
    location: "Fremont",
    distance: 3.1,
    rating: 4.7,
    hours: {
      open: "6:30 AM",
      close: "11:00 PM"
    },
    imageUrl: "/images/gym3.jpg",
    facilities: ['moonboard', 'cafe', 'yoga', 'training', 'showers', 'lockers'],
    stats: {
      visitCount: 35,
      climbCount: 245,
      lastVisited: "2024-03-12"
    }
  }
];

export async function GET() {
  console.log('API: Sending gyms:', mockGyms);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate occasional errors (10% chance)
  if (Math.random() < 0.1) {
    return NextResponse.error();
  }

  return NextResponse.json(mockGyms);
} 