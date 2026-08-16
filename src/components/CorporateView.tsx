import React from 'react';
import CostEstimatorWidget from './CostEstimatorWidget';
import LeadCaptureModal from './LeadCaptureModal'; // Assuming this is imported here

const CorporateView = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Corporate Catering for Seattle Teams
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
            Reliable, high-quality catering for off-sites, daily office lunches, and executive events. Fully licensed and tax-compliant for 2026.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Value Prop & Lead Capture */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Why Yowzer Eatz?</h2>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  15-Minute Lead Response Guarantee
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  Dietary Restriction Compliance (Vegan, GF, Halal options)
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  Seamless Venue Syndication via our Licensing Hub
                </li>
              </ul>
              
              <div className="mt-8">
                <p className="text-sm text-slate-500 mb-3">Ready to book your next corporate event?</p>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-md transition-colors w-full sm:w-auto">
                  Request a Custom Proposal
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Calculator Widget */}
          <div>
            <CostEstimatorWidget />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CorporateView;