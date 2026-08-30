export interface Track {
  id: string;
  name: string;
  location: string;
  basePrice: number;
  image: string;
  lat: number;
  lng: number;
}

export interface Hotel {
  id: string;
  name: string;
  pricePerNight: number;
  rating: number;
  image: string;
  trackId: string;
}

export interface TrackDayPackage {
  track: Track;
  selectedHotel: Hotel | null;
  hotels: Hotel[];
  nights: number;
  totalCost: number;
  trackDayDate?: Date;
}

export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  budget: number;
  hasVoted: boolean;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string; // Member ID
  splitWith: string[]; // Member IDs
  date: Date;
  receipt?: string;
  status: 'pending' | 'settled';
}

export interface Vote {
  id: string;
  type: 'track' | 'hotel' | 'kick';
  itemId: string; // Track ID, Hotel ID, or Member ID
  votedBy: string[]; // Member IDs
}

export interface GroupTrip {
  id: string;
  name: string;
  date?: string;
  status: 'active' | 'completed';
  members: GroupMember[];
  expenses: Expense[];
  votes: Vote[];
  messages: ChatMessage[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  totalTrips: number;
  totalMiles?: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  type: 'text' | 'system';
}
