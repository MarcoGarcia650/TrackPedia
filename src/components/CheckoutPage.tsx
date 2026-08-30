import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  CreditCard, 
  Calendar, 
  MapPin, 
  Hotel, 
  ShieldCheck, 
  Lock, 
  CheckCircle2,
  ArrowRight,
  Info
} from 'lucide-react';
import { TrackDayPackage } from '../types';
import { format } from 'date-fns';
import { SafeImage } from './SafeImage';

interface CheckoutPageProps {
  pkg: TrackDayPackage;
  onBack: () => void;
  onHome?: () => void;
  onConfirm: (bookingData: any) => Promise<void>;
  isSubmitting?: boolean;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ pkg, onBack, onHome, onConfirm, isSubmitting }) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    await onConfirm({
      trackId: pkg.track.id,
      trackName: pkg.track.name,
      hotelId: pkg.selectedHotel?.id,
      hotelName: pkg.selectedHotel?.name,
      totalCost: pkg.totalCost,
      cardName
    });
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center text-green-600 mb-8"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
        
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-black text-slate-900 tracking-tighter mb-4"
        >
          Everything's set!
        </motion.h2>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-sm mb-12 font-medium"
        >
          Your track day at <span className="text-slate-900 font-bold">{pkg.track.name}</span> has been booked. We've sent a confirmation email with all the details.
        </motion.p>
        
        <motion.button 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onHome || onBack}
          className="bg-brand text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-light transition-all active:scale-95 shadow-xl shadow-brand/20"
        >
          Back to TrackPedia
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-brand transition-colors font-bold text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Comparison
          </button>
          <div className="flex items-center gap-2 text-brand">
            <Lock className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Secure Checkout</span>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-12 items-start">
          {/* Main Form */}
          <div className="space-y-8">
            {/* Package Summary at the Top */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="aspect-video relative">
                <SafeImage src={pkg.track.image} className="w-full h-full object-cover" alt={pkg.track.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <h3 className="text-white font-black text-2xl leading-tight">{pkg.track.name}</h3>
                  <div className="flex items-center gap-1.5 text-white/80 text-[10px] font-black uppercase tracking-widest mt-1">
                    <MapPin className="w-3 h-3" />
                    {pkg.track.location}
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Check-in</p>
                      <p className="text-base font-black text-slate-900">{format(pkg.trackDayDate || new Date(), 'MMM dd, yyyy')}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                      <p className="text-base font-black text-slate-900">Full Day</p>
                    </div>
                  </div>

                  {pkg.selectedHotel && (
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <SafeImage src={pkg.selectedHotel.image} className="w-full h-full object-cover" alt={pkg.selectedHotel.name} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lodging</p>
                        <p className="text-base font-black text-slate-900 truncate">{pkg.selectedHotel.name}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Price Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500 font-medium font-display">Track Day Fee</span>
                          <span className="text-slate-900 font-black">${pkg.track.basePrice}</span>
                        </div>
                        {pkg.selectedHotel && (
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500 font-medium font-display">
                              {pkg.selectedHotel.name} ({pkg.nights} nt)
                            </span>
                            <span className="text-slate-900 font-black">${pkg.selectedHotel.pricePerNight * pkg.nights}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500 font-medium font-display">Processing Fee</span>
                          <span className="text-slate-900 font-black">$0</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-end items-start md:items-end p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="font-black text-slate-400 uppercase text-[10px] tracking-widest mb-1">Total Package Cost</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-brand">${pkg.totalCost}</span>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Includes all taxes</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-2xl flex items-center gap-3 border border-blue-100/50">
                   <ShieldCheck className="w-5 h-5 text-brand" />
                   <div className="leading-tight">
                     <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Secure Reservation</p>
                     <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">Your payment data is encrypted and never stored on our servers</p>
                   </div>
                </div>
              </div>
            </div>

            <section>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-8">Confirm and Pay</h1>
              
              <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-8">
                <div>
                  <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Payment Method</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-blue-50 border border-brand/20 p-4 rounded-2xl">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <CreditCard className="w-5 h-5 text-brand" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-900">Credit or Debit Card</p>
                        <p className="text-xs text-slate-500">Secure encrypted payment</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-brand" />
                    </div>
                  </div>
                </div>

                <form onSubmit={handleConfirm} className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cardholder Name</label>
                    <input 
                      required
                      type="text" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-brand/20 outline-none transition-all" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Card Number</label>
                    <div className="relative">
                      <input 
                        required
                        type="text" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                        placeholder="0000 0000 0000 0000"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-brand/20 outline-none transition-all pr-12" 
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 opacity-40">
                         <div className="w-6 h-4 bg-slate-400 rounded-xs" />
                         <div className="w-6 h-4 bg-slate-400 rounded-xs" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Expiry Date</label>
                      <input 
                        required
                        type="text" 
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM / YY"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-brand/20 outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CVV</label>
                      <input 
                        required
                        type="password" 
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        placeholder="•••"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-brand/20 outline-none transition-all" 
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-light transition-all shadow-xl shadow-brand/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? 'Processing...' : (
                        <>
                          Confirm Booking • ${pkg.totalCost}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[10px] font-bold text-slate-400 mt-4 px-8 uppercase tracking-widest">
                      By clicking confirm, you agree to TrackPedia's Terms of Service and track-specific liability waivers.
                    </p>
                  </div>
                </form>
              </div>
            </section>
          </div>

          {/* Sidebar / Info Column */}
          <aside className="sticky top-28 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-sm">
               <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Why book with us?</h3>
               
               <div className="space-y-6">
                 <div className="flex gap-4">
                   <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center text-brand shrink-0">
                     <ShieldCheck className="w-5 h-5" />
                   </div>
                   <div className="space-y-1">
                     <h4 className="text-sm font-bold text-slate-900">Buyer Protection</h4>
                     <p className="text-xs text-slate-500 leading-relaxed font-medium">Your purchase is protected by our track-day guarantee.</p>
                   </div>
                 </div>

                 <div className="flex gap-4">
                   <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                     <CheckCircle2 className="w-5 h-5" />
                   </div>
                   <div className="space-y-1">
                     <h4 className="text-sm font-bold text-slate-900">Instant Confirmation</h4>
                     <p className="text-xs text-slate-500 leading-relaxed font-medium">Your spot is reserved immediately upon successful payment.</p>
                   </div>
                 </div>

                 <div className="flex gap-4">
                   <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-brand shrink-0">
                     <Calendar className="w-5 h-5" />
                   </div>
                   <div className="space-y-1">
                     <h4 className="text-sm font-bold text-slate-900">Easy Rescheduling</h4>
                     <p className="text-xs text-slate-500 leading-relaxed font-medium">Change your date up to 72 hours before the event starts.</p>
                   </div>
                 </div>
               </div>
            </div>

            <div className="text-center px-4">
               <p className="text-xs text-slate-400 font-medium leading-relaxed">
                 Need help with your booking? <br />
                 <a href="#" className="text-brand font-bold hover:underline">Contact our concierge team</a>
               </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
