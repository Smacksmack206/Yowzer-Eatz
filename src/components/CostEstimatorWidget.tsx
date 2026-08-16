import React, { useState, useMemo } from 'react';
import { MEAL_OPTIONS, BAR_TIERS, TAX_RATE_2026_SEATTLE, SERVICE_FEE_RATE } from '../data/cateringData';
import { Calculator, Users, Utensils, Wine, Check, Copy, FileText, Info, ArrowRight } from 'lucide-react';

interface CostEstimatorWidgetProps {
  onOpenLeadModalWithQuote?: (quoteDetails: {
    guestCount: number;
    meal: string;
    bar: string;
    total: number;
  }) => void;
}

export const CostEstimatorWidget: React.FC<CostEstimatorWidgetProps> = ({
  onOpenLeadModalWithQuote,
}) => {
  const [guestCount, setGuestCount] = useState<number>(100);
  const [selectedMealId, setSelectedMealId] = useState<string>('hot_buffet');
  const [selectedBarId, setSelectedBarId] = useState<string>('beer_wine');
  const [copied, setCopied] = useState<boolean>(false);
  const [showTaxBreakdownModal, setShowTaxBreakdownModal] = useState<boolean>(false);

  const selectedMeal = MEAL_OPTIONS.find((m) => m.id === selectedMealId) || MEAL_OPTIONS[1];
  const selectedBar = BAR_TIERS.find((b) => b.id === selectedBarId) || BAR_TIERS[1];

  // Calculations strictly adhering to 2026 Seattle tax law & requested formulas
  const calculation = useMemo(() => {
    const guests = Math.max(1, guestCount || 0);
    const mealPrice = selectedMeal.price;
    const barPrice = selectedBar.price;
    const perPersonFoodBeverage = mealPrice + barPrice;

    const subtotal = guests * perPersonFoodBeverage;
    const serviceFee = subtotal * SERVICE_FEE_RATE; // 20%
    const taxableAmount = subtotal + serviceFee;
    const tax = taxableAmount * TAX_RATE_2026_SEATTLE; // 10.35%
    const total = subtotal + serviceFee + tax;
    const perPersonGrandTotal = total / guests;

    return {
      guests,
      mealPrice,
      barPrice,
      perPersonFoodBeverage,
      subtotal,
      serviceFee,
      taxableAmount,
      tax,
      total,
      perPersonGrandTotal,
    };
  }, [guestCount, selectedMeal, selectedBar]);

  const handleCopyQuote = () => {
    const textSummary = `SEATTLE CATERING CO. - OFFICIAL ESTIMATE SUMMARY (2026 RATES)
=====================================================
Event Guest Count: ${calculation.guests} guests
Selected Menu: ${selectedMeal.name} ($${selectedMeal.price}/person)
Selected Bar Tier: ${selectedBar.name} ($${selectedBar.price}/person)
Food & Beverage Rate: $${calculation.perPersonFoodBeverage.toFixed(2)}/guest

FINANCIAL BREAKDOWN:
• Food & Beverage Subtotal: $${calculation.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
• Standard Operational Service Fee (20%): $${calculation.serviceFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
• WA State + Seattle Local Sales Tax (10.35% combined 2026): $${calculation.tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
-----------------------------------------------------
ESTIMATED GRAND TOTAL: $${calculation.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Estimated Cost Per Guest: $${calculation.perPersonGrandTotal.toFixed(2)}/person

Seattle Catering Co. | King County Health Permit: KC-HEALTH-PR0094182
Direct Line: (206) 555-0199 | Guaranteed 15-Minute Response`;

    navigator.clipboard.writeText(textSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const guestPresets = [25, 50, 100, 175, 250, 350];

  return (
    <section id="catering-estimator" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-slate-950 text-white px-6 py-6 sm:px-8 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wider uppercase">
              <Calculator className="w-4 h-4" />
              <span>Real-Time Pricing Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Instant Catering Cost Estimator
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Transparent budgeting built with current 2026 Seattle sales tax (10.35%) and standard 20% King County hospitality service fees.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 bg-slate-900 px-4 py-2.5 rounded-lg border border-slate-800 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-white">2026 Tax Table Live</span>
          </div>
        </div>

        {/* Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
          {/* Left Configuration Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Guest Count */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="guest-count" className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Number of Guests</span>
                </label>
                <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
                  Min 10 guests
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  id="guest-count"
                  min="10"
                  max="2000"
                  step="5"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-32 px-4 py-2.5 border-2 border-slate-700 rounded-lg text-lg font-bold text-white focus:outline-none focus:border-emerald-500 bg-slate-950"
                />
                {/* Presets */}
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {guestPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setGuestCount(preset)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                        guestCount === preset
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Meal Tier Selection */}
            <div>
              <label htmlFor="meal-style" className="text-sm font-bold text-white flex items-center justify-between mb-2">
                <span className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-emerald-400" />
                  <span>Meal Style & Dining Tier</span>
                </span>
                <span className="text-xs font-normal text-slate-400">Per Person</span>
              </label>

              {/* Standard HTML Select for direct ID compliance */}
              <select
                id="meal-style"
                value={selectedMeal.price}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  const found = MEAL_OPTIONS.find((m) => m.price === val);
                  if (found) setSelectedMealId(found.id);
                }}
                className="w-full px-3.5 py-2.5 border-2 border-slate-700 rounded-lg text-sm font-medium text-white focus:outline-none focus:border-emerald-500 bg-slate-950 mb-3"
              >
                <option value="25">Corporate Boxed Lunch ($25/pp)</option>
                <option value="45">Standard Hot Buffet ($45/pp)</option>
                <option value="85">Luxury Plated Dinner ($85/pp)</option>
                <option value="120">Grand PNW Chef’s Tasting ($120/pp)</option>
              </select>

              {/* Visual Card Grid for Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MEAL_OPTIONS.map((meal) => {
                  const isSelected = selectedMealId === meal.id;
                  return (
                    <div
                      key={meal.id}
                      onClick={() => setSelectedMealId(meal.id)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-950/40 shadow-xs ring-1 ring-emerald-500'
                          : 'border-slate-800 hover:border-slate-700 bg-slate-950/70'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-bold text-sm text-white">{meal.name}</div>
                        <div className="text-emerald-400 font-extrabold text-sm">${meal.price}<span className="text-[10px] text-slate-400 font-normal">/pp</span></div>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{meal.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Bar Tier Selection */}
            <div>
              <label htmlFor="bar-tier" className="text-sm font-bold text-white flex items-center justify-between mb-2">
                <span className="flex items-center gap-2">
                  <Wine className="w-4 h-4 text-emerald-400" />
                  <span>Beverage & Bar Service Tier</span>
                </span>
                <span className="text-xs font-normal text-slate-400">WSLCB Licensed</span>
              </label>

              {/* Standard HTML Select for script compatibility */}
              <select
                id="bar-tier"
                value={selectedBar.price}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  const found = BAR_TIERS.find((b) => b.price === val);
                  if (found) setSelectedBarId(found.id);
                }}
                className="w-full px-3.5 py-2.5 border-2 border-slate-700 rounded-lg text-sm font-medium text-white focus:outline-none focus:border-emerald-500 bg-slate-950 mb-3"
              >
                <option value="0">No Alcohol (Beverage Bar Only - $0/pp)</option>
                <option value="15">Beer & Washington Wine Package ($15/pp)</option>
                <option value="30">Full Premium Bar ($30/pp)</option>
                <option value="45">Sommelier Reserve & Cellar Tier ($45/pp)</option>
              </select>

              {/* Visual Bar Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BAR_TIERS.map((bar) => {
                  const isSelected = selectedBarId === bar.id;
                  return (
                    <div
                      key={bar.id}
                      onClick={() => setSelectedBarId(bar.id)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-950/40 shadow-xs ring-1 ring-emerald-500'
                          : 'border-slate-800 hover:border-slate-700 bg-slate-950/70'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-bold text-sm text-white">{bar.name}</div>
                        <div className="text-emerald-400 font-extrabold text-sm">
                          {bar.price === 0 ? 'Included' : `$${bar.price}/pp`}
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{bar.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Live Quote Result Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 shadow-inner space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Live Cost Summary
                </span>
                <span className="text-xs text-emerald-300 font-bold bg-emerald-950 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                  {calculation.guests} Guests
                </span>
              </div>

              {/* The Exact Required Quote Result Container */}
              <div id="quote-result">
                <div style={{ marginTop: '0px', padding: '15px', background: '#0f172a', borderLeft: '4px solid #10b981', borderRadius: '6px' }}>
                  <div className="flex justify-between items-center mb-2">
                    <strong style={{ color: '#f8fafc', fontSize: '15px' }}>Estimated Quote Breakdown</strong>
                    <span className="text-[11px] text-slate-400 font-mono">2026-REV-SEA</span>
                  </div>
                  <div className="space-y-1.5 text-sm text-slate-300 font-medium">
                    <div className="flex justify-between">
                      <span>Food & Beverage ({selectedMeal.name} + {selectedBar.name}):</span>
                      <span className="font-semibold text-white">${calculation.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-xs">
                      <span>Rate per guest:</span>
                      <span>${calculation.perPersonFoodBeverage.toFixed(2)} / person</span>
                    </div>
                    <div className="flex justify-between pt-1 text-slate-300">
                      <span>Service Fee (20%):</span>
                      <span className="font-semibold text-white">${calculation.serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-1 text-slate-300">
                      <span className="flex items-center gap-1">
                        WA State + Local Sales Tax (10.35%):
                        <button
                          type="button"
                          onClick={() => setShowTaxBreakdownModal(true)}
                          className="text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors"
                          title="View 2026 Seattle tax rate details"
                        >
                          <Info className="w-3.5 h-3.5 text-emerald-400" />
                        </button>
                      </span>
                      <span className="font-semibold text-white">${calculation.tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800">
                    <div className="flex justify-between items-baseline">
                      <h3 style={{ margin: '0', color: '#f8fafc', fontSize: '1.25rem', fontWeight: 'bold' }}>
                        Total Estimated:
                      </h3>
                      <span className="text-2xl font-extrabold text-emerald-400 font-serif">
                        ${calculation.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-right text-xs text-slate-400 font-medium mt-0.5">
                      ~${calculation.perPersonGrandTotal.toFixed(2)} all-inclusive per attendee
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenLeadModalWithQuote) {
                      onOpenLeadModalWithQuote({
                        guestCount: calculation.guests,
                        meal: selectedMeal.name,
                        bar: selectedBar.name,
                        total: calculation.total,
                      });
                    }
                  }}
                  id="lock-quote-button"
                  className="w-full bg-[#E67E22] hover:bg-[#d35400] text-white py-3 px-4 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lock in Estimate & Check Availability</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleCopyQuote}
                  id="copy-quote-summary-button"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 py-2.5 px-4 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied Estimate to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>Copy Itemized Quote Text</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tax & Compliance Footnote */}
              <div className="text-[11px] text-slate-400 leading-normal flex items-start gap-1.5 pt-1">
                <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>
                  WA Dept of Revenue rules mandate retail sales tax (10.35%) applies to food, beverages, and catering service operational charges.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Breakdown Explainer Modal */}
      {showTaxBreakdownModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-xl max-w-md w-full p-6 shadow-2xl relative border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-2 font-serif">
              2026 Seattle Sales Tax & Fee Architecture
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              In accordance with Washington State Department of Revenue and Seattle Municipal Code guidelines:
            </p>
            <div className="space-y-2 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-slate-300">
              <div className="flex justify-between">
                <span>Washington State Sales Tax:</span>
                <span className="font-bold text-white">6.50%</span>
              </div>
              <div className="flex justify-between">
                <span>King County Local Transit Tax:</span>
                <span className="font-bold text-white">2.90%</span>
              </div>
              <div className="flex justify-between">
                <span>City of Seattle Local Sales Tax:</span>
                <span className="font-bold text-white">0.95%</span>
              </div>
              <div className="border-t border-slate-800 pt-1.5 flex justify-between font-bold text-emerald-400">
                <span>Combined 2026 Seattle Rate:</span>
                <span>10.35%</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-400">
              <p>
                <strong className="text-slate-200">20% Standard Hospitality Service Fee:</strong> Covers event prep culinary staff, transport logistics, and King County compliant commissary operational maintenance.
              </p>
            </div>
            <div className="mt-5 text-right">
              <button
                type="button"
                onClick={() => setShowTaxBreakdownModal(false)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
