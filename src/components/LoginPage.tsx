import React from 'react';
import { motion } from 'motion/react';
import { Flag, LogIn } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-[40px] shadow-2xl border border-slate-100 max-w-md w-full text-center relative z-10"
      >
        <div className="bg-brand w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand/20">
          <Flag className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Welcome to TrackPedia</h1>
        <p className="text-slate-500 font-bold mb-10 leading-relaxed">
          The ultimate platform for track day planning, group trips, and comparing circuits.
        </p>

        <button 
          onClick={onLogin}
          className="w-full bg-brand text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-brand-light transition-all shadow-xl shadow-brand/20 active:scale-95 group"
        >
          <LogIn className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          Sign in with Google
        </button>

        <p className="mt-8 text-[11px] font-black text-slate-400 border-t border-slate-50 pt-8 uppercase tracking-widest leading-relaxed">
          By signing in, you agree to our <br />
          <span className="text-slate-900">Terms of Service</span> & <span className="text-slate-900">Privacy Policy</span>
        </p>
      </motion.div>
    </div>
  );
};
