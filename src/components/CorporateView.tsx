import React from 'react';
import { Building2, CheckCircle2, Clock, ShieldAlert, ArrowRight, FileSpreadsheet } from 'lucide-react';
import { CostEstimatorWidget } from './CostEstimatorWidget';

interface CorporateViewProps {
  onOpenLeadModal: (defaultType?: string) => void;
  onScrollToEstimator: () => void;
}

export const CorporateView: React.FC<CorporateViewProps> = ({
  onOpenLeadModal,
  onScrollToEstimator
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Corporate Hero Snippet */}
      <section className="text-center py-12 sm:py-16 px-4 bg-slate-900/60 border-b border-slate-800 shadow-xl">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-semibold mb-4 border border-emerald-800/60">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>High-Intent B2B Enterprise & Tech Catering</span>
          </div>

          <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Seattle Corporate Catering & Tech Lunches
          </h1>

          <p id="hero-sub" className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Reliable, professional catering for executive meetings, conferences, and daily Net-30 office lunches in South Lake Union and Bellevue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenLeadModal('Corporate Catering / Tech Lunches')}
              className="w-full sm:w-auto bg-[#E67E22] hover:bg-[#d35400] text-white px-8 py-3.5 rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Corporate Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onScrollToEstimator}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3.5 rounded-xl text-base font-semibold transition-all cursor-pointer"
            >
              Estimate Office Headcount
            </button>
          </div>
        </div>
      </section>

      {/* Corporate Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-serif mb-2">
              Net-30 Invoicing & Enterprise Vendor Portal
            </h3>
            <p className="text-sm text-slate-300">
              Pre-approved vendor paperwork, automated monthly billing, and itemized receipts designed for Amazon, Microsoft, and tech AP departments.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-serif mb-2">
              Guaranteed On-Time Delivery to High-Rises
            </h3>
            <p className="text-sm text-slate-300">
              Dedicated Seattle freight elevator logistics, security badge clearance protocols, and temperature-controlled insulated hot/cold transit boxes.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-800/60 text-amber-400 flex items-center justify-center mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-serif mb-2">
              100% Allergen Isolation & Custom Labeling
            </h3>
            <p className="text-sm text-slate-300">
              Individually sealed and labeled boxes clearly marked with attendee names, Vegan, Gluten-Free, Halal, Nut-Free, and Kosher certifications.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Tech Lunch Packages */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-2xl font-bold font-serif text-white">
                Curated Seattle Corporate Menus
              </h2>
              <p className="text-sm text-slate-400">
                Crafted fresh at our 5th Ave commercial kitchen every morning.
              </p>
            </div>
            <span className="text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 px-3 py-1.5 rounded-full">
              Includes Seattle Bio-Compostable Utensils
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-slate-800 rounded-2xl p-5 bg-slate-950 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Executive Boxed Lunches</div>
                <div className="text-xl font-bold text-white mt-1 font-serif">The Puget Sound Artisan Box</div>
                <div className="text-2xl font-bold text-emerald-400 mt-2">$25 <span className="text-xs font-normal text-slate-400">/ person</span></div>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Wild Salmon / Roast Beef / Roasted Veggie Focaccia</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Olympic Peninsula Baby Greens & Lemon Vinaigrette</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Seattle Chocolate Sea Salt Toffee Cookie</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenLeadModal('Puget Sound Artisan Box ($25/pp)')}
                className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors border border-slate-700 cursor-pointer"
              >
                Order for Office
              </button>
            </div>

            <div className="border-2 border-emerald-500/80 rounded-2xl p-5 bg-slate-950 flex flex-col justify-between relative shadow-xl">
              <div className="absolute -top-3 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Warm Hot Buffet</div>
                <div className="text-xl font-bold text-white mt-1 font-serif">Pacific Salmon & Herb Chicken Buffet</div>
                <div className="text-2xl font-bold text-emerald-400 mt-2">$45 <span className="text-xs font-normal text-slate-400">/ person</span></div>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Wild Coho Salmon with Fresh Dill & Meyer Lemon Glaze</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Organic Rosemary Roasted Draper Valley Chicken</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Columbia Basin Wild Rice Pilaf & Roasted Heirloom Carrots</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Chafing dishes, eco fuel, and hot staging included</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenLeadModal('Hot Buffet ($45/pp)')}
                className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 rounded-xl transition-colors shadow-md cursor-pointer"
              >
                Book Hot Buffet
              </button>
            </div>

            <div className="border border-slate-800 rounded-2xl p-5 bg-slate-950 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">All-Day Summit</div>
                <div className="text-xl font-bold text-white mt-1 font-serif">Conference Full-Day Hospitality</div>
                <div className="text-2xl font-bold text-emerald-400 mt-2">$68 <span className="text-xs font-normal text-slate-400">/ person</span></div>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Morning Stumptown Espresso bar & fresh Macrina pastries</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Midday Plated or Hot Buffet Lunch service</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Afternoon Rainier berry tarts & PNW artisan cheeses</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenLeadModal('Conference Full-Day ($68/pp)')}
                className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors border border-slate-700 cursor-pointer"
              >
                Request Summit Package
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Estimator */}
      <CostEstimatorWidget onOpenLeadModalWithQuote={(q) => onOpenLeadModal(`Quote for ${q.guestCount} guests (${q.meal})`)} />
    </div>
  );
};
