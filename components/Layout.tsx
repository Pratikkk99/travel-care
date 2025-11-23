import React from 'react';
import { Menu, X, MapPin, User as UserIcon, LogOut, ShieldCheck, Activity, Calendar, Home, FileText } from 'lucide-react';
import { User, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, onNavigate, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = () => {
    if (!user) {
      return [
        { label: 'Home', value: 'home', icon: Home },
        { label: 'Find Centers', value: 'search', icon: MapPin },
        { label: 'For Providers', value: 'provider_login', icon: ShieldCheck },
      ];
    }
    if (user.role === UserRole.PATIENT) {
      return [
        { label: 'Find Centers', value: 'search', icon: MapPin },
        { label: 'My Bookings', value: 'patient_dashboard', icon: Calendar },
      ];
    }
    if (user.role === UserRole.PROVIDER) {
      return [
        { label: 'Dashboard', value: 'provider_dashboard', icon: Activity },
        { label: 'Appointments', value: 'provider_appointments', icon: Calendar },
      ];
    }
    if (user.role === UserRole.ADMIN) {
      return [
        { label: 'Overview', value: 'admin_dashboard', icon: Activity },
        { label: 'Verifications', value: 'admin_verification', icon: ShieldCheck },
      ];
    }
    return [];
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative">
      {/* Background ambient flows (Light) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-100 opacity-40 blur-[100px] rounded-full animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-cyan-100 opacity-40 blur-[100px] rounded-full animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-sky-100 opacity-40 blur-[100px] rounded-full animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Navbar */}
      <header className="fixed top-4 left-4 right-4 z-50 rounded-2xl glass-panel transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all mr-3">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-800 tracking-tight">TravelCare<span className="text-medical-accent">India</span></span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems().map((item) => (
                <button
                  key={item.value}
                  onClick={() => onNavigate(item.value)}
                  className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    currentPage === item.value 
                      ? 'bg-blue-50 text-medical-blue shadow-sm border border-blue-100' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <item.icon className={`h-4 w-4 mr-2 ${currentPage === item.value ? 'text-medical-blue' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              ))}

              {user ? (
                <div className="flex items-center pl-4 border-l border-slate-200 ml-4">
                  <div className="flex items-center space-x-3 mr-4">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-100" />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center text-medical-blue border border-blue-100">
                        <UserIcon className="h-4 w-4" />
                      </div>
                    )}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-800 leading-tight">{user.name}</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">{user.role}</span>
                    </div>
                  </div>
                  <button
                    onClick={onLogout}
                    className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onNavigate('login')}
                  className="ml-4 bg-gradient-primary hover:bg-gradient-accent text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-500 hover:text-slate-800 p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white/90 backdrop-blur-xl rounded-b-2xl shadow-xl">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems().map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    onNavigate(item.value);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium mb-2 ${
                    currentPage === item.value
                      ? 'bg-blue-50 text-medical-blue border border-blue-100'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </div>
                </button>
              ))}
               {user ? (
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-red-500 hover:bg-red-50"
                  >
                    <div className="flex items-center">
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                    </div>
                  </button>
               ) : (
                 <button
                    onClick={() => {
                      onNavigate('login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-white bg-gradient-primary mt-4"
                  >
                    Login
                  </button>
               )}
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-24"></div>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-md text-slate-500 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center text-slate-800 mb-4">
                <Activity className="h-6 w-6 mr-2 text-medical-blue" />
                <span className="font-bold text-lg">TravelCare India</span>
              </div>
              <p className="text-sm text-slate-500">
                Connecting patients with trusted dialysis and transfusion care across India. Travel with confidence.
              </p>
            </div>
            <div>
              <h3 className="text-slate-900 font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-medical-blue cursor-pointer transition-colors">Hemodialysis</li>
                <li className="hover:text-medical-blue cursor-pointer transition-colors">Peritoneal Dialysis</li>
                <li className="hover:text-medical-blue cursor-pointer transition-colors">Thalassemia Support</li>
                <li className="hover:text-medical-blue cursor-pointer transition-colors">Medical Tourism</li>
              </ul>
            </div>
            <div>
              <h3 className="text-slate-900 font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-medical-blue cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-medical-blue cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-medical-blue cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-medical-blue cursor-pointer transition-colors">Terms of Service</li>
              </ul>
            </div>
            <div>
              <h3 className="text-slate-900 font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>support@travelcare.in</li>
                <li>+91 8000 1122 33</li>
                <li>Mumbai, India</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 text-center text-xs text-slate-400">
            &copy; 2025 PitLabs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;