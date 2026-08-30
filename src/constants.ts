import { Track, Hotel, GroupTrip } from './types';

export const STATE_MAP: Record<string, string> = {
  'california': 'ca', 'ohio': 'oh', 'connecticut': 'ct', 'wisconsin': 'wi',
  'georgia': 'ga', 'virginia': 'va', 'texas': 'tx', 'florida': 'fl',
  'alabama': 'al', 'indiana': 'in', 'michigan': 'mi', 'iowa': 'ia',
  'tennessee': 'tn', 'new york': 'ny', 'oregon': 'or', 'ontario': 'on',
  'pennsylvania': 'pa', 'north carolina': 'nc', 'south carolina': 'sc',
  'washington': 'wa', 'new jersey': 'nj', 'maryland': 'md'
};

export const MAJOR_HUBS: Record<string, { lat: number, lng: number }> = {
  'los angeles': { lat: 34.0522, lng: -118.2437 },
  'san francisco': { lat: 37.7749, lng: -122.4194 },
  'san diego': { lat: 32.7157, lng: -117.1611 },
  'seattle': { lat: 47.6062, lng: -122.3321 },
  'austin': { lat: 30.2672, lng: -97.7431 },
  'new york city': { lat: 40.7128, lng: -74.0060 },
  'chicago': { lat: 41.8781, lng: -87.6298 },
  'miami': { lat: 25.7617, lng: -80.1918 },
  'detroit': { lat: 42.3314, lng: -83.0458 },
  'atlanta': { lat: 33.7490, lng: -84.3880 },
  'portland': { lat: 45.5152, lng: -122.6784 }
};

export const TRACKS: Track[] = [
  {
    id: 'laguna-seca-track',
    name: 'Laguna Seca',
    location: 'Monterey, CA',
    basePrice: 250,
    // You can replace this URL with a local file path like: './assets/laguna_seca.jpg'
    // after you upload your image to the src/assets folder.
    image: 'src/assets/laguna_seca.png',
    lat: 36.5841,
    lng: -121.7539
  },
  {
    id: 'sonoma',
    name: 'Sonoma Raceway',
    location: 'Sonoma, CA',
    basePrice: 280,
    image: 'src/assets/sanoma_raceway.png',
    lat: 38.1611,
    lng: -122.4594
  },
  {
    id: 'thunderhill',
    name: 'Thunderhill Raceway',
    location: 'Willows, CA',
    basePrice: 190,
    image: 'src/assets/thunderhill_raceway.png',
    lat: 39.5401,
    lng: -122.3314
  },
  {
    id: 'willow-springs',
    name: 'Willow Springs',
    location: 'Rosamond, CA',
    basePrice: 200,
    image: 'src/assets/willosprings_raceway.png',
    lat: 34.8727,
    lng: -118.2631
  },
  {
    id: 'buttonwillow',
    name: 'Buttonwillow Raceway',
    location: 'Buttonwillow, CA',
    basePrice: 180,
    image: 'src/assets/buttonwillow.png',
    lat: 35.4886,
    lng: -119.5444
  },
  {
    id: 'portland',
    name: 'Portland International Raceway',
    location: 'Portland, OR',
    basePrice: 210,
    image: 'src/assets/portland_international.png',
    lat: 45.5961,
    lng: -122.6934
  },
  {
    id: 'the-ridge',
    name: 'The Ridge Motorsports Park',
    location: 'Shelton, WA',
    basePrice: 225,
    image: 'src/assets/ridge_motorsports.png',
    lat: 47.1189,
    lng: -123.1894
  },
  {
    id: 'cota',
    name: 'Circuit of the Americas',
    location: 'Austin, TX',
    basePrice: 450,
    image: 'src/assets/COTA.png',
    lat: 30.1328,
    lng: -97.6411
  },
  {
    id: 'msr-houston',
    name: 'MSR Houston',
    location: 'Angleton, TX',
    basePrice: 195,
    image: 'src/assets/msr_houston.png',
    lat: 29.2314,
    lng: -95.4214
  },
  {
    id: 'watkins-glen',
    name: 'Watkins Glen',
    location: 'Watkins Glen, NY',
    basePrice: 320,
    image: 'src/assets/watkins_glen.png',
    lat: 42.3364,
    lng: -76.9234
  },
  {
    id: 'njmp',
    name: 'New Jersey Motorsports Park',
    location: 'Millville, NJ',
    basePrice: 245,
    image: 'src/assets/new_jersey_motorsports_park.png',
    lat: 39.3621,
    lng: -75.0594
  },
  {
    id: 'lime-rock',
    name: 'Lime Rock Park',
    location: 'Lakeville, CT',
    basePrice: 260,
    image: 'src/assets/lime_rock_park.png',
    lat: 41.9304,
    lng: -73.3854
  },
  {
    id: 'road-america',
    name: 'Road America',
    location: 'Elkhart Lake, WI',
    basePrice: 240,
    image: 'src/assets/road_america.png',
    lat: 43.7978,
    lng: -87.9868
  },
  {
    id: 'gingerman',
    name: 'Gingerman Raceway',
    location: 'South Haven, MI',
    basePrice: 175,
    image: 'src/assets/gignerman_raceway.png',
    lat: 42.4087,
    lng: -86.1989
  },
  {
    id: 'indianapolis',
    name: 'Indianapolis Motor Speedway',
    location: 'Indianapolis, IN',
    basePrice: 350,
    image: 'src/assets/indianapolis_motor_speedway.png',
    lat: 39.7950,
    lng: -86.2344
  },
  {
    id: 'mid-ohio',
    name: 'Mid-Ohio Sports Car Course',
    location: 'Lexington, OH',
    basePrice: 230,
    image: 'src/assets/mid_ohio.png',
    lat: 40.6908,
    lng: -82.6375
  },
  {
    id: 'summit-point',
    name: 'Summit Point Motorsports Park',
    location: 'Summit Point, WV',
    basePrice: 215,
    image: 'src/assets/summit_point.png',
    lat: 39.3497,
    lng: -77.9739
  },
  {
    id: 'road-atlanta',
    name: 'Road Atlanta',
    location: 'Braselton, GA',
    basePrice: 290,
    image: 'src/assets/road_atlanta.png',
    lat: 34.1481,
    lng: -83.8153
  },
  {
    id: 'barber',
    name: 'Barber Motorsports Park',
    location: 'Birmingham, AL',
    basePrice: 220,
    image: 'src/assets/barber_motorsports.png',
    lat: 33.5319,
    lng: -86.6189
  },
  {
    id: 'vir',
    name: 'Virginia International Raceway',
    location: 'Alton, VA',
    basePrice: 270,
    image: 'src/assets/virginia_international.png',
    lat: 36.5647,
    lng: -79.2045
  },
  {
    id: 'daytona',
    name: 'Daytona International Speedway',
    location: 'Daytona Beach, FL',
    basePrice: 380,
    image: 'src/assets/daytona_international.png',
    lat: 29.1856,
    lng: -81.0705
  },
  {
    id: 'sebring',
    name: 'Sebring International Raceway',
    location: 'Sebring, FL',
    basePrice: 310,
    image: 'src/assets/sebring_international.png',
    lat: 27.4547,
    lng: -81.3484
  },
  {
    id: 'homestead',
    name: 'Homestead-Miami Speedway',
    location: 'Homestead, FL',
    basePrice: 285,
    image: 'src/assets/homestead_miami.png',
    lat: 25.4517,
    lng: -80.4081
  }
];

export const HOTELS: Hotel[] = [
  /*
  {
    id: 'h1',
    name: 'Hyatt Regency Monterey',
    pricePerNight: 220,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
    trackId: 'laguna-seca-track'
  },
  {
    id: 'h2',
    name: 'Starlight Lodge',
    pricePerNight: 120,
    rating: 3.8,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop',
    trackId: 'laguna-seca-track'
  },
  {
    id: 'h3',
    name: 'Motel 6 Buttonwillow',
    pricePerNight: 65,
    rating: 3.2,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop',
    trackId: 'buttonwillow'
  },
  {
    id: 'h4',
    name: 'The Lodge at Buttonwillow',
    pricePerNight: 95,
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1000&auto=format&fit=crop',
    trackId: 'buttonwillow'
  },
  {
    id: 'h5',
    name: 'Willow Inn',
    pricePerNight: 85,
    rating: 3.5,
    image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=1000&auto=format&fit=crop',
    trackId: 'willow-springs'
  }*/
  
];

export const MOCK_GROUP: GroupTrip = {
  id: 'trip-1',
  name: 'Summer Track Tour 2024',
  status: 'active',
  members: [
    { id: 'm1', name: 'You (Alex)', avatar: 'https://i.pravatar.cc/150?u=m1', budget: 1500, hasVoted: true },
    { id: 'm2', name: 'Jordan', avatar: 'https://i.pravatar.cc/150?u=m2', budget: 1200, hasVoted: true },
    { id: 'm3', name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=m3', budget: 2000, hasVoted: false },
    { id: 'm4', name: 'Chen', avatar: 'https://i.pravatar.cc/150?u=m4', budget: 1000, hasVoted: true }
  ],
  expenses: [
    { 
      id: 'e1', 
      description: 'Laguna Seca Deposit', 
      amount: 400, 
      paidBy: 'm1', 
      splitWith: ['m1', 'm2', 'm3', 'm4'], 
      date: new Date('2024-03-15'),
      status: 'pending'
    },
    { 
      id: 'e2', 
      description: 'Trailer Rental', 
      amount: 150, 
      paidBy: 'm2', 
      splitWith: ['m1', 'm2'], 
      date: new Date('2024-03-18'),
      status: 'pending'
    }
  ],
  votes: [
    { id: 'v1', type: 'track', itemId: 'laguna-seca-track', votedBy: ['m1', 'm2', 'm4'] },
    { id: 'v2', type: 'track', itemId: 'sonoma', votedBy: ['m3'] },
    { id: 'v3', type: 'hotel', itemId: 'h1', votedBy: ['m1', 'm2'] }
  ],
  messages: [
    { id: 'msg1', senderId: 'system', text: 'Summer Track Tour 2024 group created', timestamp: new Date('2024-03-01T10:00:00'), type: 'system' },
    { id: 'msg2', senderId: 'm1', text: "Hey guys! Just added Laguna Seca to the voting list. Who's in?", timestamp: new Date('2024-03-01T10:05:00'), type: 'text' },
    { id: 'msg3', senderId: 'm2', text: "Count me in! I've been dying to hit the Corkscrew again. 🏎️", timestamp: new Date('2024-03-01T11:20:00'), type: 'text' },
    { id: 'msg4', senderId: 'm4', text: "Just added the deposit info to the expenses tab. Please check your balances!", timestamp: new Date('2024-03-02T09:15:00'), type: 'text' }
  ]
};

export const MOCK_TRIPS_HISTORY: GroupTrip[] = [
  {
    id: 'trip-old-1',
    name: 'NorCal Speed Week',
    date: 'Jan 2024',
    status: 'completed',
    members: [
      { id: 'm1', name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=m1', budget: 1000, hasVoted: true },
      { id: 'm2', name: 'Jordan', avatar: 'https://i.pravatar.cc/150?u=m2', budget: 800, hasVoted: true }
    ],
    expenses: [
      { id: 'eh1', description: 'Track Fee (Thunderhill)', amount: 200, paidBy: 'm1', splitWith: ['m1', 'm2'], date: new Date('2024-01-10'), status: 'settled' }
    ],
    votes: [],
    messages: []
  },
  {
    id: 'trip-old-2',
    name: 'Desert Run 23',
    date: 'Nov 2023',
    status: 'completed',
    members: [
      { id: 'm1', name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=m1', budget: 1200, hasVoted: true },
      { id: 'm4', name: 'Chen', avatar: 'https://i.pravatar.cc/150?u=m4', budget: 1100, hasVoted: true }
    ],
    expenses: [
      { id: 'eh2', description: 'Gas & Supplies', amount: 350, paidBy: 'm4', splitWith: ['m1', 'm4'], date: new Date('2023-11-20'), status: 'settled' }
    ],
    votes: [],
    messages: []
  }
];
