import React from 'react';
import { Heart, Sparkles, MapPin, Wine, Calendar, ShieldCheck } from 'lucide-react';
import { SEATTLE_VENUE_PARTNERS } from '../data/cateringData';
import CostEstimatorWidget from './CostEstimatorWidget';

interface WeddingViewProps {
  onOpenLeadModal: (defaultType?: string) => void;
  onScrollToEstimator: () => void;
}

export const WeddingView: React.FC<WeddingViewProps> = ({
  onOpenLeadModal,
  onScrollToEstimator
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Wedding Hero Snippet */}
      <section className="text-center py-12 sm:py-16 px-4 bg-slate-900/60 border-b border-slate-800 shadow-xl">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 text-rose-300 text-xs font-semibold mb-4 border border-rose-800/60">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Curated Pacific Northwest Wedding Experiences</span>
          </div>

          <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Luxury Wedding Caterers Seattle WA
          </h1>

          <p id="hero-sub" className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Unforgettable culinary experiences, private tastings, and full-service bar packages seamlessly coordinated with Seattle's top venues.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenLeadModal('Wedding Catering / Private Tasting')}
              className="w-full sm:w-auto bg-[#E67E22] hover:bg-[#d35400] text-white px-8 py-3.5 rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Tasting</span>
            </button>
            <button
              onClick={onScrollToEstimator}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3.5 rounded-xl text-base font-semibold transition-all cursor-pointer"
            >
              Calculate Wedding Budget
            </button>
          </div>
        </div>
      </section>

      {/* Wedding Highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-rose-950/80 border border-rose-800/60 text-rose-400 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-serif mb-2">
              Private Chef Tastings in Downtown Seattle
            </h3>
            <p className="text-sm text-slate-300">
              Complimentary 4-person menu and wine tasting in our private tasting studio for couples booking full-service weddings over 75 guests.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800/60 text-purple-400 flex items-center justify-center mb-4">
              <Wine className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-serif mb-2">
              Sommelier-Curated WA Wine Programs
            </h3>
            <p className="text-sm text-slate-300">
              Direct vineyard partnerships across Walla Walla, Red Mountain, and Woodinville with licensed MAST Class 12 mixologists and bespoke cocktail bars.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-serif mb-2">
              Preferred & Approved Venue Status
            </h3>
            <p className="text-sm text-slate-300">
              On-file insurance certificates ($2M policy) and kitchen certifications for seamless load-in at Seattle’s most prestigious event spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Top Venue Partners List */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-2xl font-bold font-serif text-white">
                Seattle Venue Preferred Relationships
              </h2>
              <p className="text-sm text-slate-400">
                Familiarity with Seattle fire codes, loading docks, and kitchen layouts ensures a flawless event day.
              </p>
            </div>
            <span className="text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/60 px-3 py-1.5 rounded-full">
              Insurance Endorsements Pre-Cleared
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SEATTLE_VENUE_PARTNERS.map((venue, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-800 bg-slate-950 hover:border-slate-700 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between">
                  <div className="font-bold text-white font-serif text-base">{venue.name}</div>
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
                <div className="text-xs font-semibold text-emerald-400 mt-1">{venue.neighborhood} • {venue.capacity}</div>
                <p className="text-xs text-slate-300 mt-2">{venue.features}</p>
                <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Kitchen Clearance:</span>
                  <span className="font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Estimator */}
      <CostEstimatorWidget onOpenLeadModalWithQuote={(q) => onOpenLeadModal(`Wedding Quote for ${q.guestCount} guests (${q.meal})`)} />
    </div>
  );
};
