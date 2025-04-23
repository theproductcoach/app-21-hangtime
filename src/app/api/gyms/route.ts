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
    facilities: ['moonboard', 'cafe', 'weights', 'showers', 'lockers']
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
    facilities: ['training', 'yoga', 'weights', 'showers', 'lockers', 'sauna']
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
    facilities: ['moonboard', 'cafe', 'yoga', 'training', 'showers', 'lockers']
  }
];

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate occasional errors (10% chance)
  if (Math.random() < 0.1) {
    return NextResponse.error();
  }

  return NextResponse.json(mockGyms);
} 