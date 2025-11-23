import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PatientDashboard from './pages/PatientDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ClinicCard from './components/ClinicCard';
import { summarizeMedicalReport } from './services/geminiService';
import { MOCK_CLINICS, MOCK_USERS } from './constants';
import { User, UserRole, Clinic, Appointment, AppointmentStatus } from './types';
import { X, Upload, FileText, Check, Loader2, Bell, Calendar, Search, User as UserIcon } from 'lucide-react';

// Helper for search filtering
const filterClinics = (clinics: Clinic[], filters: { city?: string; type?: string }) => {
  return clinics.filter(c => {
    // Case insensitive search across City, Name, State, and Address
    const searchTerm = filters.city ? filters.city.toLowerCase() : '';
    const matchLocation = searchTerm 
      ? c.city.toLowerCase().includes(searchTerm) || 
        c.state.toLowerCase().includes(searchTerm) || 
        c.name.toLowerCase().includes(searchTerm) ||
        c.address.toLowerCase().includes(searchTerm)
      : true;

    const matchType = filters.type 
      ? c.type.toLowerCase().includes(filters.type.toLowerCase()) 
      : true;
      
    return matchLocation && matchType;
  });
};

function AppContent() {
  const [user, setUser] = useState<User | null>(null);
  const [clinics, setClinics] = useState<Clinic[]>(MOCK_CLINICS);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchFilters, setSearchFilters] = useState<{ city?: string; type?: string }>({});
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  
  // Notification State
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);

  // Booking State
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type });
  };

  const handleLogin = (role: UserRole) => {
    // Simulating login
    const mockUser = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];
    setUser(mockUser);
    setIsLoginOpen(false);
    showNotification(`Welcome back, ${mockUser.name}!`, 'success');
    
    if (role === UserRole.PATIENT) navigate('/patient_dashboard');
    else if (role === UserRole.PROVIDER) navigate('/provider_dashboard');
    else if (role === UserRole.ADMIN) navigate('/admin_dashboard');
    else navigate('/home');
  };

  const handleLogout = () => {
    setUser(null);
    showNotification('Logged out successfully.', 'info');
    navigate('/');
  };

  const handleSearch = (filters: { city?: string; type?: string }) => {
    setSearchFilters(filters);
    navigate('/search');
  };

  const handleBookClick = (clinic: Clinic) => {
    if (!user) {
      setIsLoginOpen(true);
      showNotification('Please login to book an appointment', 'info');
      return;
    }
    setSelectedClinic(clinic);
    setIsBookingModalOpen(true);
    setUploadSuccess(false);
    setFile(null);
    setGeneratedSummary('');
    setBookingDate('');
    setBookingTime('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setUploading(true);

      // Simulate reading file text for AI
      setTimeout(async () => {
        const summary = await summarizeMedicalReport(`Patient report for ${selectedFile.name}. Diagnosis: CKD. Creatinine: 4.2. Hemoglobin: 10.5.`);
        setGeneratedSummary(summary);
        setUploading(false);
        setUploadSuccess(true);
        showNotification('Document analyzed successfully', 'success');
      }, 1500);
    }
  };

  const confirmBooking = () => {
    if (!selectedClinic || !user) return;

    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      clinicId: selectedClinic.id,
      patientId: user.id,
      date: bookingDate,
      timeSlot: bookingTime,
      status: AppointmentStatus.PENDING,
      medicalReportSummary: generatedSummary || undefined,
      documentName: file ? file.name : undefined // Save the uploaded file name
    };

    setAppointments([...appointments, newAppointment]);
    setIsBookingModalOpen(false);
    showNotification('Booking request sent! Awaiting confirmation.', 'success');
    navigate('/patient_dashboard');
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
    const statusText = status === AppointmentStatus.CONFIRMED ? 'confirmed' : 'cancelled';
    const type = status === AppointmentStatus.CONFIRMED ? 'success' : 'info';
    showNotification(`Appointment ${statusText}`, type);
  };

  // Patient Actions
  const handleCancelAppointment = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
        setAppointments(appointments.map(a => a.id === id ? { ...a, status: AppointmentStatus.CANCELLED } : a));
        showNotification('Appointment cancelled successfully', 'info');
    }
  };

  const handleChat = (id: string) => {
    showNotification('Opening secure chat with provider...', 'info');
  };

  const handleSupport = () => {
    showNotification('Support ticket #4921 created. A representative will call you shortly.', 'success');
  };

  // Provider Actions
  const handleManageSchedule = () => {
      showNotification('Opening schedule management calendar...', 'info');
  };

  const handleAddWalkIn = () => {
      showNotification('Walk-in patient registration form opened', 'info');
  };

  // Admin Actions
  const handleVerifyClinic = (clinicId: string) => {
      setClinics(clinics.map(c => c.id === clinicId ? {...c, verified: true} : c));
      showNotification('Clinic verified and badge assigned.', 'success');
  };

  const handleNavigate = (path: string) => {
    if (path === 'login') {
        setIsLoginOpen(true);
    } else if (path === 'provider_login') {
        if (user) {
            // If already logged in as provider
             if (user.role === UserRole.PROVIDER) navigate('/provider_dashboard');
             else showNotification('You are logged in as a patient. Please logout to access Provider Portal.', 'error');
        } else {
            // Open login modal specifically
            setIsLoginOpen(true);
            showNotification('Please login with a Provider account.', 'info');
        }
    } else if (path === 'admin_verification') {
        navigate('/admin_dashboard');
    } else {
        navigate(`/${path}`);
    }
  };

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      onNavigate={handleNavigate}
      currentPage={location.pathname.replace('/', '') || 'home'}
    >
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-24 right-4 z-[60] px-6 py-4 rounded-2xl shadow-xl flex items-center animate-bounce-in transition-all duration-300 backdrop-blur-md border ${
          notification.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 
          notification.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          {notification.type === 'success' && <Check className="h-5 w-5 mr-3 text-emerald-500" />}
          {notification.type === 'error' && <X className="h-5 w-5 mr-3 text-rose-500" />}
          {notification.type === 'info' && <Bell className="h-5 w-5 mr-3 text-blue-500" />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home onSearch={handleSearch} />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/search" element={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
             <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                 <div className="w-full md:w-1/2 mb-4 md:mb-0">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                      {searchFilters.city ? `Results for "${searchFilters.city}"` : 'Find Centers'}
                    </h2>
                    <div className="relative group">
                      <input 
                        type="text" 
                        placeholder="Search city, state, or clinic name..." 
                        className="w-full pl-12 pr-4 py-3 glass-input rounded-xl focus:ring-2 focus:ring-medical-blue bg-white border border-slate-200 text-slate-800"
                        value={searchFilters.city || ''}
                        onChange={(e) => setSearchFilters({...searchFilters, city: e.target.value})}
                      />
                      <Search className="h-5 w-5 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-medical-blue transition-colors" />
                    </div>
                 </div>
                 <button 
                    onClick={() => setSearchFilters({})}
                    className="text-sm text-medical-blue hover:text-slate-900 font-medium bg-white px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
                 >
                    Clear Filters
                 </button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {filterClinics(clinics, searchFilters).map(clinic => (
                 <ClinicCard key={clinic.id} clinic={clinic} onBook={handleBookClick} />
               ))}
             </div>
             {filterClinics(clinics, searchFilters).length === 0 && (
               <div className="text-center py-20 glass-panel rounded-[2rem] bg-white">
                 <div className="mx-auto h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
                    <Calendar className="h-10 w-10 text-slate-400" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">No clinics found</h3>
                 <p className="text-slate-500 mt-2">Try adjusting your search filters or search for a different city.</p>
                 <button onClick={() => setSearchFilters({})} className="mt-6 px-6 py-2.5 bg-gradient-primary text-white rounded-xl hover:opacity-90 transition-opacity font-bold shadow-md">View All Clinics</button>
               </div>
             )}
          </div>
        } />
        <Route path="/patient_dashboard" element={
           user?.role === UserRole.PATIENT ? (
             <PatientDashboard 
                user={user} 
                appointments={appointments} 
                clinics={clinics} 
                onCancel={handleCancelAppointment}
                onChat={handleChat}
                onContactSupport={handleSupport}
             />
           ) : <Navigate to="/" />
        } />
        <Route path="/provider_dashboard" element={
           user?.role === UserRole.PROVIDER ? (
             <ProviderDashboard 
                user={user} 
                appointments={appointments} 
                onUpdateStatus={updateAppointmentStatus} 
                onManageSchedule={handleManageSchedule}
                onAddWalkIn={handleAddWalkIn}
             />
           ) : <Navigate to="/" />
        } />
        <Route path="/provider_appointments" element={
           user?.role === UserRole.PROVIDER ? (
             <ProviderDashboard 
                user={user} 
                appointments={appointments} 
                onUpdateStatus={updateAppointmentStatus} 
                onManageSchedule={handleManageSchedule}
                onAddWalkIn={handleAddWalkIn}
             />
           ) : <Navigate to="/" />
        } />
        <Route path="/admin_dashboard" element={
            user?.role === UserRole.ADMIN ? (
                <AdminDashboard 
                    user={user}
                    clinics={clinics}
                    users={MOCK_USERS} 
                    onVerifyClinic={handleVerifyClinic}
                />
            ) : <Navigate to="/" />
        } />
         <Route path="/admin_verification" element={<Navigate to="/admin_dashboard" />} />
      </Routes>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="glass-panel rounded-[2rem] w-full max-w-md overflow-hidden animate-scale-in relative bg-white border border-white shadow-2xl">
             {/* Decor elements */}
             <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 blur-[50px] opacity-60"></div>
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-100 blur-[50px] opacity-60"></div>

            <div className="p-8 relative z-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-slate-800">Welcome Back</h3>
                <button onClick={() => setIsLoginOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-800">
                    <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-slate-500 mb-2">Select your role to continue:</p>
                {[
                  { role: UserRole.PATIENT, label: 'Patient', desc: 'Book appointments & history', color: 'text-medical-blue', bg: 'bg-blue-50', icon: UserIcon },
                  { role: UserRole.PROVIDER, label: 'Healthcare Provider', desc: 'Manage schedule & profile', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: UserIcon },
                  { role: UserRole.ADMIN, label: 'Platform Admin', desc: 'Verification & Oversight', color: 'text-purple-600', bg: 'bg-purple-50', icon: UserIcon }
                ].map((item) => (
                  <button 
                    key={item.role}
                    onClick={() => handleLogin(item.role)}
                    className="w-full p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 flex items-center transition-all group shadow-sm hover:shadow-md"
                  >
                    <div className={`h-12 w-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform border border-slate-100`}>
                        <span className="font-bold text-lg">{item.label[0]}</span>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-800 text-lg">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 bg-slate-50 text-center text-xs text-slate-400 border-t border-slate-100">
                Secure Authentication via TravelCare ID
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && selectedClinic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="glass-panel rounded-[2rem] w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-scale-in relative bg-white border border-white shadow-2xl">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 blur-[100px] pointer-events-none"></div>

            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Book Appointment</h3>
                <p className="text-sm text-medical-blue mt-1 flex items-center"><Calendar className="h-3 w-3 mr-1"/> {selectedClinic.name}</p>
              </div>
              <button onClick={() => setIsBookingModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-800"><X className="h-5 w-5" /></button>
            </div>
            
            <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Select Date</label>
                  <input 
                    type="date" 
                    className="w-full glass-input rounded-xl p-3 focus:ring-2 focus:ring-medical-blue text-slate-800 border-slate-200"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Select Time</label>
                  <select 
                    className="w-full glass-input rounded-xl p-3 focus:ring-2 focus:ring-medical-blue text-slate-800 border-slate-200"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                  >
                    <option value="">-- : --</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-3">Medical Records (Optional)</label>
                <div className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 ${
                    uploadSuccess 
                    ? 'border-emerald-300 bg-emerald-50' 
                    : 'border-slate-300 bg-slate-50 hover:bg-white hover:border-medical-blue'
                }`}>
                  {uploading ? (
                    <div className="flex flex-col items-center py-2">
                      <Loader2 className="h-10 w-10 text-medical-blue animate-spin mb-4" />
                      <span className="text-sm font-medium text-slate-500">AI analyzing document...</span>
                    </div>
                  ) : uploadSuccess ? (
                    <div className="flex flex-col items-center py-2 text-emerald-700 animate-fade-in relative w-full">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setUploadSuccess(false); setFile(null); setGeneratedSummary(''); }} 
                            className="absolute top-0 right-0 p-1 text-slate-400 hover:text-rose-500"
                        >
                            <X className="h-4 w-4" />
                        </button>
                      <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3 border border-emerald-200">
                          <Check className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-bold">File Ready</span>
                      <span className="text-xs mt-1 opacity-80">{file?.name}</span>
                    </div>
                  ) : (
                    <div className="relative w-full group">
                      <Upload className="h-12 w-12 text-slate-400 group-hover:text-medical-blue transition-colors mx-auto mb-4" />
                      <p className="text-sm font-medium text-slate-700 mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-slate-400">PDF, JPG, PNG (Max 5MB)</p>
                      <input 
                        type="file" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileUpload}
                        accept=".pdf,.jpg,.png,.jpeg"
                      />
                    </div>
                  )}
                </div>
                
                {generatedSummary && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm animate-fade-in">
                    <div className="flex items-center text-blue-700 font-bold mb-2">
                        <FileText className="h-4 w-4 mr-2" />
                        AI Clinical Summary
                    </div>
                    <p className="text-blue-900/80 leading-relaxed font-light">{generatedSummary}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end space-x-4">
              <button 
                onClick={() => setIsBookingModalOpen(false)}
                className="px-6 py-3 text-slate-500 font-medium hover:text-slate-800 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-slate-200"
              >
                Cancel
              </button>
              <button 
                onClick={confirmBooking}
                disabled={!bookingDate || !bookingTime}
                className="px-8 py-3 bg-gradient-primary hover:bg-gradient-accent text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center transform hover:-translate-y-0.5"
              >
                <Check className="h-4 w-4 mr-2" />
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

// Helper component for icons
const UserRoleIcon = ({role}: {role: string}) => {
    return (
        <span className="text-xl font-bold text-slate-700">
            {role === 'Patient' ? 'P' : role === 'Provider' ? 'Dr' : 'A'}
        </span>
    )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}