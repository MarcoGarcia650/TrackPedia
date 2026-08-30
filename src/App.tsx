/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flag, 
  Search, 
  Calendar, 
  MapPin, 
  Car, 
  Bike, 
  Hotel as HotelIcon, 
  Map as MapIcon, 
  ChevronRight,
  Star,
  Plus,
  ShieldCheck,
  TrendingDown,
  Globe,
  HelpCircle,
  Briefcase,
  Heart,
  Filter,
  Users,
  Check,
  X,
  CreditCard,
  Info,
  LogIn,
  Loader2
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import { format, addDays } from 'date-fns';
import { TRACKS, HOTELS, MOCK_GROUP, STATE_MAP, MAJOR_HUBS } from './constants';
import { Track, Hotel, TrackDayPackage, GroupTrip } from './types';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { PlanningPage } from './components/PlanningPage';
import { UserProfile } from './components/UserProfile';
import { LoginPage } from './components/LoginPage';
import { ChecklistPage } from './components/ChecklistPage';
import { CheckoutPage } from './components/CheckoutPage';
import { useAuth } from './context/AuthContext';
import { db } from './lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, onSnapshot } from 'firebase/firestore';

// Fix for default Leaflet icon
const CheckeredFlagIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `
    <div class="relative scale-75 md:scale-100">
      <div class="w-0.5 h-6 bg-slate-800 rounded-full mx-auto"></div>
      <div class="absolute top-0 left-0.5 w-5 h-4 bg-white border border-slate-800 shadow-sm overflow-hidden grid grid-cols-2 grid-rows-2">
        <div class="bg-slate-900"></div>
        <div class="bg-white"></div>
        <div class="bg-white"></div>
        <div class="bg-slate-900"></div>
      </div>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [5, 24],
});

const Navbar = ({ onHome, onPlan, onProfile, onChecklist, profile, currentView, isAuthenticated }: { 
  onHome: () => void, 
  onPlan: () => void, 
  onProfile: () => void, 
  onChecklist: () => void,
  profile: any, 
  currentView: string,
  isAuthenticated: boolean
}) => (
  <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-100 sticky top-0 z-50 h-[64px]">
    <div className="flex items-center gap-2 cursor-pointer" onClick={onHome}>
      <div className="bg-brand p-1 rounded-lg">
        <Flag className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-bold font-display text-brand tracking-tight">TrackPedia</span>
    </div>
    <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
      <button 
        onClick={onChecklist}
        className={`hover:text-brand transition-colors ${currentView === 'checklist' ? 'text-brand underline underline-offset-8' : ''}`}
      >
        Track Day Checklist
      </button>
      <a href="#" className="hover:text-brand transition-colors">Support</a>
      <button 
        onClick={onPlan}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${currentView === 'planning' ? 'bg-brand text-white' : 'hover:text-brand'}`}
      >
        <Users className="w-4 h-4" />
        Group Planning
      </button>
      <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
        <div className="flex items-center gap-2 text-[11px]">
          <span>USD</span>
          <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-4 h-auto rounded-xs opacity-80" referrerPolicy="no-referrer" />
        </div>
        
        {isAuthenticated ? (
          <button 
            onClick={onProfile}
            className={`relative group ${currentView === 'profile' ? 'ring-2 ring-brand ring-offset-2 rounded-full' : ''}`}
          >
            <img 
              src={profile?.avatar || "https://i.pravatar.cc/150?u=m1"} 
              className="w-8 h-8 rounded-full object-cover border border-slate-200 group-hover:scale-105 transition-transform" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </button>
        ) : (
          <button 
            onClick={onProfile}
            className="bg-brand text-white px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-light transition-all active:scale-95 flex items-center gap-2"
          >
            <LogIn className="w-3.5 h-3.5" />
            Sign In
          </button>
        )}
      </div>
    </div>
  </nav>
);

const Features = () => (
  <section className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 py-20 bg-white">
    <div className="space-y-4">
      <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center">
        <Search className="w-6 h-6 text-brand" />
      </div>
      <h3 className="text-xl font-bold">Find Track Days</h3>
      <p className="text-slate-600 leading-relaxed text-sm">
        Search thousands of track days across the country for cars and motorcycles from all major organizers.
      </p>
    </div>
    <div className="space-y-4">
      <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center">
        <TrendingDown className="w-6 h-6 text-brand" />
      </div>
      <h3 className="text-xl font-bold">Compare Packages</h3>
      <p className="text-slate-600 leading-relaxed text-sm">
        View track day costs and nearby hotels all in one place. Real-time availability and competitive pricing.
      </p>
    </div>
    <div className="space-y-4">
      <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center">
        <ShieldCheck className="w-6 h-6 text-brand" />
      </div>
      <h3 className="text-xl font-bold">Book with Confidence</h3>
      <p className="text-slate-600 leading-relaxed text-sm">
        Get the best rates on track days and accommodations with our secure booking platform.
      </p>
    </div>
  </section>
);

const SearchHeader = ({ params, setParams, onSearch, isSearching }: { params: any, setParams: any, onSearch: () => void, isSearching?: boolean }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-white border-b border-slate-200 py-3 px-6 sticky top-[64px] z-40 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-2">
        <div className="flex-1 w-full md:w-auto h-12 border border-slate-400 rounded-lg flex items-center px-3 hover:border-slate-800 transition-colors cursor-text group">
          <MapPin className="w-5 h-5 text-slate-700 mr-2 shrink-0" />
          <div className="flex flex-col flex-1 leading-tight">
            <span className="text-[11px] font-medium text-slate-600">Where to?</span>
            <input 
              type="text" 
              value={params.location} 
              onChange={(e) => setParams({ ...params, location: e.target.value })}
              className="text-[13px] font-semibold bg-transparent outline-none w-full text-slate-900 placeholder:text-slate-400"
              placeholder="Search tracks..."
            />
          </div>
        </div>
        
        <div className="w-full md:w-64 h-12 border border-slate-400 rounded-lg flex items-center px-3 hover:border-slate-800 transition-colors cursor-pointer group relative">
          <Calendar className="w-5 h-5 text-slate-700 mr-2 shrink-0" />
          <div className="flex flex-col flex-1 leading-tight">
            <span className="text-[11px] font-medium text-slate-600">Dates</span>
            <DatePicker
              selected={params.checkIn}
              onChange={(dates) => {
                const [start, end] = dates;
                setParams({ ...params, checkIn: start, checkOut: end });
              }}
              startDate={params.checkIn}
              endDate={params.checkOut}
              selectsRange
              className="text-[13px] font-semibold bg-transparent cursor-pointer w-full text-slate-900"
              placeholderText="Select dates"
              dateFormat="MMM d"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="relative w-full md:w-48">
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            className="h-12 border border-slate-400 rounded-lg flex items-center px-3 hover:border-slate-800 transition-colors cursor-pointer group"
          >
            <Users className="w-5 h-5 text-slate-700 mr-2 shrink-0" />
            <div className="flex flex-col flex-1 leading-tight">
              <span className="text-[11px] font-medium text-slate-600">Travelers</span>
              <span className="text-[13px] font-semibold capitalize text-slate-900 truncate">
                {params.guests} {params.guests === 1 ? 'guest' : 'guests'}, {params.vehicleType}
              </span>
            </div>
          </div>

          <AnimatePresence>
            {showDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowDropdown(false)} 
                />
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-14 left-0 right-0 md:right-auto md:w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-4 space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">Guests</span>
                        <span className="text-[11px] text-slate-500">Number of people</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setParams({ ...params, guests: Math.max(1, params.guests - 1) })}
                          className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:border-slate-800 disabled:opacity-30"
                          disabled={params.guests <= 1}
                        >
                          -
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{params.guests}</span>
                        <button 
                          onClick={() => setParams({ ...params, guests: params.guests + 1 })}
                          className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:border-slate-800"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-500 uppercase block mb-3">Vehicle Type</span>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => setParams({ ...params, vehicleType: 'cars' })}
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                            params.vehicleType === 'cars' 
                            ? 'border-brand bg-blue-50 text-brand' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Car className="w-5 h-5" />
                          <span className="text-xs font-bold">Cars</span>
                        </button>
                        <button 
                          onClick={() => setParams({ ...params, vehicleType: 'motorcycles' })}
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                            params.vehicleType === 'motorcycles' 
                            ? 'border-brand bg-blue-50 text-brand' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Bike className="w-5 h-5" />
                          <span className="text-xs font-bold">Bikes</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowDropdown(false)}
                    className="w-full bg-brand text-white py-2 rounded-lg text-sm font-bold hover:bg-brand-light transition-colors"
                  >
                    Done
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {isSearching && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-[10px] font-bold">Searching...</span>
          </div>
        )}
        <button 
          onClick={onSearch}
          className="w-12 h-12 bg-brand-light text-white rounded-full flex items-center justify-center hover:bg-brand transition-all shrink-0 shadow-sm active:scale-95 ml-1"
        >
          <Search className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const ResultCard: React.FC<{ track: Track; onSelect: (t: Track) => void; onCompare: (t: Track) => void }> = ({ track, onSelect, onCompare }) => {
  const rating = (Math.random() * 1.5 + 8.5).toFixed(1); // 8.5 - 10.0
  const reviews = Math.floor(Math.random() * 500) + 50;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row shadow-xs hover:shadow-md transition-shadow group cursor-pointer"
      onClick={() => onSelect(track)}
    >
      <div className="md:w-1/3 aspect-video md:aspect-auto md:h-auto relative overflow-hidden shrink-0">
        <img src={track.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={track.name} referrerPolicy="no-referrer" />
        <button 
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-slate-600 hover:text-red-500 transition-colors shadow-sm"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold font-display leading-tight">{track.name}</h3>
              <p className="text-sm text-slate-500">{track.location.split(',')[0]}</p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onCompare(track);
              }}
              className="px-3 py-1.5 rounded-lg border border-brand text-brand text-[10px] font-black uppercase tracking-widest hover:bg-brand hover:text-white transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3 h-3" /> Compare
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-end mt-4">
          <div className="space-y-1">
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${track.basePrice}<span className="text-sm font-normal text-slate-500"> /day</span></div>
            <div className="text-xs text-slate-400">Excluding lodging</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ResultsPage = ({ params, setParams, onHome, onPlan, onProfile, onChecklist, onSelect, onCompare, profile, currentView, isAuthenticated, filteredTracks, isSearching, onSearch }: { 
  params: any, 
  setParams: any, 
  onHome: () => void, 
  onPlan: () => void,
  onProfile: () => void,
  onChecklist: () => void,
  onSelect: (t: Track) => void,
  onCompare: (t: Track) => void,
  profile: any,
  currentView: string,
  isAuthenticated: boolean,
  filteredTracks: Track[],
  isSearching?: boolean,
  onSearch: () => void
}) => {
  const [sortBy, setSortBy] = useState('recommended');
  const [maxPrice, setMaxPrice] = useState(500);

  const sortedTracks = useMemo(() => {
    let list = filteredTracks.filter(t => t.basePrice <= maxPrice);
    
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.basePrice - b.basePrice);
    }
    
    if (sortBy === 'distance') {
      const hub = MAJOR_HUBS[params.location.toLowerCase()];
      if (hub) {
        list.sort((a, b) => {
          const distA = Math.sqrt(Math.pow(a.lat - hub.lat, 2) + Math.pow(a.lng - hub.lng, 2));
          const distB = Math.sqrt(Math.pow(b.lat - hub.lat, 2) + Math.pow(b.lng - hub.lng, 2));
          return distA - distB;
        });
      }
    }
    
    return list;
  }, [filteredTracks, sortBy, params.location, maxPrice]);
  
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar 
        onHome={onHome} 
        onPlan={onPlan} 
        onProfile={onProfile} 
        onChecklist={onChecklist}
        profile={profile} 
        currentView={currentView} 
        isAuthenticated={isAuthenticated}
      />
      <SearchHeader params={params} setParams={setParams} onSearch={onSearch} />
      
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-sm">Price per day</h4>
                <span className="text-xs font-bold text-brand bg-blue-50 px-2 py-0.5 rounded-full border border-brand/10">Up to ${maxPrice}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="500" 
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand" 
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-600">{sortedTracks.length} tracks</span>
            <div className="flex items-center gap-3">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-brand/20 cursor-pointer"
              >
                <option value="recommended">Sort by recommended for you</option>
                <option value="price-low">Price (low to high)</option>
                <option value="distance">Distance</option>
              </select>
            </div>
          </div>


          
          <div className="space-y-4">
            {sortedTracks.map(track => (
              <ResultCard 
                key={track.id} 
                track={track} 
                onSelect={onSelect} 
                onCompare={onCompare}
              />
            ))}
            
            {sortedTracks.length === 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">No tracks found</h3>
                <p className="text-slate-500 max-w-xs mx-auto">Try adjusting your search filters or searching for California or Texas.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  const { user, profile, loading: authLoading, login, logout } = useAuth();
  const [view, setView] = useState<'home' | 'results' | 'comparison' | 'planning' | 'profile' | 'checklist' | 'trackDetail' | 'checkout'>('home');
  const [params, setParams] = useState({
    location: '',
    checkIn: new Date(),
    checkOut: addDays(new Date(), 2),
    vehicleType: 'cars' as 'cars' | 'motorcycles',
    guests: 1
  });
  
  const [comparisonItems, setComparisonItems] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TrackDayPackage | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<Track[]>(TRACKS);
  
  const [selectedHotels, setSelectedHotels] = useState<Record<string, Hotel>>({});
  const [fetchedHotels, setFetchedHotels] = useState<Record<string, Hotel[]>>({});
  const [isFetchingHotels, setIsFetchingHotels] = useState<Record<string, boolean>>({});

  const fetchNearbyLodging = async (track: Track) => {
    if (fetchedHotels[track.id] || isFetchingHotels[track.id]) return;
    
    setIsFetchingHotels(prev => ({ ...prev, [track.id]: true }));
    
    try {
      // Overpass API to find hotels within 15km
      const query = `[out:json];node["tourism"~"hotel|motel|guest_house|hostel"](around:20000,${track.lat},${track.lng});out;`;
      const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      const results: Hotel[] = (data.elements || []).slice(0, 5).map((el: any) => {
        const name = el.tags.name || "Nearby Lodging";
        // Generate random but deterministic price based on ID and name length
        const basePrice = 80 + (el.id % 120);
        return {
          id: `osm-${el.id}`,
          name: name,
          pricePerNight: basePrice,
          rating: Number((3.5 + (Math.random() * 1.5)).toFixed(1)),
          image: `https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop&sig=${el.id}`,
          trackId: track.id
        };
      });

      // Merge with local mock hotels
      const localHotels = HOTELS.filter(h => h.trackId === track.id);
      const allHotels = [...localHotels, ...results].filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);

      setFetchedHotels(prev => ({ ...prev, [track.id]: allHotels }));
      
      // Select first hotel by default if none selected
      if (allHotels.length > 0 && !selectedHotels[track.id]) {
        setSelectedHotels(prev => ({ ...prev, [track.id]: allHotels[0] }));
      }
    } catch (err) {
      console.error("Failed to fetch hotels", err);
      // Fallback to mock data
      const localHotels = HOTELS.filter(h => h.trackId === track.id);
      setFetchedHotels(prev => ({ ...prev, [track.id]: localHotels }));
    } finally {
      setIsFetchingHotels(prev => ({ ...prev, [track.id]: false }));
    }
  };

  const handleSelectHotel = (trackId: string, hotel: Hotel) => {
    setSelectedHotels(prev => ({ ...prev, [trackId]: hotel }));
  };

  const performSearch = async (loc: string) => {
    if (!loc) {
      setSearchResults(TRACKS);
      return;
    }
    
    setIsSearching(true);
    const query = loc.toLowerCase();
    
    // 1. Local basic filtering
    const expandedState = STATE_MAP[query];
    const hub = MAJOR_HUBS[query];
    
    let directMatches = TRACKS.filter(t => 
      t.name.toLowerCase().includes(query) || 
      t.location.toLowerCase().includes(query) ||
      (expandedState && t.location.toLowerCase().includes(expandedState))
    );

    let anchorPoints: { lat: number, lng: number }[] = directMatches.map(m => ({ lat: m.lat, lng: m.lng }));
    if (hub) anchorPoints.push(hub);

    // 2. Try Nominatim Geocoding if no direct matches or as an enhancement
    if (directMatches.length === 0 && !hub && query.length > 2) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
        const data = await response.json();
        if (data && data.length > 0) {
          const remoteHub = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
          anchorPoints.push(remoteHub);
        }
      } catch (err) {
        console.error("Geocoding failed", err);
      }
    }

    const anchorStates = new Set<string>();
    directMatches.forEach(m => {
      const state = m.location.split(',').pop()?.trim().toLowerCase();
      if (state) anchorStates.add(state);
    });
    if (expandedState) anchorStates.add(expandedState);

    // 3. Final proximity filter
    const finalResults = TRACKS.filter(t => {
      if (directMatches.some(dm => dm.id === t.id)) return true;
      const tState = t.location.split(',').pop()?.trim().toLowerCase();
      if (tState && anchorStates.has(tState)) return true;
      return anchorPoints.some(ap => {
        const dLat = t.lat - ap.lat;
        const dLng = t.lng - ap.lng;
        return Math.sqrt(dLat * dLat + dLng * dLng) < 4.0; // ~280 miles radius
      });
    });

    setSearchResults(finalResults);
    setIsSearching(false);
  };

  useEffect(() => {
    // Live filter for quick feedback, but geocoding only on debounce or search button
    const timer = setTimeout(() => {
      performSearch(params.location);
    }, 500);
    return () => clearTimeout(timer);
  }, [params.location]);

  const handleSearch = () => {
    setView('results');
    performSearch(params.location);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTrack = (track: Track) => {
    setSelectedTrack(track);
    fetchNearbyLodging(track);
    setView('trackDetail');
  };

  const handleCompareTrack = (track: Track) => {
    setComparisonItems(prev => {
      if (prev.find(t => t.id === track.id)) return prev;
      return [...prev, track];
    });
    fetchNearbyLodging(track);
    setView('comparison');
  };

  const handleCheckout = (pkg: TrackDayPackage) => {
    setSelectedPackage({
      ...pkg,
      trackDayDate: params.checkIn
    });
    setView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmBooking = async (bookingData: any) => {
    if (!user) {
      if (confirm("Please sign in to complete your booking!")) {
        login();
      }
      return;
    }

    setIsSubmittingBooking(true);
    try {
      if (selectedPackage) {
        await addDoc(collection(db, 'bookings'), {
          userId: user.uid,
          trackId: selectedPackage.track.id,
          trackName: selectedPackage.track.name,
          hotelId: selectedPackage.selectedHotel?.id || null,
          hotelName: selectedPackage.selectedHotel?.name || null,
          totalCost: selectedPackage.totalCost,
          checkIn: params.checkIn.toISOString(),
          checkOut: params.checkOut.toISOString(),
          status: 'confirmed',
          createdAt: serverTimestamp(),
          cardName: bookingData.cardName
        });
      }
    } catch (err) {
      console.error("Booking failed", err);
      alert("Something went wrong with your booking. Please try again.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const getComparisonData = (): TrackDayPackage[] => {
    // If we have selected items, use them, otherwise use defaults for demo
    const displayTracks = comparisonItems.length > 0 ? comparisonItems : TRACKS.slice(0, 3);
    
    return displayTracks.map(track => {
      const trackHotels = fetchedHotels[track.id] || HOTELS.filter(h => h.trackId === track.id);
      const selectedHotel = selectedHotels[track.id] || trackHotels[0] || null;
      const nights = params.checkOut ? Math.max(1, Math.round((params.checkOut.getTime() - params.checkIn.getTime()) / (1000 * 60 * 60 * 24))) : 1;
      return {
        track,
         hotels: trackHotels,
        selectedHotel,
        nights,
        totalCost: track.basePrice + (selectedHotel ? selectedHotel.pricePerNight * nights : 0)
      };
    });
  };

  useEffect(() => {
    // Fetch hotels for tracks being compared if not already fetching
    comparisonItems.forEach(item => {
        fetchNearbyLodging(item);
    });
  }, [comparisonItems]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'bookings'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserBookings(bookings);
      });
      return () => unsubscribe();
    } else {
      setUserBookings([]);
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (view === 'profile' && !user) {
    return <LoginPage onLogin={login} />;
  }

  if (view === 'profile' && profile) {
    return (
      <UserProfile 
        user={profile} 
        onLogout={logout} 
        onClose={() => setView('home')} 
        bookings={userBookings}
      />
    );
  }

  if (view === 'checkout' && selectedPackage) {
    return (
      <CheckoutPage 
        pkg={selectedPackage} 
        onBack={() => setView('comparison')} 
        onHome={() => setView('home')}
        onConfirm={handleConfirmBooking}
        isSubmitting={isSubmittingBooking}
      />
    );
  }

  if (view === 'planning') {
    return (
      <div className="min-h-screen">
        <Navbar 
          onHome={() => setView('home')} 
          onPlan={() => setView('planning')} 
          onProfile={() => setView('profile')} 
          onChecklist={() => setView('checklist')}
          profile={profile} 
          currentView={view} 
          isAuthenticated={!!user}
        />
        {!user && (
          <div className="bg-brand text-white py-2 px-6 text-center text-[10px] font-black uppercase tracking-[0.2em] relative z-50">
            Preview Mode: Sign in to save your own tracks and invite friends
          </div>
        )}
        <PlanningPage trip={MOCK_GROUP} isDemo={!user} onLogin={login} />
      </div>
    );
  }

  if (view === 'checklist') {
    return <ChecklistPage onBack={() => setView('home')} />;
  }

  if (view === 'results') {
    return (
      <ResultsPage 
        params={params} 
        setParams={setParams} 
        onHome={() => setView('home')} 
        onPlan={() => setView('planning')}
        onProfile={() => setView('profile')}
        onChecklist={() => setView('checklist')}
        onSelect={handleSelectTrack}
        onCompare={handleCompareTrack}
        profile={profile}
        currentView={view}
        isAuthenticated={!!user}
        filteredTracks={searchResults}
        isSearching={isSearching}
        onSearch={handleSearch}
      />
    );
  }

  if (view === 'trackDetail' && selectedTrack) {
    const trackHotels = fetchedHotels[selectedTrack.id] || HOTELS.filter(h => h.trackId === selectedTrack.id);
    const selectedHotel = selectedHotels[selectedTrack.id] || trackHotels[0] || null;
    const nights = params.checkOut ? Math.max(1, Math.round((params.checkOut.getTime() - params.checkIn.getTime()) / (1000 * 60 * 60 * 24))) : 1;
    
    return (
      <div className="min-h-screen">
        <Navbar 
          onHome={() => setView('home')} 
          onPlan={() => setView('planning')} 
          onProfile={() => setView('profile')} 
          onChecklist={() => setView('checklist')}
          profile={profile} 
          currentView={view} 
          isAuthenticated={!!user}
        />
        <div className="bg-white border-b border-slate-200 py-2 sticky top-[64px] z-40 flex items-center justify-between px-12">
            <button onClick={() => setView('results')} className="text-brand font-bold text-xs flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5 rotate-180" /> Back to results
            </button>
        </div>
        <ComparisonDashboard 
          title={`${selectedTrack.name} Lodging`}
          hideAddButton
          onAddTrack={handleCompareTrack}
          onSelectHotel={handleSelectHotel}
          onCheckout={handleCheckout}
          availableTracks={searchResults}
          packages={[{
            track: selectedTrack,
            hotels: trackHotels,
            selectedHotel,
            nights,
            totalCost: selectedTrack.basePrice + (selectedHotel ? selectedHotel.pricePerNight * nights : 0)
          }]} 
        />
      </div>
    );
  }

  if (view === 'comparison') {
    return (
      <div className="min-h-screen">
        <Navbar 
          onHome={() => setView('home')} 
          onPlan={() => setView('planning')} 
          onProfile={() => setView('profile')} 
          onChecklist={() => setView('checklist')}
          profile={profile} 
          currentView={view} 
          isAuthenticated={!!user}
        />
        <div className="bg-white border-b border-slate-200 py-2 sticky top-[64px] z-40 flex items-center justify-between px-12">
            <button onClick={() => setView('results')} className="text-brand font-bold text-xs flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5 rotate-180" /> Back to results
            </button>
            <div className="hidden md:flex gap-3">
              {comparisonItems.map(item => (
                <div key={item.id} className="flex items-center gap-2 bg-slate-50 px-1 py-1 pr-2.5 rounded-full border border-slate-200">
                  <img src={item.image} className="w-5 h-5 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <span className="text-[10px] font-bold">{item.name}</span>
                  <X className="w-3 h-3 cursor-pointer text-slate-400 hover:text-red-500" onClick={() => setComparisonItems(comparisonItems.filter(i => i.id !== item.id))} />
                </div>
              ))}
            </div>
        </div>
        <ComparisonDashboard 
          packages={getComparisonData()} 
          onAddTrack={handleCompareTrack}
          onSelectHotel={handleSelectHotel}
          onCheckout={handleCheckout}
          availableTracks={searchResults}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onHome={() => setView('home')} 
        onPlan={() => setView('planning')} 
        onProfile={() => setView('profile')} 
        onChecklist={() => setView('checklist')}
        profile={profile} 
        currentView={view} 
        isAuthenticated={!!user}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex flex-col items-center pt-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.porschesprint.com/wp-content/uploads/elementor/thumbs/PSC_Sonoma_Parade-Laps-_Kyle-Schwab_13532-scaled-rhygikkb9g3l26eph7mifaqgh79rx79uzvem5hep3k.jpg" 
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Track"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-slate-900/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto text-center space-y-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white font-display tracking-tight drop-shadow-2xl leading-[1.1]"
          >
            The one place you <br />go for track days
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: 'spring', damping: 20 }}
            className="bg-white/95 backdrop-blur-md rounded-[32px] shadow-2xl p-2 md:p-1 overflow-hidden border border-white/20"
          >
            {/* Search Card Tabs */}
            <div className="flex border-b border-slate-100 mb-6 p-4">
              <button className="flex items-center gap-2 text-brand font-semibold text-sm border-b-2 border-brand pb-4">
                <Flag className="w-4 h-4" />
                Track Days
              </button>
            </div>
            
            <div className="px-6 pb-6 space-y-6">
              {/* Type Toggles */}
              <div className="flex gap-2">
                <button 
                  onClick={() => setParams({ ...params, vehicleType: 'cars' })}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    params.vehicleType === 'cars' 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Car className="w-4 h-4" />
                  Cars
                </button>
                <button 
                  onClick={() => setParams({ ...params, vehicleType: 'motorcycles' })}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    params.vehicleType === 'motorcycles' 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Bike className="w-4 h-4" />
                  Motorcycles
                </button>
              </div>
              
              {/* Inputs */}
              <div className="grid md:grid-cols-[1.5fr,2fr,auto] gap-4">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-col items-start gap-1 group focus-within:ring-2 focus-within:ring-brand/20 transition-all">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 ml-1 leading-none">
                    <MapPin className="w-3 h-3" /> Track or Region
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g., Laguna Seca, CA" 
                    className="w-full bg-transparent border-none text-sm font-bold focus:ring-0 p-1 placeholder:text-slate-400"
                    value={params.location}
                    onChange={(e) => setParams({ ...params, location: e.target.value })}
                  />
                </div>
                
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-col items-start gap-1 group focus-within:ring-2 focus-within:ring-brand/20 transition-all relative">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 ml-1 leading-none">
                    <Calendar className="w-3 h-3" /> Dates
                  </label>
                  <DatePicker
                    selected={params.checkIn}
                    onChange={(dates) => {
                      const [start, end] = dates;
                      setParams({ ...params, checkIn: start, checkOut: end });
                    }}
                    startDate={params.checkIn}
                    endDate={params.checkOut}
                    selectsRange
                    className="w-full bg-transparent border-none text-sm font-bold focus:ring-0 p-1 placeholder:text-slate-400 cursor-pointer"
                    placeholderText="Check-in - Check-out"
                    dateFormat="MMM d, yyyy"
                    autoComplete="off"
                  />
                </div>
                
                <button 
                  onClick={handleSearch}
                  className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                >
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
              
              {/* Checkboxes */}
              <div className="flex gap-6 pt-2 ml-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand focus:ring-brand" defaultChecked />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Include lodging</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand focus:ring-brand" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Beginner friendly</span>
                </label>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold font-display mb-2">Explore Track Locations</h2>
            <p className="text-slate-600">Click on any track marker to view available track days and nearby lodging</p>
          </div>
          
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl relative group h-[600px]">
            <MapContainer 
              center={[38, -97]} 
              zoom={4} 
              className="w-full h-full z-0"
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              {TRACKS.map((track) => (
                <Marker 
                  key={track.id} 
                  position={[track.lat, track.lng]} 
                  icon={CheckeredFlagIcon}
                >
                  <Popup className="track-popup">
                    <div className="flex items-center gap-3 p-1 min-w-[200px]">
                      <div className="w-20 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                        <img src={track.image} className="w-full h-full object-cover" alt={track.name} referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold text-brand m-0 leading-tight">{track.name}</h4>
                        <p className="text-[10px] text-slate-500 m-0 mt-1">{track.location}</p>
                        <button 
                          onClick={() => handleSelectTrack(track)}
                          className="mt-2 bg-brand text-white text-[10px] px-2 py-1 rounded font-bold hover:bg-brand-light transition-colors"
                        >
                          View Track Days
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-100 shadow-sm z-10">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">Live Track Directory • Interactive Map</span>
            </div>
            
            <div className="absolute bottom-4 right-4 flex gap-4 z-10">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100">
                <Flag className="w-3 h-3 text-slate-800" />
                <span className="text-xs font-semibold">Active Track</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Features />
      
      <footer className="mt-auto bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-brand p-1.5 rounded-lg">
                <Flag className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold font-display text-brand tracking-tight">TrackPedia</span>
            </div>
            <p className="text-sm text-slate-500">
              The ultimate source for track day enthusiasts. Find tracks, book hotels, and get on track.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-brand">California Tracks</a></li>
              <li><a href="#" className="hover:text-brand">Florida Tracks</a></li>
              <li><a href="#" className="hover:text-brand">Texas Tracks</a></li>
              <li><a href="#" className="hover:text-brand">European Circuits</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-brand">Organizers</a></li>
              <li><a href="#" className="hover:text-brand">Reviews</a></li>
              <li><a href="#" className="hover:text-brand">Events Calendar</a></li>
              <li><a href="#" className="hover:text-brand">Forums</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-brand">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

const ComparisonDashboard = ({ 
  packages, 
  title, 
  hideAddButton, 
  availableTracks = [], 
  onAddTrack,
  onSelectHotel,
  onCheckout
}: { 
  packages: TrackDayPackage[], 
  title?: string, 
  hideAddButton?: boolean,
  availableTracks?: Track[],
  onAddTrack?: (track: Track) => void,
  onSelectHotel?: (trackId: string, hotel: Hotel) => void,
  onCheckout?: (pkg: TrackDayPackage) => void
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Exclude tracks that are already in packages
  const selectableTracks = availableTracks.filter(t => !packages.some(pkg => pkg.track.id === t.id));

  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-24 px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-display">{title || "Compare Track Day Lodging"}</h2>
        </div>
        
        <div className={`grid grid-cols-1 gap-6 items-start ${
          packages.length === 1 ? 'max-w-md mx-auto md:max-w-none md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {packages.map((pkg) => (
            <motion.div 
              key={pkg.track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-video">
                <img 
                  src={pkg.track.image} 
                  alt={pkg.track.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 aspect-video rounded-lg border-2 border-white/40 overflow-hidden shrink-0 shadow-lg">
                      <img src={pkg.track.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight">{pkg.track.name}</h3>
                      <p className="text-white/80 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {pkg.track.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <span>Hotels Nearby</span>
                  </div>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {pkg.hotels.length > 0 ? pkg.hotels.map(hotel => (
                      <div 
                        key={hotel.id}
                        onClick={() => onSelectHotel?.(pkg.track.id, hotel)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          pkg.selectedHotel?.id === hotel.id 
                          ? 'border-brand bg-blue-50/50' 
                          : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex gap-3">
                          <img src={hotel.image} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold truncate">{hotel.name}</h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs text-slate-600">{hotel.rating.toFixed(1)}</span>
                              <span className="text-xs font-bold text-slate-900 border-l border-slate-200 pl-2">
                                ${hotel.pricePerNight}<span className="font-normal text-slate-500">/nt</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <HotelIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No lodging data found</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-dashed border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-500">Track Fee</span>
                    <span className="text-sm font-semibold">${pkg.track.basePrice}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-slate-500">Lodging ({pkg.nights} nights)</span>
                    <span className="text-sm font-semibold">${(pkg.selectedHotel?.pricePerNight || 0) * pkg.nights}</span>
                  </div>
                  <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl">
                    <div>
                      <span className="block text-xs text-slate-500 font-medium font-display">Total Package Cost</span>
                      <span className="text-2xl font-bold text-brand">${pkg.totalCost}</span>
                    </div>
                    <button 
                      onClick={() => onCheckout?.(pkg)}
                      className="bg-brand text-white p-2 rounded-lg hover:bg-brand-light transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {!hideAddButton && (
            <div className="relative h-full">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-full h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-brand hover:border-brand hover:bg-white transition-all group"
              >
                <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="font-medium">Add another track to compare</span>
              </button>
              {isMenuOpen && (
                <div className="absolute inset-0 bg-white border border-slate-200 rounded-2xl shadow-2xl z-[100] overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white shadow-sm">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Nearby Tracks</h4>
                    <button onClick={() => setIsMenuOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {selectableTracks.length > 0 ? selectableTracks.map(track => (
                      <button 
                        key={track.id}
                        onClick={() => {
                          onAddTrack?.(track);
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all text-left group active:scale-[0.98]"
                      >
                        <div className="w-14 aspect-video rounded-lg overflow-hidden shrink-0">
                          <img src={track.image} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all shadow-sm" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{track.name}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{track.location}</div>
                        </div>
                      </button>
                    )) : (
                      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                          <Flag className="w-6 h-6 text-slate-300" />
                        </div>
                        <p className="text-slate-400 text-sm font-medium">No other tracks found in this area.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
