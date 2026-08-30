import { Track, Hotel, GroupTrip } from './types';

// Bundle and resolve all local track images safely with Vite
const trackAssetModules = import.meta.glob('./assets/*.png', { eager: true, import: 'default' }) as Record<string, string>;

export const getTrackAsset = (filename: string, fallbackKeywords = 'racetrack,circuit'): string => {
  if (trackAssetModules[`./assets/${filename}`]) {
    return trackAssetModules[`./assets/${filename}`];
  }
  // High quality reliable CDN fallback
  return `https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80`;
};

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
    image: getTrackAsset('laguna_seca.png'),
    lat: 36.5841,
    lng: -121.7539
  },
  {
    id: 'sonoma',
    name: 'Sonoma Raceway',
    location: 'Sonoma, CA',
    basePrice: 280,
    image: getTrackAsset('sanoma_raceway.png'),
    lat: 38.1611,
    lng: -122.4594
  },
  {
    id: 'thunderhill',
    name: 'Thunderhill Raceway',
    location: 'Willows, CA',
    basePrice: 190,
    image: getTrackAsset('thunderhill_raceway.png'),
    lat: 39.5401,
    lng: -122.3314
  },
  {
    id: 'willow-springs',
    name: 'Willow Springs',
    location: 'Rosamond, CA',
    basePrice: 200,
    image: getTrackAsset('willosprings_raceway.png'),
    lat: 34.8727,
    lng: -118.2631
  },
  {
    id: 'buttonwillow',
    name: 'Buttonwillow Raceway',
    location: 'Buttonwillow, CA',
    basePrice: 180,
    image: getTrackAsset('buttonwillow.png'),
    lat: 35.4886,
    lng: -119.5444
  },
  {
    id: 'portland',
    name: 'Portland International Raceway',
    location: 'Portland, OR',
    basePrice: 210,
    image: getTrackAsset('portland_international.png'),
    lat: 45.5961,
    lng: -122.6934
  },
  {
    id: 'the-ridge',
    name: 'The Ridge Motorsports Park',
    location: 'Shelton, WA',
    basePrice: 225,
    image: getTrackAsset('ridge_motorsports.png'),
    lat: 47.1189,
    lng: -123.1894
  },
  {
    id: 'cota',
    name: 'Circuit of the Americas',
    location: 'Austin, TX',
    basePrice: 450,
    image: getTrackAsset('COTA.png'),
    lat: 30.1328,
    lng: -97.6411
  },
  {
    id: 'msr-houston',
    name: 'MSR Houston',
    location: 'Angleton, TX',
    basePrice: 195,
    image: getTrackAsset('msr_houston.png'),
    lat: 29.2314,
    lng: -95.4214
  },
  {
    id: 'watkins-glen',
    name: 'Watkins Glen',
    location: 'Watkins Glen, NY',
    basePrice: 320,
    image: getTrackAsset('watkins_glen.png'),
    lat: 42.3364,
    lng: -76.9234
  },
  {
    id: 'njmp',
    name: 'New Jersey Motorsports Park',
    location: 'Millville, NJ',
    basePrice: 245,
    image: getTrackAsset('new_jersey_motorsports_park.png'),
    lat: 39.3621,
    lng: -75.0594
  },
  {
    id: 'lime-rock',
    name: 'Lime Rock Park',
    location: 'Lakeville, CT',
    basePrice: 260,
    image: getTrackAsset('lime_rock_park.png'),
    lat: 41.9304,
    lng: -73.3854
  },
  {
    id: 'road-america',
    name: 'Road America',
    location: 'Elkhart Lake, WI',
    basePrice: 240,
    image: getTrackAsset('road_america.png'),
    lat: 43.7978,
    lng: -87.9868
  },
  {
    id: 'gingerman',
    name: 'Gingerman Raceway',
    location: 'South Haven, MI',
    basePrice: 175,
    image: getTrackAsset('gignerman_raceway.png'),
    lat: 42.4087,
    lng: -86.1989
  },
  {
    id: 'indianapolis',
    name: 'Indianapolis Motor Speedway',
    location: 'Indianapolis, IN',
    basePrice: 350,
    image: getTrackAsset('indianapolis_motor_speedway.png'),
    lat: 39.7950,
    lng: -86.2344
  },
  {
    id: 'mid-ohio',
    name: 'Mid-Ohio Sports Car Course',
    location: 'Lexington, OH',
    basePrice: 230,
    image: getTrackAsset('mid_ohio.png'),
    lat: 40.6908,
    lng: -82.6375
  },
  {
    id: 'summit-point',
    name: 'Summit Point Motorsports Park',
    location: 'Summit Point, WV',
    basePrice: 215,
    image: getTrackAsset('summit_point.png'),
    lat: 39.3497,
    lng: -77.9739
  },
  {
    id: 'road-atlanta',
    name: 'Road Atlanta',
    location: 'Braselton, GA',
    basePrice: 290,
    image: getTrackAsset('road_atlanta.png'),
    lat: 34.1481,
    lng: -83.8153
  },
  {
    id: 'barber',
    name: 'Barber Motorsports Park',
    location: 'Birmingham, AL',
    basePrice: 220,
    image: getTrackAsset('barber_motorsports.png'),
    lat: 33.5319,
    lng: -86.6189
  },
  {
    id: 'vir',
    name: 'Virginia International Raceway',
    location: 'Alton, VA',
    basePrice: 270,
    image: getTrackAsset('virginia_international.png'),
    lat: 36.5647,
    lng: -79.2045
  },
  {
    id: 'daytona',
    name: 'Daytona International Speedway',
    location: 'Daytona Beach, FL',
    basePrice: 380,
    image: getTrackAsset('daytona_international.png'),
    lat: 29.1856,
    lng: -81.0705
  },
  {
    id: 'sebring',
    name: 'Sebring International Raceway',
    location: 'Sebring, FL',
    basePrice: 310,
    image: getTrackAsset('sebring_international.png'),
    lat: 27.4547,
    lng: -81.3484
  },
  {
    id: 'homestead',
    name: 'Homestead-Miami Speedway',
    location: 'Homestead, FL',
    basePrice: 285,
    image: getTrackAsset('homestead_miami.png'),
    lat: 25.4517,
    lng: -80.4081
  }
];

export const HOTEL_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80'
];

export const generateDefaultHotels = (track: Track): Hotel[] => {
  const cityName = track.location.split(',')[0].trim();
  return [
    {
      id: `${track.id}-lodging-1`,
      name: `${cityName} Paddock Inn & Suites`,
      pricePerNight: Math.round(track.basePrice * 0.48 + 50),
      rating: 4.6,
      image: HOTEL_IMAGES[0],
      trackId: track.id
    },
    {
      id: `${track.id}-lodging-2`,
      name: `Grand Hotel & Resort ${cityName}`,
      pricePerNight: Math.round(track.basePrice * 0.75 + 75),
      rating: 4.8,
      image: HOTEL_IMAGES[1],
      trackId: track.id
    },
    {
      id: `${track.id}-lodging-3`,
      name: `Motorsport Lodge ${cityName}`,
      pricePerNight: Math.round(track.basePrice * 0.38 + 35),
      rating: 4.2,
      image: HOTEL_IMAGES[2],
      trackId: track.id
    },
    {
      id: `${track.id}-lodging-4`,
      name: `Express Suites near ${track.name}`,
      pricePerNight: Math.round(track.basePrice * 0.42 + 40),
      rating: 4.3,
      image: HOTEL_IMAGES[3],
      trackId: track.id
    }
  ];
};

export const HOTELS: Hotel[] = [
  // Laguna Seca
  {
    id: 'h-ls-1',
    name: 'Hyatt Regency Monterey Hotel & Spa',
    pricePerNight: 220,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'laguna-seca-track'
  },
  {
    id: 'h-ls-2',
    name: 'Monterey Plaza Hotel & Spa',
    pricePerNight: 295,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'laguna-seca-track'
  },
  {
    id: 'h-ls-3',
    name: 'Starlight Lodge Monterey',
    pricePerNight: 125,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    trackId: 'laguna-seca-track'
  },
  {
    id: 'h-ls-4',
    name: 'Embassy Suites Monterey Bay',
    pricePerNight: 185,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
    trackId: 'laguna-seca-track'
  },

  // Sonoma Raceway
  {
    id: 'h-sn-1',
    name: 'The Lodge at Sonoma Resort',
    pricePerNight: 260,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    trackId: 'sonoma'
  },
  {
    id: 'h-sn-2',
    name: 'Best Western Sonoma Valley Inn',
    pricePerNight: 165,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
    trackId: 'sonoma'
  },
  {
    id: 'h-sn-3',
    name: 'El Pueblo Inn Sonoma',
    pricePerNight: 145,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=600&q=80',
    trackId: 'sonoma'
  },

  // Thunderhill Raceway
  {
    id: 'h-th-1',
    name: 'Holiday Inn Express Willows',
    pricePerNight: 125,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'thunderhill'
  },
  {
    id: 'h-th-2',
    name: 'Baymont by Wyndham Willows',
    pricePerNight: 85,
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
    trackId: 'thunderhill'
  },
  {
    id: 'h-th-3',
    name: 'Quality Inn & Suites Willows',
    pricePerNight: 95,
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    trackId: 'thunderhill'
  },

  // Willow Springs
  {
    id: 'h-ws-1',
    name: 'Rosamond Inn & Suites',
    pricePerNight: 89,
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    trackId: 'willow-springs'
  },
  {
    id: 'h-ws-2',
    name: 'Oxford Suites Lancaster',
    pricePerNight: 135,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'willow-springs'
  },
  {
    id: 'h-ws-3',
    name: 'SpringHill Suites Lancaster',
    pricePerNight: 145,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'willow-springs'
  },

  // Buttonwillow Raceway
  {
    id: 'h-bw-1',
    name: 'Willow Inn & Suites Buttonwillow',
    pricePerNight: 79,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
    trackId: 'buttonwillow'
  },
  {
    id: 'h-bw-2',
    name: 'Best Western Plus Wasco Inn',
    pricePerNight: 115,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'buttonwillow'
  },
  {
    id: 'h-bw-3',
    name: 'Vagabond Inn Buttonwillow North',
    pricePerNight: 68,
    rating: 3.9,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=600&q=80',
    trackId: 'buttonwillow'
  },

  // Portland International
  {
    id: 'h-prt-1',
    name: 'Oxford Suites Portland - Jantzen Beach',
    pricePerNight: 135,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'portland'
  },
  {
    id: 'h-prt-2',
    name: 'Holiday Inn Columbia Riverfront',
    pricePerNight: 155,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'portland'
  },
  {
    id: 'h-prt-3',
    name: 'Courtyard Portland North',
    pricePerNight: 145,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
    trackId: 'portland'
  },

  // The Ridge Motorsports Park
  {
    id: 'h-rdg-1',
    name: 'Little Creek Casino Resort',
    pricePerNight: 145,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    trackId: 'the-ridge'
  },
  {
    id: 'h-rdg-2',
    name: 'Alderbrook Resort & Spa',
    pricePerNight: 240,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'the-ridge'
  },
  {
    id: 'h-rdg-3',
    name: 'Shelton Inn & Paddock Lodge',
    pricePerNight: 95,
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    trackId: 'the-ridge'
  },

  // Circuit of the Americas (COTA)
  {
    id: 'h-cot-1',
    name: 'Hilton Austin Airport Hotel',
    pricePerNight: 165,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'cota'
  },
  {
    id: 'h-cot-2',
    name: 'Hyatt Place Austin Airport',
    pricePerNight: 145,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'cota'
  },
  {
    id: 'h-cot-3',
    name: 'Courtyard by Marriott Austin Airport',
    pricePerNight: 150,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
    trackId: 'cota'
  },
  {
    id: 'h-cot-4',
    name: 'Aloft Austin Downtown',
    pricePerNight: 210,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    trackId: 'cota'
  },

  // MSR Houston
  {
    id: 'h-msr-1',
    name: 'Best Western Plus Angleton Inn',
    pricePerNight: 105,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'msr-houston'
  },
  {
    id: 'h-msr-2',
    name: 'Holiday Inn Express Lake Jackson',
    pricePerNight: 125,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'msr-houston'
  },
  {
    id: 'h-msr-3',
    name: 'La Quinta Inn & Suites Angleton',
    pricePerNight: 98,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
    trackId: 'msr-houston'
  },

  // Watkins Glen
  {
    id: 'h-wg-1',
    name: 'Watkins Glen Harbor Hotel',
    pricePerNight: 245,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'watkins-glen'
  },
  {
    id: 'h-wg-2',
    name: 'The Hotel Glen & Paddock Suites',
    pricePerNight: 135,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    trackId: 'watkins-glen'
  },
  {
    id: 'h-wg-3',
    name: 'Lakeside Resort Watkins Glen',
    pricePerNight: 160,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    trackId: 'watkins-glen'
  },

  // NJMP (New Jersey Motorsports Park)
  {
    id: 'h-nj-1',
    name: 'NJMP Finish Line Pub & Paddock Villas',
    pricePerNight: 175,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    trackId: 'njmp'
  },
  {
    id: 'h-nj-2',
    name: 'Fairfield Inn & Suites Millville',
    pricePerNight: 130,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'njmp'
  },
  {
    id: 'h-nj-3',
    name: 'Wingate by Wyndham Vineland',
    pricePerNight: 115,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'njmp'
  },

  // Lime Rock Park
  {
    id: 'h-lr-1',
    name: 'Interlaken Inn Lakeville',
    pricePerNight: 195,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'lime-rock'
  },
  {
    id: 'h-lr-2',
    name: 'The White Hart Inn Salisbury',
    pricePerNight: 230,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    trackId: 'lime-rock'
  },
  {
    id: 'h-lr-3',
    name: 'Sharon Country Inn',
    pricePerNight: 125,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    trackId: 'lime-rock'
  },

  // Road America
  {
    id: 'h-ra-1',
    name: 'The Osthoff Resort Elkhart Lake',
    pricePerNight: 225,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'road-america'
  },
  {
    id: 'h-ra-2',
    name: 'Siebkens Resort Elkhart Lake',
    pricePerNight: 180,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'road-america'
  },
  {
    id: 'h-ra-3',
    name: 'Victorian Village Resort',
    pricePerNight: 150,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
    trackId: 'road-america'
  },

  // Gingerman Raceway
  {
    id: 'h-gm-1',
    name: 'Old Harbor Inn South Haven',
    pricePerNight: 175,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'gingerman'
  },
  {
    id: 'h-gm-2',
    name: 'Hampton Inn South Haven',
    pricePerNight: 145,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'gingerman'
  },
  {
    id: 'h-gm-3',
    name: 'Baymont by Wyndham South Haven',
    pricePerNight: 105,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
    trackId: 'gingerman'
  },

  // Indianapolis Motor Speedway
  {
    id: 'h-ims-1',
    name: 'Brickyard Crossing Inn Speedway',
    pricePerNight: 135,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    trackId: 'indianapolis'
  },
  {
    id: 'h-ims-2',
    name: 'Courtyard by Marriott Speedway',
    pricePerNight: 155,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'indianapolis'
  },
  {
    id: 'h-ims-3',
    name: 'JW Marriott Indianapolis',
    pricePerNight: 220,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'indianapolis'
  },

  // Mid-Ohio Sports Car Course
  {
    id: 'h-mo-1',
    name: 'Hampton Inn Ontario/Mansfield',
    pricePerNight: 130,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'mid-ohio'
  },
  {
    id: 'h-mo-2',
    name: 'TownePlace Suites Mansfield',
    pricePerNight: 140,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'mid-ohio'
  },
  {
    id: 'h-mo-3',
    name: 'Spruce Hill Inn & Cottages',
    pricePerNight: 155,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    trackId: 'mid-ohio'
  },

  // Summit Point Motorsports Park
  {
    id: 'h-sp-1',
    name: 'The George Washington Hotel Winchester',
    pricePerNight: 165,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'summit-point'
  },
  {
    id: 'h-sp-2',
    name: 'Holiday Inn & Suites Charles Town',
    pricePerNight: 135,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'summit-point'
  },
  {
    id: 'h-sp-3',
    name: 'Clarion Hotel Harpers Ferry',
    pricePerNight: 110,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    trackId: 'summit-point'
  },

  // Road Atlanta
  {
    id: 'h-rat-1',
    name: 'Château Élan Winery & Resort',
    pricePerNight: 245,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'road-atlanta'
  },
  {
    id: 'h-rat-2',
    name: 'Best Western Plus Braselton Inn',
    pricePerNight: 115,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'road-atlanta'
  },
  {
    id: 'h-rat-3',
    name: 'Hampton Inn & Suites Braselton',
    pricePerNight: 135,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
    trackId: 'road-atlanta'
  },

  // Barber Motorsports Park
  {
    id: 'h-bar-1',
    name: 'Hampton Inn Birmingham/Leeds',
    pricePerNight: 125,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'barber'
  },
  {
    id: 'h-bar-2',
    name: 'Grand Bohemian Hotel Mountain Brook',
    pricePerNight: 275,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'barber'
  },
  {
    id: 'h-bar-3',
    name: 'Comfort Inn & Suites Leeds',
    pricePerNight: 98,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
    trackId: 'barber'
  },

  // Virginia International Raceway (VIR)
  {
    id: 'h-vir-1',
    name: 'The Villas at South Course (VIR Trackside)',
    pricePerNight: 195,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    trackId: 'vir'
  },
  {
    id: 'h-vir-2',
    name: 'The Paddock Suites at VIR',
    pricePerNight: 165,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'vir'
  },
  {
    id: 'h-vir-3',
    name: 'Courtyard by Marriott Danville',
    pricePerNight: 135,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'vir'
  },

  // Daytona International Speedway
  {
    id: 'h-day-1',
    name: 'The Daytona, Autograph Collection',
    pricePerNight: 215,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'daytona'
  },
  {
    id: 'h-day-2',
    name: 'Fairfield Inn & Suites Daytona Speedway',
    pricePerNight: 145,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'daytona'
  },
  {
    id: 'h-day-3',
    name: 'Hilton Daytona Beach Oceanfront',
    pricePerNight: 185,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    trackId: 'daytona'
  },

  // Sebring International Raceway
  {
    id: 'h-seb-1',
    name: 'Seven Sebring Raceway Hotel (Turn 7 Trackside)',
    pricePerNight: 185,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    trackId: 'sebring'
  },
  {
    id: 'h-seb-2',
    name: 'Inn on the Lakes Sebring',
    pricePerNight: 140,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'sebring'
  },
  {
    id: 'h-seb-3',
    name: 'Tru by Hilton Sebring',
    pricePerNight: 120,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'sebring'
  },

  // Homestead-Miami Speedway
  {
    id: 'h-hm-1',
    name: 'Courtyard by Marriott Miami Homestead',
    pricePerNight: 145,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    trackId: 'homestead'
  },
  {
    id: 'h-hm-2',
    name: 'TownePlace Suites Miami Homestead',
    pricePerNight: 135,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    trackId: 'homestead'
  },
  {
    id: 'h-hm-3',
    name: 'Floridian Hotel Homestead',
    pricePerNight: 95,
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    trackId: 'homestead'
  }
];

export const MOCK_GROUP: GroupTrip = {
  id: 'trip-1',
  name: 'Summer Track Tour 2024',
  status: 'active',
  members: [
    { id: 'm1', name: 'You (Alex)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', budget: 1500, hasVoted: true },
    { id: 'm2', name: 'Jordan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', budget: 1200, hasVoted: true },
    { id: 'm3', name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', budget: 2000, hasVoted: false },
    { id: 'm4', name: 'Chen', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', budget: 1000, hasVoted: true }
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
      { id: 'm1', name: 'Alex', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', budget: 1000, hasVoted: true },
      { id: 'm2', name: 'Jordan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', budget: 800, hasVoted: true }
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
      { id: 'm1', name: 'Alex', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', budget: 1200, hasVoted: true },
      { id: 'm4', name: 'Chen', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', budget: 1100, hasVoted: true }
    ],
    expenses: [
      { id: 'eh2', description: 'Gas & Supplies', amount: 350, paidBy: 'm4', splitWith: ['m1', 'm4'], date: new Date('2023-11-20'), status: 'settled' }
    ],
    votes: [],
    messages: []
  }
];
