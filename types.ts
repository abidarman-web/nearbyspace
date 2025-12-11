export interface Space {
  id: string;
  title: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  price: number;
  type: 'Private Office' | 'Hot Desk' | 'Meeting Room' | string;
  image: string;
  rating: number;
  amenities: string[];
  distance?: number; // Calculated at runtime
  capacity?: number;
  contact_email?: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export interface GeoLocationState {
  coords: {
    latitude: number;
    longitude: number;
  } | null;
  error: string | null;
  loading: boolean;
}