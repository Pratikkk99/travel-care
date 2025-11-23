import React, { useState } from 'react';
import { Search, MapPin, Shield, Clock, Activity, Sparkles, Star } from 'lucide-react';
import { smartSearchQuery } from '../services/geminiService';

interface HomeProps {
  onSearch: (filters: { city?: string; type?: string }) => void;
}

const Home: React.FC<HomeProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    
    // Use Gemini AI to understand the query
    const result = await smartSearchQuery(query);
    
    setIsSearching(false);
    onSearch({ city: result.city || query, type: result.type });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20">
        {/* Animated background elements (Light) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-[80px] animate-pulse"></div>
           <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-[100px] animate-blob"></div>
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-100 bg-white/50 backdrop-blur-md text-medical-blue text-sm font-semibold mb-8 animate-fade-in shadow-sm">
            <Sparkles className="h-4 w-4 mr-2 fill-current" />
            Travel with peace of mind
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight animate-fade-in animation-delay-100 text-slate-900">
            Trusted Healthcare,<br />
            <span className="gradient-text animate-glow">Wherever You Go.</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 font-light animate-fade-in animation-delay-200">
            Find and book verified dialysis and thalassemia support centers across India. 
            Seamlessly connect with healthcare providers while you travel.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl mx-auto animate-fade-in animation-delay-300 relative z-30">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-slate-400 group-focus-within:text-medical-blue transition-colors" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-14 pr-32 py-5 rounded-[2rem] bg-white border border-slate-200 text-lg shadow-xl shadow-blue-500/5 focus:ring-4 focus:ring-blue-100 focus:border-medical-blue transition-all placeholder:text-slate-400 text-slate-800"
                placeholder="Try 'Dialysis in Goa next week'..."
              />
              <button 
                type="submit"
                disabled={isSearching}
                className="absolute right-2 top-2 bottom-2 bg-gradient-primary hover:bg-gradient-accent text-white px-8 rounded-[1.7rem] font-bold transition-all flex items-center shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSearching ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Search'
                )}
              </button>
            </form>
            
            {/* Quick Tags */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-white/50 border border-slate-200 text-xs text-slate-500 hover:text-medical-blue hover:bg-white hover:border-medical-blue cursor-pointer transition-all shadow-sm">Bangalore</span>
                <span className="px-3 py-1 rounded-lg bg-white/50 border border-slate-200 text-xs text-slate-500 hover:text-medical-blue hover:bg-white hover:border-medical-blue cursor-pointer transition-all shadow-sm">Mumbai</span>
                <span className="px-3 py-1 rounded-lg bg-white/50 border border-slate-200 text-xs text-slate-500 hover:text-medical-blue hover:bg-white hover:border-medical-blue cursor-pointer transition-all shadow-sm">Hemodialysis</span>
                <span className="px-3 py-1 rounded-lg bg-white/50 border border-slate-200 text-xs text-slate-500 hover:text-medical-blue hover:bg-white hover:border-medical-blue cursor-pointer transition-all shadow-sm">Thalassemia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose <span className="text-medical-accent">TravelCare?</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">We ensure your medical needs are met with the highest standards, no matter where your journey takes you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                color: 'text-medical-blue',
                bg: 'bg-blue-50',
                title: 'Nationwide Network',
                desc: 'Access a vast network of clinics in Tier 1 & 2 cities, strategically located near major tourist hubs.'
              },
              {
                icon: Shield,
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
                title: 'Verified Providers',
                desc: 'Every facility is rigorously vetted for hygiene, equipment quality, and medical certification.'
              },
              {
                icon: Activity,
                color: 'text-rose-500',
                bg: 'bg-rose-50',
                title: 'Seamless Booking',
                desc: 'Upload reports, book slots, and chat with doctors instantly through our secure platform.'
              }
            ].map((feature, idx) => (
              <div key={idx} className="glass-card p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center group">
                <div className={`h-20 w-20 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;