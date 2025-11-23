import React from 'react';
import { Appointment, AppointmentStatus, User } from '../types';
import { Calendar, Clock, MapPin, FileText, MessageCircle, Check, X as XIcon, Headphones, Phone, AlertCircle, Paperclip } from 'lucide-react';

interface PatientDashboardProps {
  user: User;
  appointments: Appointment[];
  clinics: any[]; // simplified for demo
  onCancel: (id: string) => void;
  onChat: (id: string) => void;
  onContactSupport: () => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ 
  user, 
  appointments, 
  clinics, 
  onCancel, 
  onChat,
  onContactSupport 
}) => {
  const myAppointments = appointments.filter(a => a.patientId === user.id);

  const getStatusColor = (status: AppointmentStatus) => {
    switch(status) {
      case AppointmentStatus.CONFIRMED: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case AppointmentStatus.PENDING: return 'bg-amber-100 text-amber-700 border-amber-200';
      case AppointmentStatus.COMPLETED: return 'bg-slate-100 text-slate-600 border-slate-200';
      case AppointmentStatus.CANCELLED: return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-end">
        <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Welcome back, <span className="gradient-text">{user.name}</span></h1>
            <p className="text-slate-500 mt-2 font-light text-lg">Manage your upcoming treatment sessions and medical records.</p>
        </div>
        <button 
            onClick={onContactSupport}
            className="mt-6 md:mt-0 flex items-center text-sm font-bold text-medical-blue hover:text-white bg-white border border-blue-100 px-5 py-3 rounded-xl hover:bg-medical-blue transition-all shadow-md hover:shadow-lg"
        >
            <Headphones className="h-4 w-4 mr-2" />
            24/7 Patient Support
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Appointments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-bold text-slate-800 flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-medical-blue" />
                Your Appointments
             </h2>
             {myAppointments.length > 0 && (
                 <span className="text-xs font-bold bg-white text-slate-500 px-3 py-1 rounded-full border border-slate-200 shadow-sm">{myAppointments.length} Total</span>
             )}
          </div>

          {myAppointments.length === 0 ? (
            <div className="glass-panel p-12 rounded-[2rem] text-center bg-white/60">
              <div className="mx-auto h-20 w-20 text-slate-400 mb-6 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                <Calendar className="h-10 w-10" />
              </div>
              <h3 className="text-slate-900 font-bold text-xl">No appointments yet</h3>
              <p className="text-slate-500 mt-2 mb-8 max-w-xs mx-auto">Book your first dialysis or transfusion session at a verified center near you.</p>
              <a href="#/" className="inline-flex items-center px-6 py-3 bg-gradient-primary text-white rounded-xl hover:shadow-lg shadow-md transition-all text-sm font-bold">
                  Find a Center
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {myAppointments.map(apt => {
                const clinic = clinics.find(c => c.id === apt.clinicId);
                return (
                  <div key={apt.id} className="glass-card p-6 rounded-3xl group hover:border-blue-300 transition-all duration-300 bg-white">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                      <div>
                        <h3 className="font-bold text-slate-800 text-xl group-hover:text-medical-blue transition-colors">{clinic?.name}</h3>
                        <div className="flex items-center text-sm text-slate-500 mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                          {clinic?.city}, {clinic?.state}
                        </div>
                      </div>
                      <span className={`mt-3 sm:mt-0 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-5">
                      <div className="flex items-center text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <Calendar className="h-4 w-4 mr-3 text-medical-blue" />
                        <span className="text-slate-400 mr-2">Date:</span>
                        <span className="font-semibold text-slate-800">{new Date(apt.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <Clock className="h-4 w-4 mr-3 text-medical-blue" />
                        <span className="text-slate-400 mr-2">Time:</span>
                        <span className="font-semibold text-slate-800">{apt.timeSlot}</span>
                      </div>
                    </div>

                    {apt.documentName && (
                      <div className="mb-4 flex items-center text-xs text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                        <Paperclip className="h-3.5 w-3.5 mr-2 text-emerald-500" />
                        Uploaded: <span className="font-bold ml-1">{apt.documentName}</span>
                      </div>
                    )}

                    {apt.medicalReportSummary && (
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mb-5">
                        <div className="flex items-center text-blue-700 font-bold text-xs uppercase mb-2">
                           <FileText className="h-3 w-3 mr-1.5" /> AI Clinical Summary
                        </div>
                        <p className="text-sm text-blue-800/80 leading-relaxed font-light">{apt.medicalReportSummary}</p>
                      </div>
                    )}

                    {apt.status !== AppointmentStatus.CANCELLED && (
                        <div className="pt-4 border-t border-slate-100 flex flex-wrap justify-end gap-3">
                        {apt.status !== AppointmentStatus.COMPLETED && (
                            <button 
                            onClick={() => onChat(apt.id)}
                            className="text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-sm font-medium flex items-center px-4 py-2 rounded-xl border border-transparent transition-all"
                            >
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Chat
                            </button>
                        )}
                        {apt.status === AppointmentStatus.PENDING && (
                            <button 
                            onClick={() => onCancel(apt.id)}
                            className="text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-sm font-medium flex items-center px-4 py-2 rounded-xl transition-all"
                            >
                                <XIcon className="h-4 w-4 mr-2" />
                                Cancel
                            </button>
                        )}
                        {apt.status === AppointmentStatus.CONFIRMED && (
                             <div className="flex items-center text-emerald-700 text-sm font-bold bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                                <Check className="h-4 w-4 mr-2" />
                                Confirmed
                             </div>
                        )}
                        </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Medical Documents */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-[2rem] bg-white">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-medical-blue" />
                Records
                </h2>
                <button className="text-medical-blue text-sm hover:text-blue-700 transition-colors">View All</button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer group">
                <div className="flex items-center overflow-hidden">
                  <div className="h-10 w-10 bg-rose-100 text-rose-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-[10px] font-bold">PDF</span>
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-bold text-slate-700 truncate group-hover:text-medical-blue transition-colors">Kidney_Function_Test.pdf</p>
                    <p className="text-xs text-slate-400 mt-0.5">Uploaded 2 days ago</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer group">
                <div className="flex items-center overflow-hidden">
                  <div className="h-10 w-10 bg-blue-100 text-blue-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-[10px] font-bold">IMG</span>
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-bold text-slate-700 truncate group-hover:text-medical-blue transition-colors">Prescription_Jan2025.jpg</p>
                    <p className="text-xs text-slate-400 mt-0.5">Uploaded 1 week ago</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-blue-300 transition-all text-slate-400 hover:text-medical-blue mt-2">
                 <span className="text-sm font-bold">+ Upload New Document</span>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-medical-blue to-blue-600 p-6 rounded-[2rem] text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-white opacity-20 rounded-full blur-2xl"></div>
            <div className="flex items-center mb-4 relative z-10">
               <AlertCircle className="h-6 w-6 mr-2 text-white" />
               <h3 className="font-bold text-lg">Emergency?</h3>
            </div>
            <p className="text-blue-50 text-sm mb-6 relative z-10 font-medium">Our support team can help you find the nearest available center immediately.</p>
            <button 
              onClick={onContactSupport}
              className="w-full bg-white text-medical-blue py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg flex items-center justify-center relative z-10"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;