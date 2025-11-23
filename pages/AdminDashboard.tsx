import React from 'react';
import { User, Clinic } from '../types';
import { ShieldCheck, Users, Activity, MapPin, AlertTriangle, Check, Search, Filter, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AdminDashboardProps {
  user: User;
  clinics: Clinic[];
  users: User[];
  onVerifyClinic: (id: string) => void;
}

const bookingData = [
  { name: 'Week 1', bookings: 45 },
  { name: 'Week 2', bookings: 52 },
  { name: 'Week 3', bookings: 38 },
  { name: 'Week 4', bookings: 65 },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, clinics, users, onVerifyClinic }) => {
  const verifiedCount = clinics.filter(c => c.verified).length;
  const pendingVerification = clinics.filter(c => !c.verified);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-10 flex justify-between items-end">
        <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Admin Console</h1>
            <p className="text-slate-500 mt-2 font-light">Platform Overview & Content Moderation</p>
        </div>
        <div className="flex space-x-4">
             <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center shadow-sm">
                 <Filter className="h-4 w-4 mr-2" />
                 Filter
             </button>
             <button className="px-5 py-2.5 bg-medical-blue hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all flex items-center shadow-lg shadow-blue-500/20">
                 <Download className="h-4 w-4 mr-2" />
                 Export Report
             </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-card p-8 rounded-[2rem] flex items-center hover:scale-[1.02] transition-transform duration-300 bg-white">
            <div className="h-16 w-16 bg-blue-50 text-medical-blue rounded-2xl flex items-center justify-center mr-6 shadow-sm">
                <ShieldCheck className="h-8 w-8" />
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Verified Centers</p>
                <h3 className="text-4xl font-bold text-slate-800">{verifiedCount}</h3>
            </div>
        </div>
        <div className="glass-card p-8 rounded-[2rem] flex items-center hover:scale-[1.02] transition-transform duration-300 bg-white">
            <div className="h-16 w-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mr-6 shadow-sm">
                <Users className="h-8 w-8" />
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Users</p>
                <h3 className="text-4xl font-bold text-slate-800">1,240</h3>
            </div>
        </div>
        <div className="glass-card p-8 rounded-[2rem] flex items-center hover:scale-[1.02] transition-transform duration-300 bg-white">
            <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mr-6 shadow-sm">
                <Activity className="h-8 w-8" />
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Bookings</p>
                <h3 className="text-4xl font-bold text-slate-800">342</h3>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Verifications */}
          <div className="lg:col-span-2 glass-panel rounded-[2rem] overflow-hidden flex flex-col bg-white">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 className="text-xl font-bold text-slate-800">Pending Verification Requests</h2>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${pendingVerification.length > 0 ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>
                    {pendingVerification.length} Pending
                </span>
            </div>
            
            <div className="overflow-x-auto flex-grow">
                <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Clinic Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-transparent divide-y divide-slate-100">
                        {pendingVerification.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-16 text-center text-slate-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                                            <Check className="h-8 w-8 text-emerald-500" />
                                        </div>
                                        <p className="text-slate-500 font-medium">All providers are verified. Great job!</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            pendingVerification.map((clinic) => (
                                <tr key={clinic.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                                                <img className="h-full w-full object-cover" src={clinic.imageUrl} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-slate-800">{clinic.name}</div>
                                                <div className="text-xs text-slate-400 font-mono">ID: {clinic.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-slate-600 flex items-center">
                                            <MapPin className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                                            {clinic.city}, {clinic.state}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                                            {clinic.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => onVerifyClinic(clinic.id)}
                                            className="text-white bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-colors flex items-center ml-auto"
                                        >
                                            <ShieldCheck className="h-3 w-3 mr-1.5" />
                                            Verify
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
          </div>

          {/* Right Column: Analytics & Alerts */}
          <div className="space-y-6">
               <div className="glass-panel p-6 rounded-[2rem] bg-white">
                  <h3 className="font-bold text-slate-800 mb-6 text-lg">Platform Growth</h3>
                  <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={bookingData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                              <Tooltip contentStyle={{borderRadius: '12px', background: '#fff', border: '1px solid #e2e8f0', color: '#0f172a'}} />
                              <Line type="monotone" dataKey="bookings" stroke="#0ea5e9" strokeWidth={3} dot={{r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6, fill: '#0284c7'}} />
                          </LineChart>
                      </ResponsiveContainer>
                  </div>
              </div>

              <div className="glass-panel p-6 rounded-[2rem] bg-white">
                  <h3 className="font-bold text-slate-800 mb-4 text-lg">System Alerts</h3>
                  <div className="space-y-4">
                      <div className="flex items-start p-4 bg-rose-50 rounded-2xl border border-rose-100 hover:bg-rose-100 transition-colors cursor-pointer">
                          <AlertTriangle className="h-5 w-5 text-rose-500 mr-3 mt-0.5" />
                          <div>
                              <h4 className="text-sm font-bold text-rose-700">High Cancellation Rate</h4>
                              <p className="text-xs text-rose-600/80 mt-1 leading-relaxed">Clinic ID #C4 (Goa) has >20% cancellation rate this week. Investigate required.</p>
                          </div>
                      </div>
                      <div className="flex items-start p-4 bg-blue-50 rounded-2xl border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer">
                          <Check className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                              <h4 className="text-sm font-bold text-blue-700">New Registrations</h4>
                              <p className="text-xs text-blue-600/80 mt-1 leading-relaxed">12 new providers signed up in the last 24 hours.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;