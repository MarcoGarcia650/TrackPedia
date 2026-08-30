import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Settings, 
  LogOut, 
  Camera, 
  Mail, 
  Car, 
  Trophy, 
  Map as MapIcon,
  ChevronRight,
  FileText,
  Calendar
} from 'lucide-react';
import { UserProfile as UserProfileType } from '../types';
import { SafeImage } from './SafeImage';

interface UserProfileProps {
  user: UserProfileType;
  onLogout: () => void;
  onClose: () => void;
  bookings?: any[];
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout, onClose, bookings = [] }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <h2 className="text-xl font-black text-slate-900 tracking-tighter">Pilot Profile</h2>
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-8 text-center">
          <div className="relative inline-block mb-6">
            <SafeImage 
              src={user.avatar} 
              className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl"
              alt={user.name}
              fallbackSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
            />
            <button className="absolute -bottom-2 -right-2 bg-brand text-white p-2 rounded-xl shadow-lg border-2 border-white hover:scale-110 transition-transform">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{user.name}</h3>
          <p className="text-slate-400 font-bold mb-4 flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            {user.email}
          </p>
          <p className="text-slate-600 font-medium px-4 leading-relaxed italic max-w-md mx-auto">
            "{user.bio || 'Track enthusiast and weekend warrior. Always chasing the perfect lap time.'}"
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="p-2 bg-blue-50 w-fit rounded-xl text-blue-600 mb-4">
              <MapIcon className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 text-left">Trips</p>
            <h4 className="text-2xl font-black text-slate-900 text-left">{user.totalTrips}</h4>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="p-2 bg-green-50 w-fit rounded-xl text-green-600 mb-4">
              <Trophy className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 text-left">Miles</p>
            <h4 className="text-2xl font-black text-slate-900 text-left">{user.totalMiles?.toLocaleString() || 0}</h4>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
          <div className="p-6">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Upcoming Track Days</h4>
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking, i) => (
                  <div key={booking.id || i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-slate-900 truncate">{booking.trackName}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                        {new Date(booking.checkIn).toLocaleDateString()} • {booking.hotelName ? 'Inc. Lodging' : 'Track Only'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-brand">${booking.totalCost}</p>
                      <span className="text-[8px] font-black text-green-500 bg-green-50 px-1.5 py-0.5 rounded uppercase">Confirmed</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                  No upcoming track days scheduled. <br /> Find your next event on the map!
                </p>
              </div>
            )}
          </div>

          <button className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-slate-100 rounded-xl text-slate-500 group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                <Car className="w-5 h-5" />
              </div>
              <span className="font-black text-slate-700">Garage & Vehicles</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </button>
          
          <button className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-slate-100 rounded-xl text-slate-500 group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-black text-slate-700">Safety Certifications</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        {/* Danger Zone */}
        <button 
          onClick={onLogout}
          className="w-full bg-white text-red-500 border border-red-100 p-6 rounded-3xl font-black flex items-center justify-center gap-3 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </main>
    </div>
  );
};
