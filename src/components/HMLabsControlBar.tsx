import React, { useState } from 'react';
import { DKIParams } from '../types';
import { SEATTLE_NEIGHBORHOODS } from '../data/cateringData';
import { Sliders, Sparkles, Smartphone, Monitor, Code, ExternalLink, RefreshCw, Eye, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface HMLabsControlBarProps {
  dki: DKIParams;
  onUpdateDki: (newDki: Partial<DKIParams>) => void;
  onOpenSeoModal: () => void;
  deviceMode: 'desktop' | 'iphone' | 'android';
  onChangeDeviceMode: (mode: 'desktop' | 'iphone' | 'android') => void;
}

export const HMLabsControlBar: React.FC<HMLabsControlBarProps> = ({
  dki,
  onUpdateDki,
  onOpenSeoModal,
  deviceMode,
  onChangeDeviceMode
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAdPreview, setShowAdPreview] = useState(false);

  const presetCampaigns = [
    {
      label: 'Wedding (Queen Anne)',
      term: 'seattle wedding caterer',
      neighborhood: 'Queen Anne',
    },
    {
      label: 'Corporate Tech (SLU)',
      term: 'corporate catering & tech lunches',
      neighborhood: 'South Lake Union (SLU)',
    },
    {
      label: 'Executive (Bellevue)',
      term: 'luxury corporate event catering',
      neighborhood: 'Bellevue & Eastside',
    },
    {
      label: 'Waterfront Gala (Belltown)',
      term: 'seattle farm to table catering',
      neighborhood: 'Downtown Seattle',
    },
  ];

  return (
    <div className="bg-[#1a232c] text-white border-b-2 border-amber-500 shadow-xl sticky top-0 z-50 transition-all">
      {/* Top Bar Header */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="bg-amber-500 text-slate-950 font-extrabold px-2 py-0.5 rounded font-mono text-[10px]">
            HM MEDIA LABS
          </div>
          <span className="font-semibold text-slate-200 hidden sm:inline">
            Client Presentation Control Bar • Seattle Catering Architecture
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* SEO & Syndication Architecture Inspector Button */}
          <button
            onClick={onOpenSeoModal}
            className="bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Code className="w-3.5 h-3.5" />
            <span>SEO & Syndication Inspector</span>
          </button>

          {/* Google Ads Live Ad Preview Toggle */}
          <button
            onClick={() => setShowAdPreview(!showAdPreview)}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showAdPreview ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Google Ad Simulator</span>
          </button>

          {/* Device viewport switchers */}
          <div className="hidden md:flex items-center bg-slate-900 rounded p-0.5 border border-slate-700">
            <button
              onClick={() => onChangeDeviceMode('desktop')}
              className={`p-1 rounded text-[11px] flex items-center gap-1 ${
                deviceMode === 'desktop' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3 h-3" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => onChangeDeviceMode('iphone')}
              className={`p-1 rounded text-[11px] flex items-center gap-1 ${
                deviceMode === 'iphone' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="iPhone Viewport Mockup"
            >
              <Smartphone className="w-3 h-3" />
              <span>iPhone</span>
            </button>
            <button
              onClick={() => onChangeDeviceMode('android')}
              className={`p-1 rounded text-[11px] flex items-center gap-1 ${
                deviceMode === 'android' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Android Viewport Mockup"
            >
              <Smartphone className="w-3 h-3" />
              <span>Android</span>
            </button>
          </div>

          {/* Expand/Collapse Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white p-1 rounded"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Control Drawer */}
      {isExpanded && (
        <div className="bg-[#141b22] px-4 py-3 border-t border-slate-800 text-xs text-slate-300">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Live DKI Simulator Inputs */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PPC DKI Simulator:</span>
              </div>

              {/* Preset buttons */}
              {presetCampaigns.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onUpdateDki({ utmTerm: preset.term, neighborhood: preset.neighborhood });
                  }}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    dki.utmTerm === preset.term && dki.neighborhood === preset.neighborhood
                      ? 'bg-[#27AE60] text-white font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Custom inputs */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-mono text-[10px]">utm_term=</span>
                <input
                  type="text"
                  value={dki.utmTerm}
                  onChange={(e) => onUpdateDki({ utmTerm: e.target.value })}
                  placeholder="e.g. seattle wedding caterer"
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs w-44 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-mono text-[10px]">neighborhood=</span>
                <select
                  value={dki.neighborhood}
                  onChange={(e) => onUpdateDki({ neighborhood: e.target.value })}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="">(King County General)</option>
                  {SEATTLE_NEIGHBORHOODS.map((n, i) => (
                    <option key={i} value={n.name}>
                      {n.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => onUpdateDki({ utmTerm: 'Seattle Farm to Table Catering', neighborhood: '' })}
                className="text-slate-400 hover:text-amber-400 p-1 text-[11px] flex items-center gap-1"
                title="Reset to default"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Google Ads Live Ad Simulation Banner */}
      {showAdPreview && (
        <div className="bg-[#0f1720] border-t border-blue-900/60 p-4">
          <div className="max-w-4xl mx-auto bg-white text-slate-900 p-4 rounded-xl shadow-lg border border-slate-300">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <span className="text-black font-extrabold text-[11px] bg-slate-200 px-1 rounded">Ad</span>
                <span>Google Search • High Quality Score (10/10) Simulation</span>
              </span>
              <span className="text-emerald-700 font-semibold text-[11px]">
                Lowers CPC by ~34% via 1:1 Headline Ad Relevance
              </span>
            </div>

            {/* Simulated Google Ad Snippet */}
            <div className="space-y-1">
              <div className="text-xs text-emerald-800 font-mono">
                https://seattlecatering.example.com/{dki.neighborhood ? dki.neighborhood.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'catering'}
              </div>
              <h4 className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer">
                {dki.utmTerm
                  ? dki.utmTerm.replace(/\+/g, ' ').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
                  : 'Seattle Catering Co.'}{' '}
                | 2026 Seattle Farm-to-Table
              </h4>
              <p className="text-xs text-slate-600 leading-snug">
                Locally sourced Pacific Northwest catering for weddings, tech lunches, and galas in {dki.neighborhood || 'King County'}. King County Health certified commissary. Instant 2026 tax cost calculator.
              </p>
              <div className="pt-2 flex flex-wrap gap-3 text-xs text-[#1a0dab]">
                <span className="hover:underline cursor-pointer">• Instant Cost Estimator</span>
                <span className="hover:underline cursor-pointer">• 15-Minute Response Guarantee</span>
                <span className="hover:underline cursor-pointer">• King County Health Permit PR0094182</span>
                <span className="hover:underline cursor-pointer">• Call (206) 555-0199</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
