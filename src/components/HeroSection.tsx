import React from 'react';
import { DKIParams, PageView } from '../types';
import { MapPin, Award, CheckCircle2, Calculator, ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  dki: DKIParams;
  onOpenLeadModal: () => void;
  onNavigate: (view: PageView) => void;
  onScrollToEstimator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  dki,
  onOpenLeadModal,
  onNavigate,
  onScrollToEstimator,
}) => {
  // Format UTM term nicely if present
  const formattedUtmTerm = dki.utmTerm
    ? dki.utmTerm
        .replace(/\+/g, ' ')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())
    : 'Seattle Farm to Table Catering';

  const formattedNeighborhood = dki.neighborhood
    ? dki.neighborhood.replace(/\+/g, ' ')
    : 'Seattle & Greater King County';

  return (
    <section className="relative bg-gradient-to-b from-[#0B1120] via-slate-900 to-[#064e3b]/15 border-b-4 border-emerald-500 pt-8 pb-12 sm:pt-14 sm:pb-18 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Dynamic DKI Indicator & Mascot Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-200 text-xs font-semibold shadow-md">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Yowzer Eatz Mascot"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span>Yowzer Eatz</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-emerald-400 font-bold">2026 Seattle Bookings Open</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 text-xs font-semibold shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Farm-to-Table Seattle Catering</span>
            {dki.neighborhood && (
              <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                {formattedNeighborhood}
              </span>
            )}
          </div>
        </div>

        {/* Dynamic H1 Headline */}
        <h1
          id="hero-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto transition-all"
        >
          {formattedUtmTerm}
        </h1>

        {/* Dynamic Subheading */}
        <p
          id="hero-sub"
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          {dki.neighborhood ? (
            <span>
              Premium locally-sourced catering services directly serving{' '}
              <strong className="text-emerald-400 font-semibold underline decoration-emerald-500 decoration-2 underline-offset-2">
                {formattedNeighborhood}
              </strong>{' '}
              and the greater King County area.
            </span>
          ) : (
            <span>
              Locally sourced, expertly crafted menus for weddings, corporate summits, and private galas across the Pacific Northwest.
            </span>
          )}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          <button
            onClick={onOpenLeadModal}
            id="hero-cta-button"
            className="w-full sm:w-auto bg-[#E67E22] hover:bg-[#d35400] text-white px-8 py-3.5 rounded-lg text-base font-bold shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Check Our Availability</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onScrollToEstimator}
            id="hero-estimator-scroll-button"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-700 hover:border-emerald-500 px-6 py-3 rounded-lg text-base font-semibold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>Instant Quote Calculator</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 pt-6 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
          <div className="flex items-center gap-2.5 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">2026 Tax Transparent</div>
              <div className="text-[11px] text-slate-400">10.35% WA/Seattle Rate</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 shadow-sm">
            <Award className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">King County Certified</div>
              <div className="text-[11px] text-slate-400">Health Permit Active</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 shadow-sm">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Downtown Commissary</div>
              <div className="text-[11px] text-slate-400">1420 5th Ave Commercial</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">WSLCB Liquor Licensed</div>
              <div className="text-[11px] text-slate-400">Class 11 Bar Endorsement</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
