import React, { useState } from 'react';
import { PageView } from '../types';
import { Phone, Calendar, ShieldCheck, Utensils, Building2, Heart, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  onOpenLeadModal: () => void;
  dkiNeighborhood?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenLeadModal,
  dkiNeighborhood
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Utensils className="w-4 h-4" /> },
    { id: 'calendar', label: 'Availability', icon: <Calendar className="w-4 h-4" /> },
    { id: 'reviews', label: 'Reviews', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'corporate', label: 'Corporate', icon: <Building2 className="w-4 h-4" /> },
    { id: 'weddings', label: 'Weddings', icon: <Heart className="w-4 h-4" /> },
    { id: 'menu', label: 'Menus', icon: <Utensils className="w-4 h-4" /> },
    { id: 'licensing', label: 'Licensing', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-[#0B1120]/95 backdrop-blur-md text-white sticky top-0 z-40 shadow-xl border-b border-slate-800">
      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left group transition-all cursor-pointer"
            id="header-brand-logo"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-900 p-0.5 shadow-md border border-slate-700/80 flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Yowzer Eatz Logo"
                className="w-full h-full object-contain object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="font-serif text-lg sm:text-xl tracking-tight font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                <span>Yowzer Eatz</span>
                <span className="text-[10px] font-sans font-semibold bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700/60 hidden sm:inline-block">Seattle Catering</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">
                Pacific Northwest Farm-to-Table
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 text-emerald-400 font-semibold shadow-xs border border-slate-700'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* CTA Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenLeadModal}
              id="header-availability-cta"
              className="bg-[#E67E22] hover:bg-[#d35400] active:scale-[0.98] text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Check Availability</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenLeadModal}
              className="bg-[#E67E22] text-white px-3 py-1.5 rounded-md text-xs font-bold sm:hidden"
            >
              Book Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-200 hover:text-white hover:bg-slate-800/80 cursor-pointer"
              aria-label="Toggle navigation menu"
              id="mobile-nav-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 pt-3 pb-5 space-y-1.5 shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-colors ${
                currentView === item.id
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenLeadModal();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#E67E22] hover:bg-[#d35400] text-white font-bold py-2.5 rounded-lg text-sm text-center shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Check Our Availability (15-Min Response)</span>
            </button>
            <a
              href="tel:2065550199"
              className="w-full bg-slate-950 text-slate-200 font-medium py-2 rounded-lg text-xs text-center flex items-center justify-center gap-2 border border-slate-800"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              Direct Catering Line: (206) 555-0199
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
