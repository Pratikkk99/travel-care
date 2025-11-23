import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Appointment, AppointmentStatus, User } from '../types';
import { CheckCircle, Clock, Calendar, AlertCircle, Plus, Settings, User as UserIcon, Check, X } from 'lucide-react';

interface ProviderDashboardProps {
  user: User;
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
  onManageSchedule: () => void;
  onAddWalkIn: () => void;
}

const data = [
  { name: 'Mon', sessions: 4 },
  { name: 'Tue', sessions: 7 },
  { name: 'Wed', sessions: 5 },
  { name: 'Thu', sessions: 8 },
  { name: 'Fri', sessions: 12 },
  { name: 'Sat', sessions: 15 },
  { name: 'Sun', sessions: 10 },
];

const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ 
  user, 
  appointments, 
  onUpdateStatus,
  onManageSchedule,
  onAddWalkIn
}) => {
  const pendingAppointments = appointments.filter(a => a.status === AppointmentStatus.PENDING);
  const confirmedToday = appointments.filter(a => a.status === AppointmentStatus.CONFIRMED); // Simplified

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Provider Dashboard</h1>
          <p className="text-slate-500 mt-2 font-light">Manage appointments, schedules, and patient records.</p>
        </div>
        <div className="flex space-x-3 mt-6 md:mt-0">
           <button 
             onClick={onManageSchedule}
             className="bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-xl text-sm font-bold shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex items-center"
           >
             <Settings className="h-4 w-4 mr-2 text-slate-500" />
             Schedule
           </button>
           <button 
             onClick={onAddWalkIn}
             className="bg-gradient-primary hover:opacity-90 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 flex items-center transition-all"
           >
             <Plus className="h-4 w-4 mr-2" />
             New Walk-in
           </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="glass-card p-6 rounded-3xl hover:-translate-y-1 transition-transform bg-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Bookings</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">128</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-sm">
             <span className="text-emerald-600 font-bold flex items-center mr-2">↑ 12%</span>
             <span className="text-slate-400">vs last month</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl hover:-translate-y-1 transition-transform bg-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Requests</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{pendingAppointments.length}</h3>
            </div>
            <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl border border-amber-100 relative">
              <Clock className="h-6 w-6" />
              {pendingAppointments.length > 0 && <span className="absolute top-0 right-0 -mt-1 -mr-1 h-3 w-3 bg-rose-500 rounded-full animate-pulse"></span>}
            </div>
          </div>
           <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-sm">
             <span className="text-amber-500 font-medium">Needs Action</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl hover:-translate-y-1 transition-transform bg-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Confirmed Today</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{confirmedToday.length}</h3>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-sm">
             <span className="text-slate-400">Next in: 30 mins</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl hover:-translate-y-1 transition-transform bg-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Avg. Rating</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">4.8</h3>
            </div>
             <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
           <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-sm">
             <span className="text-purple-600 font-bold mr-2">Top 5%</span>
             <span className="text-slate-400">in region</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Pending Requests */}
        <div className="lg:col-span-2 glass-panel rounded-[2rem] flex flex-col overflow-hidden bg-white">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="text-xl font-bold text-slate-800">Incoming Requests</h2>
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">{pendingAppointments.length} Pending</span>
          </div>
          <div className="p-6 flex-grow">
            {pendingAppointments.length === 0 ? (
               <div className="text-center py-12 flex flex-col items-center justify-center">
                   <div className="h-20 w-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 border border-emerald-100">
                       <Check className="h-10 w-10" />
                   </div>
                   <h3 className="text-slate-800 font-bold text-lg">All caught up!</h3>
                   <p className="text-slate-500 text-sm mt-1">No pending appointment requests.</p>
               </div>
            ) : (
              <div className="space-y-4">
                {pendingAppointments.map(apt => (
                  <div key={apt.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition-all shadow-sm">
                    <div className="mb-4 md:mb-0 w-full md:w-auto">
                      <div className="flex items-center mb-3">
                         <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center mr-4 shadow-md shadow-blue-500/20">
                             <UserIcon className="h-5 w-5" />
                         </div>
                         <div>
                             <span className="font-bold text-slate-800 mr-3 text-lg block">Patient #{apt.patientId.substring(0,5)}...</span>
                             <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">Dialysis Session</span>
                         </div>
                      </div>
                      <div className="text-sm text-slate-500 flex items-center pl-14">
                        <Calendar className="h-4 w-4 mr-2 text-medical-blue" />
                        <span className="font-medium mr-4 text-slate-700">{new Date(apt.date).toDateString()}</span>
                        <Clock className="h-4 w-4 mr-2 text-medical-accent" />
                        <span className="font-medium text-slate-700">{apt.timeSlot}</span>
                      </div>
                      {apt.medicalReportSummary && (
                         <div className="text-xs text-slate-600 mt-4 ml-14 max-w-md bg-slate-50 p-4 rounded-xl border border-slate-200 font-light leading-relaxed">
                            <span className="font-bold text-medical-blue block mb-1">Medical Summary:</span> 
                            {apt.medicalReportSummary}
                         </div>
                      )}
                    </div>
                    <div className="flex space-x-3 w-full md:w-auto mt-4 md:mt-0 pl-14 md:pl-0">
                      <button 
                        onClick={() => onUpdateStatus(apt.id, AppointmentStatus.CANCELLED)}
                        className="flex-1 md:flex-none px-5 py-2.5 text-sm font-medium text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors flex items-center justify-center"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Decline
                      </button>
                      <button 
                        onClick={() => onUpdateStatus(apt.id, AppointmentStatus.CONFIRMED)}
                        className="flex-1 md:flex-none px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Confirm
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Analytics */}
        <div className="glass-panel rounded-[2rem] p-6 flex flex-col bg-white">
          <h2 className="text-xl font-bold text-slate-800 mb-8">Weekly Occupancy</h2>
          <div className="h-64 w-full flex-grow min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'rgba(226, 232, 240, 0.5)'}} 
                  contentStyle={{borderRadius: '12px', background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', color: '#0f172a'}}
                />
                <Bar dataKey="sessions" fill="#0ea5e9" radius={[8, 8, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start">
             <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
             <div>
               <h4 className="font-bold text-amber-800 text-sm">Capacity Alert</h4>
               <p className="text-xs text-amber-600/80 mt-1 font-light">Saturday slots are 90% full. Consider opening evening shifts to accommodate more travelers.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;