import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  Square, 
  ChevronRight, 
  ShieldAlert, 
  Wrench, 
  Package, 
  User, 
  MapPin,
  ChevronLeft,
  Plus,
  Trash2,
  Car,
  Bike,
  RotateCcw
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  target?: 'car' | 'motorcycle' | 'both';
}

const INITIAL_CHECKLIST: ChecklistItem[] = [
  // Safety & Gear
  { id: '1', category: 'Safety & Gear', text: 'Full face helmet (Snell SA2015+ or newer)', completed: false, priority: 'high', target: 'both' },
  { id: '2', category: 'Safety & Gear', text: 'Flame retardant suit or thick leather one-piece', completed: false, priority: 'high', target: 'both' },
  { id: '3', category: 'Safety & Gear', text: 'Closed-toe shoes (paddock or racing boots)', completed: false, priority: 'high', target: 'both' },
  { id: '4', category: 'Safety & Gear', text: 'Racing gloves and balaclava', completed: false, priority: 'medium', target: 'both' },
  { id: 'm1', category: 'Safety & Gear', text: 'Back protector (CE Level 2)', completed: false, priority: 'high', target: 'motorcycle' },
  
  // Vehicle Prep
  { id: '5', category: 'Vehicle Prep', text: 'Check brake fluid levels and age (< 6 months)', completed: false, priority: 'high', target: 'both' },
  { id: '6', category: 'Vehicle Prep', text: 'Minimum 50% brake pad life remaining', completed: false, priority: 'high', target: 'both' },
  { id: '7', category: 'Vehicle Prep', text: 'Torque wheel lug nuts to factory spec', completed: false, priority: 'high', target: 'car' },
  { id: 'm2', category: 'Vehicle Prep', text: 'Check chain tension and lubrication', completed: false, priority: 'high', target: 'motorcycle' },
  { id: '8', category: 'Vehicle Prep', text: 'Check tire pressures (cold spec)', completed: false, priority: 'medium', target: 'both' },
  { id: '9', category: 'Vehicle Prep', text: 'Ensure no active fluid leaks (oil, coolant, brake)', completed: false, priority: 'high', target: 'both' },
  
  // Documentation
  { id: '10', category: 'Documentation', text: 'Printed tech inspection form', completed: false, priority: 'high', target: 'both' },
  { id: '11', category: 'Documentation', text: 'Valid driver\'s license', completed: false, priority: 'high', target: 'both' },
  { id: '12', category: 'Documentation', text: 'Track day insurance documentation', completed: false, priority: 'medium', target: 'both' },
  
  // Paddock Supplies
  { id: '13', category: 'Paddock Supplies', text: 'Tire pressure gauge', completed: false, priority: 'high', target: 'both' },
  { id: '14', category: 'Paddock Supplies', text: 'Torque wrench and basic socket set', completed: false, priority: 'medium', target: 'both' },
  { id: '15', category: 'Paddock Supplies', text: 'Folding chair and pop-up canopy', completed: false, priority: 'medium', target: 'both' },
  { id: '16', category: 'Paddock Supplies', text: 'Sunscreen and plenty of water', completed: false, priority: 'high', target: 'both' },
];

export const ChecklistPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [items, setItems] = React.useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('track_checklist');
    return saved ? JSON.parse(saved) : INITIAL_CHECKLIST;
  });

  const [filter, setFilter] = React.useState<'all' | 'car' | 'motorcycle'>('all');
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newItem, setNewItem] = React.useState<Partial<ChecklistItem>>({
    category: 'Safety & Gear',
    text: '',
    priority: 'medium',
    target: 'both'
  });

  React.useEffect(() => {
    localStorage.setItem('track_checklist', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.text) return;
    
    const id = Math.random().toString(36).substr(2, 9);
    const item: ChecklistItem = {
      id,
      category: newItem.category || 'Safety & Gear',
      text: newItem.text,
      completed: false,
      priority: newItem.priority as any || 'medium',
      target: newItem.target as any || 'both'
    };
    
    setItems([...items, item]);
    setNewItem({ ...newItem, text: '' });
    setShowAddForm(false);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const resetList = () => {
    if (confirm('Reset checklist to defaults? Your custom items will be lost.')) {
      setItems(INITIAL_CHECKLIST);
    }
  };

  const visibleItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.target === filter || item.target === 'both';
  });

  const categories = Array.from(new Set(visibleItems.map(i => i.category)));
  const completedCount = visibleItems.filter(i => i.completed).length;
  const progress = visibleItems.length > 0 ? Math.round((completedCount / visibleItems.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-brand font-bold text-sm transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Your Progress</span>
              <span className="text-sm font-black text-slate-900">{completedCount} of {items.length} items</span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-slate-100 flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle 
                  cx="24" cy="24" r="20" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  className="text-brand"
                  strokeDasharray={2 * Math.PI * 20}
                  strokeDashoffset={2 * Math.PI * 20 * (1 - progress / 100)}
                />
              </svg>
              <span className="text-[10px] font-black">{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      <header className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4 uppercase italic">Track Day Essentials</h1>
        <p className="text-slate-500 font-bold max-w-lg mx-auto mb-8">
          Crucial safety checks and gear to ensure you have a successful and safe session on the asphalt.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex bg-slate-200 p-1 rounded-2xl">
            {(['all', 'car', 'motorcycle'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === f 
                  ? 'bg-white text-brand shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-brand text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-brand-light transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Item
            </button>
            <button 
              onClick={resetList}
              className="bg-white text-slate-500 px-4 py-2 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        {showAddForm && (
          <motion.form 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={addItem}
            className="max-w-xl mx-auto bg-white p-6 rounded-3xl border border-slate-200 shadow-xl mb-12 text-left space-y-4"
          >
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Item Name</label>
              <input 
                type="text" 
                value={newItem.text}
                onChange={e => setNewItem({...newItem, text: e.target.value})}
                placeholder="e.g. Check coolant level"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Category</label>
                <select 
                  value={newItem.category}
                  onChange={e => setNewItem({...newItem, category: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none"
                >
                  <option>Safety & Gear</option>
                  <option>Vehicle Prep</option>
                  <option>Documentation</option>
                  <option>Paddock Supplies</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Target Vehicle</label>
                <select 
                  value={newItem.target}
                  onChange={e => setNewItem({...newItem, target: e.target.value as any})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none"
                >
                  <option value="both">Both</option>
                  <option value="car">Car</option>
                  <option value="motorcycle">Motorcycle</option>
                </select>
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-slate-900 text-white font-black uppercase text-xs tracking-widest py-4 rounded-xl hover:bg-slate-800 transition-all"
            >
              Add to Checklist
            </button>
          </motion.form>
        )}
      </header>

      <div className="max-w-3xl mx-auto px-6 space-y-12">
        {categories.map(category => (
          <section key={category} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
                {category === 'Safety & Gear' && <ShieldAlert className="w-4 h-4" />}
                {category === 'Vehicle Prep' && <Wrench className="w-4 h-4" />}
                {category === 'Documentation' && <Package className="w-4 h-4" />}
                {category === 'Paddock Supplies' && <MapPin className="w-4 h-4" />}
              </div>
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">{category}</h2>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              {visibleItems.filter(i => i.category === category).map((item, idx, arr) => (
                <div 
                  key={item.id}
                  className={`p-5 flex items-center justify-between group transition-all hover:bg-slate-50 ${
                    idx !== arr.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <div 
                    className="flex items-center gap-4 cursor-pointer flex-1"
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      item.completed 
                      ? 'bg-brand border-brand text-white' 
                      : 'border-slate-200 text-transparent group-hover:border-slate-400'
                    }`}>
                      <Check className="w-4 h-4 stroke-[3px]" />
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold transition-all ${
                        item.completed ? 'text-slate-400 line-through' : 'text-slate-700'
                      }`}>
                        {item.text}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        {item.target !== 'both' && (
                          <span className={`flex items-center gap-1 text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded-md ${
                            item.target === 'car' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                          }`}>
                            {item.target === 'car' ? <Car className="w-2 h-2" /> : <Bike className="w-2 h-2" />}
                            {item.target}
                          </span>
                        )}
                        {item.priority === 'high' && !item.completed && (
                          <span className="text-[8px] font-black bg-red-100 text-red-600 px-1.5 py-0.5 rounded-md uppercase tracking-tighter">Crucial</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-16 text-center pb-20">
        <div className="bg-slate-900 text-white rounded-[40px] p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] -mr-32 -mt-32" />
          <h3 className="text-xl font-black mb-2 italic uppercase">Rookie Tip</h3>
          <p className="text-slate-400 text-sm font-bold leading-relaxed max-w-lg mx-auto">
            Always arrive at the track with a full tank of gas and check your lug nuts after your first 20-minute session once and then after the wheels have cooled down.
          </p>
        </div>
      </div>
    </div>
  );
};
