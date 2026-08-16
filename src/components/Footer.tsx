import React from 'react';
import { PageView } from '../types';
import { ShieldCheck, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  onOpenLeadModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLeadModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 p-0.5 shadow-md border border-slate-800 flex-shrink-0 overflow-hidden flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Yowzer Eatz Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white block">Yowzer Eatz</span>
                <span className="text-[11px] text-emerald-400 font-medium tracking-wide">Seattle Catering Co.</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premier farm-to-table catering by Yowzer Eatz in Seattle, WA. Serving King County corporate campuses, private estates, and luxury wedding venues with 2026 tax compliance.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>King County Health Dept Grade 'A' Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Catering Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Farm to Table Catering (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('corporate')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Corporate Tech Lunches & Summits (SLU / Bellevue)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('weddings')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Weddings & Luxury Galas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Seasonal Menus & Bar Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calendar')}
                  className="hover:text-emerald-400 transition-colors text-left font-medium text-emerald-300 cursor-pointer"
                >
                  Live 2026 Availability Calendar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-emerald-400 transition-colors text-left font-medium cursor-pointer"
                >
                  Client Reviews & Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('licensing')}
                  className="hover:text-emerald-400 transition-colors text-left font-semibold text-amber-300 cursor-pointer"
                >
                  Licensing & Compliance Hub (Syndication)
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Regulatory Registry */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Compliance Registry
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
              <li><strong className="text-slate-300 font-sans">WA UBI:</strong> WA-UBI-604-892-114</li>
              <li><strong className="text-slate-300 font-sans">Seattle Lic:</strong> SEA-LIC-849201</li>
              <li><strong className="text-slate-300 font-sans">Health Permit:</strong> KC-HEALTH-PR0094182</li>
              <li><strong className="text-slate-300 font-sans">WSLCB Liquor:</strong> WSLCB-CAT-418290</li>
              <li><strong className="text-slate-300 font-sans">Liability:</strong> $2,000,000 Aggregate</li>
            </ul>
          </div>

          {/* Contact & Dispatch */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Commissary Kitchen & Inquiries
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>1420 5th Ave, Suite 800, Seattle, WA 98101</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:2065550199" className="text-amber-400 hover:underline font-bold">
                  (206) 555-0199
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>events@seattlecatering.example.com</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenLeadModal}
                  className="w-full bg-[#E67E22] hover:bg-[#d35400] text-white font-bold py-2 rounded-xl text-xs transition-colors shadow-md cursor-pointer"
                >
                  Check Availability (15-Min Response)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-wrap gap-4 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
            <span>&copy; 2026 Yowzer Eatz • Seattle Catering Co.</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">Verified King County Facility</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-[10px] font-bold text-slate-300">Lighthouse Score: 100/100</span>
            </div>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer border border-slate-800"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
