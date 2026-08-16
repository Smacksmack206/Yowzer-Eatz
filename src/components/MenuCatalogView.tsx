import React, { useState } from 'react';
import { MEAL_OPTIONS, BAR_TIERS } from '../data/cateringData';
import { Utensils, Wine, CheckCircle2, Leaf } from 'lucide-react';

interface MenuCatalogViewProps {
  onOpenLeadModal: (defaultType?: string) => void;
  onScrollToEstimator: () => void;
}

export const MenuCatalogView: React.FC<MenuCatalogViewProps> = ({
  onOpenLeadModal,
  onScrollToEstimator
}) => {
  const [dietaryFilter] = useState<string>('all');

  const seasonalSpecialties = [
    {
      title: 'Copper River Sockeye Salmon Skewers',
      category: 'Appetizer',
      description: 'Wild Alaskan sockeye glazed with Washington Rainier cherry reduction and toasted pine nuts.',
      tags: ['Gluten-Free', 'Wild Seafood', 'Local Berry Reduction']
    },
    {
      title: 'Olympic Wild Morel Mushroom Tartlet',
      category: 'Hors d’oeuvre',
      description: 'Hand-foraged Olympic Peninsula morels with Cascadia goat cheese in a flaky macrina pastry shell.',
      tags: ['Vegetarian', 'Foraged PNW']
    },
    {
      title: 'Dungeness Crab & Avocado Crisps',
      category: 'Canapé',
      description: 'Fresh Westport Dungeness crab salad with yuzu aioli on crispy taro chips.',
      tags: ['Dairy-Free', 'Sustainable Seafood']
    },
    {
      title: 'Skagit Valley Berry & Lavender Crème Brûlée',
      category: 'Dessert',
      description: 'Organic berries from Bow Hill Farms topped with Sequim lavender caramelized custard.',
      tags: ['Vegetarian', 'Gluten-Free']
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-800/60">
          <Leaf className="w-3.5 h-3.5 text-emerald-400" />
          <span>Locally Sourced Pacific Northwest Agriculture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Seasonal Pacific Northwest Catering Menus
        </h1>
        <p className="mt-3 text-slate-300 text-base">
          From executive tech lunches in South Lake Union to multi-course black-tie galas, every dish is crafted with fresh ingredients from Washington farmers, foragers, and fishermen.
        </p>
      </div>

      {/* Main Dining Tiers Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-2xl font-bold font-serif text-white flex items-center gap-2">
            <Utensils className="w-5 h-5 text-emerald-400" />
            <span>Full-Service Meal Programs</span>
          </h2>
          <button
            onClick={onScrollToEstimator}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
          >
            Calculate Total with 2026 Taxes →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MEAL_OPTIONS.map((meal) => (
            <div
              key={meal.id}
              className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-white">{meal.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Per-guest tier with full prep & service</p>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-400">
                    ${meal.price}
                    <span className="text-xs font-normal text-slate-400">/pp</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 mt-3 leading-relaxed">{meal.description}</p>

                <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sample Course Highlights:</span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {meal.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3">
                <button
                  onClick={() => onOpenLeadModal(meal.name)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors text-center border border-slate-700 cursor-pointer"
                >
                  Request Sample Menu
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Beverage Programs */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-2xl font-bold font-serif text-white flex items-center gap-2">
            <Wine className="w-5 h-5 text-emerald-400" />
            <span>WSLCB Licensed Beverage Programs</span>
          </h2>
          <span className="text-xs text-slate-400">Class 11 Spirits & Wine Endorsement</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {BAR_TIERS.map((bar) => (
            <div key={bar.id} className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="font-bold font-serif text-base text-white">{bar.name}</h3>
                <div className="text-xl font-bold text-emerald-400 mt-1">
                  {bar.price === 0 ? 'Included' : `$${bar.price}/pp`}
                </div>
                <p className="text-xs text-slate-300 mt-2">{bar.description}</p>
              </div>
              <ul className="mt-4 pt-3 border-t border-slate-800 space-y-1 text-[11px] text-slate-400">
                {bar.items.map((i, idx) => (
                  <li key={idx}>• {i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal PNW Specialties */}
      <section className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
        <h2 className="text-2xl font-bold font-serif text-white mb-2">
          Chef's Seasonal Foraged & Farm Selections
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Rotates quarterly based on peak Puget Sound harvesting windows.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {seasonalSpecialties.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <h4 className="font-bold text-sm text-white mt-2 font-serif">{item.title}</h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{item.description}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 flex flex-wrap gap-1">
                {item.tags.map((t, i) => (
                  <span key={i} className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
