import React from 'react';
import { Star, MapPin, CheckCircle, Banknote, ArrowRight } from 'lucide-react';
import { Clinic } from '../types';

interface ClinicCardProps {
  clinic: Clinic;
  onBook: (clinic: Clinic) => void;
}

const ClinicCard: React.FC<ClinicCardProps> = ({ clinic, onBook }) => {
  return (
    <div className="glass-card rounded-[2rem] overflow-hidden flex flex-col h-full transition-all duration-500 group">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10"></div>
        <img 
          src={clinic.imageUrl} 
          alt={clinic.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-20">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm border ${
              clinic.type === 'Dialysis' 
                ? 'bg-blue-100/90 text-blue-700 border-blue-200' 
                : 'bg-rose-100/90 text-rose-700 border-rose-200'
            }`}>
              {clinic.type}
            </span>
        </div>
        <div className="absolute bottom-4 left-4 z-20">
             {clinic.verified && (
                <div className="flex items-center bg-emerald-100/90 backdrop-blur-md border border-emerald-200 px-2 py-1 rounded-lg">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600 mr-1.5" />
                    <span className="text-xs font-medium text-emerald-800">Verified</span>
                </div>
            )}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative bg-white/50">
        <div className="mb-2">
          <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-medical-blue transition-colors">{clinic.name}</h3>
        </div>
        
        <div className="flex items-center mb-4 text-sm text-slate-500">
          <MapPin className="h-4 w-4 mr-1.5 text-medical-blue" />
          <span className="truncate">{clinic.city}, {clinic.state}</span>
        </div>

        <p className="text-sm text-slate-600 mb-6 line-clamp-2 flex-grow leading-relaxed font-light">
          {clinic.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <div className="flex flex-col">
            <div className="flex items-center text-amber-500 mb-1">
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-1.5 text-sm font-bold text-slate-800">{clinic.rating}</span>
              <span className="ml-1 text-xs text-slate-400">({clinic.reviewCount})</span>
            </div>
             <div className="flex items-center text-slate-700 font-medium">
              <Banknote className="h-4 w-4 mr-1.5 text-emerald-600" />
              <span>₹{clinic.pricePerSession}<span className="text-xs font-normal text-slate-400 ml-1">/session</span></span>
            </div>
          </div>
          
          <button 
            onClick={() => onBook(clinic)}
            className="group/btn relative px-5 py-2.5 rounded-xl bg-slate-50 hover:bg-gradient-primary border border-slate-200 hover:border-transparent overflow-hidden transition-all duration-300 shadow-sm"
          >
             <span className="relative z-10 flex items-center text-sm font-bold text-slate-600 group-hover/btn:text-white transition-colors">
                 Book
                 <ArrowRight className="h-4 w-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
             </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClinicCard;