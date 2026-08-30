import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Vote as VoteIcon, 
  DollarSign, 
  Receipt, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ArrowRight,
  TrendingUp,
  CreditCard,
  ChevronRight,
  UserPlus,
  X,
  MessageSquare,
  Send,
  MoreHorizontal,
  History,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { GroupTrip, GroupMember, Expense, Vote, Track, Hotel, ChatMessage } from '../types';
import { TRACKS, HOTELS, MOCK_TRIPS_HISTORY } from '../constants';
import { SafeImage } from './SafeImage';

interface PlanningPageProps {
  trip: GroupTrip;
  isDemo?: boolean;
  onLogin?: () => void;
}

export const PlanningPage: React.FC<PlanningPageProps> = ({ trip: initialTrip, isDemo = false, onLogin }) => {
  const [trip, setTrip] = useState<GroupTrip>(initialTrip);
  const [votingTab, setVotingTab] = useState<'tracks' | 'hotels'>('tracks');
  
  const demoGuard = (action: () => void) => {
    if (isDemo) {
      if (confirm("This is a demo! Sign in to save your own trips and collaborate with friends. Sign in now?")) {
        onLogin?.();
      }
    }
    action();
  };

  const [view, setView] = useState<'overview' | 'voting' | 'expenses' | 'chat' | 'history'>('overview');
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showManageTrip, setShowManageTrip] = useState(false);
  const [newExpense, setNewExpense] = useState<{
    description: string;
    amount: number;
    paidBy: string;
    splitWith: string[];
  }>({ 
    description: '', 
    amount: 0, 
    paidBy: 'm1',
    splitWith: initialTrip.members.map(m => m.id)
  });
  const [chatInput, setChatInput] = useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  React.useEffect(() => {
    if (view === 'chat' && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [view, trip.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessage: ChatMessage = {
      id: Math.random().toString(),
      senderId: 'm1', // Current user Alex
      text: chatInput,
      timestamp: new Date(),
      type: 'text'
    };

    demoGuard(() => {
      setTrip({
        ...trip,
        messages: [...trip.messages, newMessage]
      });
      setChatInput('');
    });
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.splitWith.length === 0) return; // Must split with at least one person

    const expense: Expense = {
      id: Math.random().toString(),
      description: newExpense.description,
      amount: Number(newExpense.amount),
      paidBy: newExpense.paidBy,
      splitWith: newExpense.splitWith,
      date: new Date(),
      status: 'pending'
    };
    
    demoGuard(() => {
      setTrip({
        ...trip,
        expenses: [expense, ...trip.expenses]
      });
      setShowAddExpense(false);
      setNewExpense({ 
        description: '', 
        amount: 0, 
        paidBy: 'm1',
        splitWith: trip.members.map(m => m.id)
      });
    });
  };

  // Calculate stats
  const totalBudget = useMemo(() => trip.members.reduce((sum, m) => sum + m.budget, 0), [trip.members]);
  const totalExpenses = useMemo(() => trip.expenses.reduce((sum, e) => sum + e.amount, 0), [trip.expenses]);
  
  // Calculate individual balances
  const balances = useMemo(() => {
    const bal: Record<string, number> = {};
    trip.members.forEach(m => bal[m.id] = 0);
    
    trip.expenses.forEach(exp => {
      const perPerson = exp.amount / exp.splitWith.length;
      bal[exp.paidBy] += exp.amount;
      exp.splitWith.forEach(memberId => {
        bal[memberId] -= perPerson;
      });
    });
    
    return bal;
  }, [trip.expenses, trip.members]);

  const handleVote = (itemId: string, type: 'track' | 'hotel' | 'kick') => {
    const userId = 'm1'; // Mocking current user as Alex
    const existingVote = trip.votes.find(v => v.itemId === itemId && v.type === type);
    
    demoGuard(() => {
      if (existingVote) {
        if (existingVote.votedBy.includes(userId)) {
          // Remove vote
          setTrip({
            ...trip,
            votes: trip.votes.map(v => 
              v.itemId === itemId && v.type === type 
                ? { ...v, votedBy: v.votedBy.filter(id => id !== userId) }
                : v
            )
          });
        } else {
          // Add vote
          setTrip({
            ...trip,
            votes: trip.votes.map(v => 
              v.itemId === itemId && v.type === type 
                ? { ...v, votedBy: [...v.votedBy, userId] }
                : v
            )
          });
        }
      } else {
        // Create new vote entry
        setTrip({
          ...trip,
          votes: [...trip.votes, { id: Math.random().toString(), type, itemId, votedBy: [userId] }]
        });
      }
    });
  };

  const handlePayDebt = (expenseId: string) => {
    demoGuard(() => {
      setTrip({
        ...trip,
        expenses: trip.expenses.map(e => e.id === expenseId ? { ...e, status: 'settled' } : e)
      });
    });
  };

  const handleUpdateBudget = (memberId: string, amount: number) => {
    demoGuard(() => {
      setTrip({
        ...trip,
        members: trip.members.map(m => m.id === memberId ? { ...m, budget: amount } : m)
      });
    });
  };

  const handleInviteMember = () => {
    const names = ['Chris', 'Taylor', 'Jamie', 'Morgan'];
    const avatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    ];
    const randomIndex = Math.floor(Math.random() * names.length);
    const name = names[randomIndex];
    const newMember: GroupMember = {
      id: `m${trip.members.length + 1}`,
      name,
      avatar: avatars[randomIndex],
      budget: 1000,
      hasVoted: false
    };
    demoGuard(() => {
      setTrip({
        ...trip,
        members: [...trip.members, newMember]
      });
    });
  };

  const handleRemoveMember = (memberId: string) => {
    setTrip({
      ...trip,
      members: trip.members.filter(m => m.id !== memberId),
      expenses: trip.expenses.map(e => ({
        ...e,
        splitWith: e.splitWith.filter(id => id !== memberId)
      })),
      votes: trip.votes.filter(v => v.itemId !== memberId || v.type !== 'kick')
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-[64px] z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-black text-brand tracking-tighter">{trip.name}</h1>
            <div className="flex gap-4">
              <button 
                onClick={() => setView('overview')}
                className={`text-sm font-bold pb-4 border-b-2 transition-colors ${view === 'overview' ? 'border-brand text-brand' : 'border-transparent text-slate-400'}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setView('voting')}
                className={`text-sm font-bold pb-4 border-b-2 transition-colors ${view === 'voting' ? 'border-brand text-brand' : 'border-transparent text-slate-400'}`}
              >
                Voting
              </button>
              <button 
                onClick={() => setView('expenses')}
                className={`text-sm font-bold pb-4 border-b-2 transition-colors ${view === 'expenses' ? 'border-brand text-brand' : 'border-transparent text-slate-400'}`}
              >
                Expenses
              </button>
              <button 
                onClick={() => setView('chat')}
                className={`text-sm font-bold pb-4 border-b-2 transition-colors ${view === 'chat' ? 'border-brand text-brand' : 'border-transparent text-slate-400'}`}
              >
                Chat
              </button>
              <button 
                onClick={() => setView('history')}
                className={`text-sm font-bold pb-4 border-b-2 transition-colors ${view === 'history' ? 'border-brand text-brand' : 'border-transparent text-slate-400'}`}
              >
                History
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {isDemo && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-6"
          >
            <div className="bg-slate-900 text-white p-6 rounded-[32px] shadow-2xl shadow-slate-900/40 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-sm font-black mb-1">Ready to plan your own trip?</h4>
                <p className="text-slate-400 text-xs font-bold leading-relaxed">Save this itinerary and invite up to 20 friends to start voting and splitting costs.</p>
              </div>
              <button 
                onClick={onLogin}
                className="bg-brand text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-light transition-all active:scale-95 shrink-0"
              >
                Create Account
              </button>
            </div>
          </motion.div>
        )}
        <AnimatePresence mode="wait">
          {view === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                      <DollarSign className="w-5 h-5 transition-transform hover:scale-110 cursor-pointer" onClick={() => {
                        const amount = prompt('Enter new budget amount:', trip.members[0].budget.toString());
                        if (amount && !isNaN(Number(amount))) handleUpdateBudget('m1', Number(amount));
                      }} />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Your Budget</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">${totalExpenses.toLocaleString()} <span className="text-slate-300">/ ${trip.members[0].budget.toLocaleString()}</span></h3>
                  <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(100, (totalExpenses / totalBudget) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-green-50 rounded-xl text-green-600">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {trip.members.map(m => (
                        <SafeImage key={m.id} src={m.avatar} className="w-8 h-8 rounded-full border-2 border-white object-cover" title={m.name} alt={m.name} />
                      ))}
                      <div 
                        onClick={() => setShowManageTrip(true)}
                        className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors"
                      >
                        <UserPlus className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="text-lg font-black text-slate-900 ml-2">{trip.members.length} Active</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Activity</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">{trip.votes.length} <span className="text-slate-300 text-lg uppercase">Votes Cast</span></h3>
                  <p className="text-slate-400 text-xs font-bold mt-2">Latest: Jordan voted for Sonoma</p>
                </div>
              </div>

              {/* Settlement Board */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-black text-slate-900">Balances</h2>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Settlement</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {trip.members.map(m => (
                      <div key={m.id} className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <SafeImage src={m.avatar} className="w-12 h-12 rounded-2xl object-cover shadow-sm" alt={m.name} />
                          <div>
                            <p className="font-black text-slate-900 leading-none">{m.name}</p>
                            <p className="text-xs font-bold text-slate-400 mt-1">Budget: ${m.budget}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-black ${balances[m.id] >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {balances[m.id] >= 0 ? `+$${balances[m.id].toFixed(0)}` : `-$${Math.abs(balances[m.id]).toFixed(0)}`}
                          </p>
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                            {balances[m.id] >= 0 ? 'To Receive' : 'To Pay'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-brand rounded-3xl p-8 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 transform translate-x-12 -translate-y-12 rotate-12 opacity-10 group-hover:rotate-45 transition-transform duration-700">
                    <CreditCard className="w-64 h-64" />
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter mb-2">Smart Settle</h2>
                  <p className="text-white/70 font-bold mb-8 max-w-xs text-sm">We've calculated the most efficient way to pay everyone back. Only 3 transactions needed.</p>
                  
                  <div className="space-y-4 relative z-10">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/10">
                      <div className="flex items-center gap-3">
                        <SafeImage src={trip.members[1].avatar} className="w-8 h-8 rounded-lg" alt="Member" />
                        <ArrowRight className="w-4 h-4 text-white/50" />
                        <SafeImage src={trip.members[0].avatar} className="w-8 h-8 rounded-lg" alt="Member" />
                      </div>
                      <div className="text-right">
                        <p className="font-black">$125</p>
                        <p className="text-[10px] font-black text-white/50 uppercase">Pay Jordan</p>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/10">
                      <div className="flex items-center gap-3">
                        <SafeImage src={trip.members[2].avatar} className="w-8 h-8 rounded-lg" alt="Member" />
                        <ArrowRight className="w-4 h-4 text-white/50" />
                        <SafeImage src={trip.members[0].avatar} className="w-8 h-8 rounded-lg" alt="Member" />
                      </div>
                      <div className="text-right">
                        <p className="font-black">$210</p>
                        <p className="text-[10px] font-black text-white/50 uppercase">Pay Sarah</p>
                      </div>
                    </div>
                  </div>

                  <button className="mt-8 w-full bg-white text-brand font-black py-4 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Pay All Debts Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'voting' && (
            <motion.div 
              key="voting"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Event Polling</h2>
                  <p className="text-slate-400 font-bold mt-1 uppercase text-xs tracking-widest">Vote on your favorite tracks & stays</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button 
                    onClick={() => setVotingTab('tracks')}
                    className={`px-6 py-2 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${
                      votingTab === 'tracks' ? 'bg-white shadow-sm text-brand' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Tracks
                  </button>
                  <button 
                    onClick={() => setVotingTab('hotels')}
                    className={`px-6 py-2 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${
                      votingTab === 'hotels' ? 'bg-white shadow-sm text-brand' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Hotels
                  </button>
                </div>
              </div>

              {votingTab === 'tracks' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {TRACKS.slice(0, 6).map(track => {
                    const voteData = trip.votes.find(v => v.itemId === track.id && v.type === 'track');
                    const voteCount = voteData?.votedBy.length || 0;
                    const hasVoted = voteData?.votedBy.includes('m1');

                    return (
                      <motion.div 
                        key={track.id}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col group"
                      >
                        <div className="aspect-video relative">
                          <SafeImage src={track.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={track.name} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4">
                            <p className="text-white text-[10px] font-black uppercase tracking-widest">{track.location}</p>
                            <h3 className="text-white text-xl font-black leading-none mt-1">{track.name}</h3>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex -space-x-2">
                              {voteData?.votedBy.map(voterId => {
                                const member = trip.members.find(m => m.id === voterId);
                                return (
                                  <SafeImage key={voterId} src={member?.avatar} className="w-7 h-7 rounded-full border-2 border-white object-cover" title={member?.name} alt={member?.name} />
                                );
                              })}
                              {voteCount === 0 && <span className="text-[10px] font-bold text-slate-400 uppercase ml-2">No votes yet</span>}
                            </div>
                            <span className="bg-slate-50 text-slate-900 text-[10px] font-black px-2 pb-0.5 pt-1 rounded-sm border border-slate-100 uppercase tracking-widest">
                              {voteCount} Voter{voteCount !== 1 ? 's' : ''}
                            </span>
                          </div>
                          
                          <button 
                            onClick={() => handleVote(track.id, 'track')}
                            className={`mt-auto w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all ${
                              hasVoted 
                                ? 'bg-brand text-white shadow-lg shadow-brand/20' 
                                : 'bg-slate-50 text-slate-400 hover:bg-brand/5 hover:text-brand border border-slate-100'
                            }`}
                          >
                            <VoteIcon className="w-4 h-4" />
                            {hasVoted ? 'Voted' : 'Vote Track'}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {HOTELS.slice(0, 9).map(hotel => {
                    const voteData = trip.votes.find(v => v.itemId === hotel.id && v.type === 'hotel');
                    const voteCount = voteData?.votedBy.length || 0;
                    const hasVoted = voteData?.votedBy.includes('m1');
                    const trackObj = TRACKS.find(t => t.id === hotel.trackId);

                    return (
                      <motion.div 
                        key={hotel.id}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col group"
                      >
                        <div className="aspect-video relative">
                          <SafeImage src={hotel.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={hotel.name} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                            <div>
                              <p className="text-white/80 text-[10px] font-black uppercase tracking-widest">{trackObj?.name || 'Track Lodging'}</p>
                              <h3 className="text-white text-lg font-black leading-tight mt-0.5 truncate">{hotel.name}</h3>
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-white font-black text-xs shrink-0">
                              ${hotel.pricePerNight}<span className="text-[10px] font-normal text-white/80">/nt</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex -space-x-2">
                              {voteData?.votedBy.map(voterId => {
                                const member = trip.members.find(m => m.id === voterId);
                                return (
                                  <SafeImage key={voterId} src={member?.avatar} className="w-7 h-7 rounded-full border-2 border-white object-cover" title={member?.name} alt={member?.name} />
                                );
                              })}
                              {voteCount === 0 && <span className="text-[10px] font-bold text-slate-400 uppercase ml-2">No votes yet</span>}
                            </div>
                            <span className="bg-slate-50 text-slate-900 text-[10px] font-black px-2 pb-0.5 pt-1 rounded-sm border border-slate-100 uppercase tracking-widest">
                              {voteCount} Voter{voteCount !== 1 ? 's' : ''}
                            </span>
                          </div>
                          
                          <button 
                            onClick={() => handleVote(hotel.id, 'hotel')}
                            className={`mt-auto w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all ${
                              hasVoted 
                                ? 'bg-brand text-white shadow-lg shadow-brand/20' 
                                : 'bg-slate-50 text-slate-400 hover:bg-brand/5 hover:text-brand border border-slate-100'
                            }`}
                          >
                            <VoteIcon className="w-4 h-4" />
                            {hasVoted ? 'Voted' : 'Vote Hotel'}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {view === 'chat' && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-[calc(100vh-280px)] min-h-[500px] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand rounded-xl text-white">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-black text-slate-900 leading-none">Trip Discussion</h2>
                    <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mt-1">4 People Online</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Message Feed */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30 scroll-smooth"
              >
                {trip.messages.map((message, index) => {
                  const sender = trip.members.find(m => m.id === message.senderId);
                  const isMe = message.senderId === 'm1';
                  const showAvatar = index === 0 || trip.messages[index - 1].senderId !== message.senderId;

                  if (message.type === 'system') {
                    return (
                      <div key={message.id} className="flex justify-center my-6">
                        <span className="bg-slate-200/50 text-slate-500 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                          {message.text}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div key={message.id} className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
                      {!isMe && (
                        <div className="w-8 h-8 flex-shrink-0">
                          {showAvatar ? (
                            <SafeImage src={sender?.avatar} className="w-8 h-8 rounded-full border border-slate-200" alt={sender?.name} />
                          ) : <div className="w-8" />}
                        </div>
                      )}
                      
                      <div className={`max-w-[70%] group`}>
                        {showAvatar && !isMe && (
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3 mb-1">{sender?.name}</p>
                        )}
                        <div className={`p-4 rounded-2xl text-sm font-bold shadow-sm ${
                          isMe 
                            ? 'bg-brand text-white rounded-br-none' 
                            : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                        }`}>
                          {message.text}
                        </div>
                        <p className={`text-[9px] font-bold text-slate-300 mt-1 uppercase ${isMe ? 'text-right mr-1' : 'ml-1'}`}>
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Typing Indicator Pin */}
              <div className="px-6 py-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Sarah is typing</span>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-slate-100">
                <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                  <button type="button" className="p-3 text-slate-400 hover:text-brand transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                  <input 
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Message the group..."
                    className="flex-1 bg-slate-50 border border-transparent focus:border-brand/20 focus:bg-white px-6 py-4 rounded-2xl text-sm font-bold outline-none transition-all placeholder:text-slate-300"
                  />
                  <button 
                    type="submit"
                    disabled={!chatInput.trim()}
                    className={`p-4 rounded-2xl transition-all ${
                      chatInput.trim() 
                        ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-100' 
                        : 'bg-slate-100 text-slate-300 scale-95 opacity-50'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {view === 'history' && (
            <motion.div 
              key="history"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Trip History</h2>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Past adventures & archived stats</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {MOCK_TRIPS_HISTORY.map(oldTrip => (
                  <div key={oldTrip.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group hover:border-brand/30 transition-all">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black text-brand bg-brand/5 px-2 py-1 rounded-md uppercase tracking-widest mb-2 inline-block">
                          {oldTrip.date}
                        </span>
                        <h3 className="text-xl font-black text-slate-900">{oldTrip.name}</h3>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-xl">
                        <History className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {oldTrip.members.map(m => (
                            <SafeImage key={m.id} src={m.avatar} className="w-8 h-8 rounded-full border-2 border-white object-cover" title={m.name} alt={m.name} />
                          ))}
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Spent</p>
                          <p className="text-lg font-black text-slate-900">
                            ${oldTrip.expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <MapPin className="w-4 h-4 text-slate-400" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Routes Covered</p>
                            <p className="text-xs font-bold text-slate-700">Thunderhill Raceway • Sonoma</p>
                          </div>
                        </div>
                        <button className="text-brand hover:scale-110 transition-transform">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-50/50 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Fully Settled</span>
                      </div>
                      <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-brand transition-colors">
                        View Summary
                      </button>
                    </div>
                  </div>
                ))}

                {/* Empty State / Add past trip */}
                <div className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/30 group hover:border-brand/20 transition-all cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">Archive a Trip</h3>
                  <p className="text-slate-400 text-sm font-bold mt-1 max-w-[200px]">Import results from a manually organized track day</p>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'expenses' && (
            <motion.div 
              key="expenses"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Shared Expenses</h2>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Receipts & Debt Management</p>
                </div>
                <button 
                  onClick={() => setShowAddExpense(true)}
                  className="bg-brand text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand/20"
                >
                  <Plus className="w-5 h-5" />
                  Add Receipt
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Expense</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Paid By</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Split With</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold text-sm">
                      {trip.expenses.map(expense => {
                        const payer = trip.members.find(m => m.id === expense.paidBy);
                        return (
                          <tr key={expense.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-6">
                              <div className="flex items-center gap-3 text-slate-900">
                                <div className="p-2 bg-slate-100 rounded-lg">
                                  <Receipt className="w-4 h-4 text-slate-400" />
                                </div>
                                <div>
                                  <p className="font-black">{expense.description}</p>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{new Date(expense.date).toLocaleDateString()}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-6">
                              <div className="flex items-center gap-2">
                                <SafeImage src={payer?.avatar} className="w-6 h-6 rounded-full" alt={payer?.name} />
                                <span className="text-slate-600">{payer?.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-6 font-black text-slate-900 text-lg">${expense.amount}</td>
                            <td className="px-6 py-6">
                              <div className="flex -space-x-1">
                                {expense.splitWith.map(sid => (
                                  <SafeImage key={sid} src={trip.members.find(m => m.id === sid)?.avatar} className="w-5 h-5 rounded-full border border-white" alt="Member" />
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-6 text-right">
                              {expense.status === 'settled' ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                                  <CheckCircle2 className="w-3 h-3" /> Settled
                                </span>
                              ) : (
                                <button 
                                  onClick={() => handlePayDebt(expense.id)}
                                  className="text-[10px] font-black text-brand uppercase tracking-widest hover:underline"
                                >
                                  Mark as Paid
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Member Status */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white border border-slate-200 px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 z-40">
        <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
          <Clock className="w-4 h-4 text-orange-500" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting Votes:</span>
          <div className="flex -space-x-1">
            {trip.members.filter(m => !m.hasVoted).map(m => (
              <SafeImage key={m.id} src={m.avatar} className="w-5 h-5 rounded-full border border-white opacity-50 grayscale" title={m.name} alt={m.name} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-brand" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Planning:</span>
          <span className="text-[10px] font-bold text-brand uppercase animate-pulse">Sarah is typing...</span>
        </div>
      </div>
      
      {/* Add Expense Modal */}
      <AnimatePresence>
        {showAddExpense && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddExpense(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 overflow-hidden"
            >
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-2xl font-black text-slate-900">Add Expense</h3>
                 <button onClick={() => setShowAddExpense(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                   <X className="w-5 h-5" />
                 </button>
               </div>

               <form onSubmit={handleAddExpense} className="space-y-4">
                 <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Description</label>
                   <input 
                    required
                    type="text" 
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    placeholder="e.g. Lunch at track" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand/20 font-bold"
                   />
                 </div>
                 <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Amount ($)</label>
                   <input 
                    required
                    type="number" 
                    value={newExpense.amount || ''}
                    onChange={(e) => setNewExpense({...newExpense, amount: Number(e.target.value)})}
                    placeholder="0.00" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand/20 font-bold"
                   />
                 </div>
                 <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Paid By</label>
                   <select 
                    value={newExpense.paidBy}
                    onChange={(e) => setNewExpense({...newExpense, paidBy: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand/20 font-bold appearance-none"
                   >
                     {trip.members.map(m => (
                       <option key={m.id} value={m.id}>{m.name}</option>
                     ))}
                   </select>
                 </div>
                 
                 <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Split With</label>
                   <div className="grid grid-cols-2 gap-2">
                     {trip.members.map(m => {
                       const isSelected = newExpense.splitWith.includes(m.id);
                       return (
                         <button
                           key={m.id}
                           type="button"
                           onClick={() => {
                             if (isSelected) {
                               setNewExpense({
                                 ...newExpense,
                                 splitWith: newExpense.splitWith.filter(id => id !== m.id)
                               });
                             } else {
                               setNewExpense({
                                 ...newExpense,
                                 splitWith: [...newExpense.splitWith, m.id]
                               });
                             }
                           }}
                           className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                             isSelected 
                               ? 'bg-brand/5 border-brand text-brand' 
                               : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                           }`}
                         >
                           <SafeImage src={m.avatar} className={`w-6 h-6 rounded-lg ${isSelected ? '' : 'grayscale'}`} alt={m.name} />
                           <span className="text-[10px] font-bold truncate">{m.name}</span>
                         </button>
                       );
                     })}
                   </div>
                   {newExpense.splitWith.length === 0 && (
                     <p className="text-[9px] font-bold text-red-500 mt-1 uppercase tracking-wider">Select at least one person</p>
                   )}
                 </div>
                 
                 <div className="pt-4">
                   <button 
                    type="submit" 
                    disabled={newExpense.splitWith.length === 0}
                    className="w-full bg-brand text-white py-4 rounded-2xl font-black shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                   >
                     Log Expense
                   </button>
                 </div>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manage Trip Modal */}
      <AnimatePresence>
        {showManageTrip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowManageTrip(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                 <div>
                   <h3 className="text-2xl font-black text-slate-900">Manage Group</h3>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Members & Administration</p>
                 </div>
                 <button onClick={() => setShowManageTrip(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                   <X className="w-5 h-5" />
                 </button>
              </div>

              <div className="space-y-6">
                {/* Invite Section */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Add New Pilot</h4>
                  <div className="flex gap-4">
                    <input 
                      disabled
                      type="text" 
                      placeholder="Share invite link..." 
                      value="https://trackday.app/join/t1-2394"
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-400 opacity-50"
                    />
                    <button 
                      onClick={handleInviteMember}
                      className="bg-brand text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest"
                    >
                      Instant Add
                    </button>
                  </div>
                </div>

                {/* Member List */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest px-2">Member List</h4>
                  {trip.members.map(member => {
                    const isMe = member.id === 'm1';
                    const kickVotes = trip.votes.find(v => v.type === 'kick' && v.itemId === member.id);
                    const voteCount = kickVotes?.votedBy.length || 0;
                    const threshold = Math.ceil(trip.members.length / 2);

                    return (
                      <div key={member.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl group hover:border-brand/20 transition-all shadow-sm">
                        <div className="flex items-center gap-3">
                          <SafeImage src={member.avatar} className="w-10 h-10 rounded-xl" alt={member.name} />
                          <div>
                            <p className="text-sm font-black text-slate-900">{member.name} {isMe && '(You)'}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">${member.budget} Budget</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {isMe ? (
                            <button 
                              onClick={() => {
                                if(confirm('Are you sure you want to leave this trip?')) {
                                  // In a real app we'd navigate away
                                  alert('You left the group!');
                                  setShowManageTrip(false);
                                }
                              }}
                              className="text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
                            >
                              Leave Trip
                            </button>
                          ) : (
                            <div className="flex flex-col items-end gap-1">
                              <button 
                                onClick={() => handleVote(member.id, 'kick')}
                                className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${
                                  kickVotes?.votedBy.includes('m1') 
                                    ? 'bg-orange-500 text-white' 
                                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                                }`}
                              >
                                {kickVotes?.votedBy.includes('m1') ? 'Voted to Kick' : 'Vote to Kick'}
                              </button>
                              {voteCount > 0 && (
                                <p className="text-[8px] font-black text-orange-500 uppercase">
                                  {voteCount}/{threshold} votes to kick
                                  {voteCount >= threshold && (
                                    <button 
                                      onClick={() => handleRemoveMember(member.id)}
                                      className="ml-2 text-red-500 underline"
                                    >
                                      Finalize
                                    </button>
                                  )}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
