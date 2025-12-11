import { Space, Review } from './types';

export const CHENNAI_COORDS = { lat: 13.0827, lng: 80.2707 };

export const POPULAR_LOCATIONS = [
  "T. Nagar, Chennai",
  "OMR, Chennai",
  "Indiranagar, Bangalore",
  "Koramangala, Bangalore",
  "BKC, Mumbai",
  "Andheri West, Mumbai",
  "Connaught Place, Delhi",
  "Cyber City, Gurgaon",
  "Hitech City, Hyderabad",
  "Banjara Hills, Hyderabad",
  "Salt Lake, Kolkata",
  "Pune Camp, Pune",
  "Velachery, Chennai",
  "Guindy, Chennai"
];

export const FEATURED_SPACES: Space[] = [
  {
    id: '1',
    title: 'Skyline Hub T-Nagar',
    location: 'T. Nagar, Chennai',
    coordinates: { lat: 13.0418, lng: 80.2341 },
    price: 4500,
    type: 'Hot Desk',
    image: 'https://picsum.photos/id/48/800/600',
    rating: 4.8,
    amenities: ['High-speed WiFi', 'Coffee', 'Printing'],
  },
  {
    id: '2',
    title: 'The Hive OMR',
    location: 'OMR, Chennai',
    coordinates: { lat: 12.9716, lng: 80.2486 },
    price: 8000,
    type: 'Private Office',
    image: 'https://picsum.photos/id/60/800/600',
    rating: 4.9,
    amenities: ['24/7 Access', 'Meeting Rooms', 'Parking'],
  },
  {
    id: '3',
    title: 'Creative Loft Indiranagar',
    location: 'Indiranagar, Bangalore',
    coordinates: { lat: 12.9716, lng: 77.5946 }, // Bangalore coords approx
    price: 6000,
    type: 'Hot Desk',
    image: 'https://picsum.photos/id/2/800/600',
    rating: 4.7,
    amenities: ['Community Events', 'Pantry', 'Lounge'],
  },
  {
    id: '4',
    title: 'Corporate Suites BKC',
    location: 'BKC, Mumbai',
    coordinates: { lat: 19.0760, lng: 72.8777 }, // Mumbai coords approx
    price: 12000,
    type: 'Private Office',
    image: 'https://picsum.photos/id/180/800/600',
    rating: 5.0,
    amenities: ['Premium Address', 'Concierge', 'Gym'],
  },
  {
    id: '5',
    title: 'Startup Garage Guindy',
    location: 'Guindy, Chennai',
    coordinates: { lat: 13.0067, lng: 80.2206 },
    price: 3500,
    type: 'Hot Desk',
    image: 'https://picsum.photos/id/3/800/600',
    rating: 4.6,
    amenities: ['Mentorship', 'Gaming Zone', 'Cafeteria'],
  },
  {
    id: '6',
    title: 'CoWork Velachery',
    location: 'Velachery, Chennai',
    coordinates: { lat: 12.9801, lng: 80.2228 },
    price: 5500,
    type: 'Meeting Room',
    image: 'https://picsum.photos/id/20/800/600',
    rating: 4.5,
    amenities: ['Projector', 'Whiteboard', 'Conference Call'],
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Priya Sharma',
    role: 'Product Designer',
    image: 'https://picsum.photos/id/64/150/150',
    text: "NearbySpace made finding a quiet place to work in T. Nagar so easy. The amenities were exactly as listed!",
    rating: 5,
    status: 'approved',
    date: '2023-10-15T10:00:00Z'
  },
  {
    id: 'r2',
    name: 'Anjali Menon',
    role: 'Freelance Writer',
    image: 'https://picsum.photos/id/65/150/150',
    text: "I love the zero subscription fee model. I found a great spot in OMR for my client meetings.",
    rating: 5,
    status: 'approved',
    date: '2023-11-02T14:30:00Z'
  },
  {
    id: 'r3',
    name: 'Deepika Reddy',
    role: 'Tech Lead',
    image: 'https://picsum.photos/id/338/150/150',
    text: "Highly recommended for startups. We found our first office space in Guindy through this app.",
    rating: 4,
    status: 'approved',
    date: '2023-12-10T09:15:00Z'
  },
  {
    id: 'r4',
    name: 'Sneha Gupta',
    role: 'Marketing Manager',
    image: 'https://picsum.photos/id/342/150/150',
    text: "The interface is beautiful and so easy to use. Found a space within 5 minutes of signing up.",
    rating: 5,
    status: 'approved',
    date: '2024-01-05T16:20:00Z'
  },
];