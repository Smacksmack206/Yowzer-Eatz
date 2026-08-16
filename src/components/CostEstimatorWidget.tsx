import React, { useState, useMemo } from 'react';

const CostEstimatorWidget = () => {
  const [guestCount, setGuestCount] = useState(50);
  const [serviceStyle, setServiceStyle] = useState('buffet'); // buffet, plated, family
  const [isSeattleCityLimits, setIsSeattleCityLimits] = useState(true);

  // Base pricing constants
  const PRICES = {
    buffet: 45,
    plated: 65,
    family: 55,
  };

  // 2026 Seattle Tax & Surcharge Rates
  const SEATTLE_SALES_TAX_RATE = 0.1035; 
  const WA_STATE_TAX_RATE = 0.065;
  const SERVICE_CHARGE = 0.20;

  const estimate = useMemo(() => {
    const foodCost = guestCount * (PRICES[serviceStyle] || 0);
    const serviceFee = foodCost * SERVICE_CHARGE;
    const subtotal = foodCost + serviceFee;
    
    const taxRate = isSeattleCityLimits ? SEATTLE_SALES_TAX_RATE : WA_STATE_TAX_RATE;
    const estimatedTax = subtotal * taxRate;
    
    const total = subtotal + estimatedTax;

    return {
      foodCost,
      serviceFee,
      subtotal,
      estimatedTax,
      total
    };
  }, [guestCount, serviceStyle, isSeattleCityLimits]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-slate-200">
      <h3 className="text-2xl font-bold mb-4 text-slate-800">Instant Cost Estimator</h3>
      
      <div className="space-y-4 mb-6">
        {/* Guest Count */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Guest Count</label>
          <input 
            type="number" 
            min="10" 
            max="1000"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Service Style */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Service Style</label>
          <select 
            value={serviceStyle}
            onChange={(e) => setServiceStyle(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500"
          >
            <option value="buffet">Buffet ($45/pp)</option>
            <option value="family">Family Style ($55/pp)</option>
            <option value="plated">Plated ($65/pp)</option>
          </select>
        </div>

        {/* Location (for Tax Compliance) */}
        <div className="flex items-center mt-4">
          <input 
            type="checkbox" 
            id="seattleTax"
            checked={isSeattleCityLimits}
            onChange={(e) => setIsSeattleCityLimits(e.target.checked)}
            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded"
          />
          <label htmlFor="seattleTax" className="ml-2 text-sm text-slate-700">
            Event is within Seattle City Limits (Applies 10.35% Tax)
          </label>
        </div>
      </div>

      {/* Output / Estimate */}
      <div className="bg-slate-50 p-4 rounded border border-slate-200">
        <div className="flex justify-between mb-2">
          <span className="text-slate-600">Food & Service:</span>
          <span className="font-medium">${estimate.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2 border-b border-slate-200 pb-2">
          <span className="text-slate-600">Estimated Tax:</span>
          <span className="font-medium">${estimate.estimatedTax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-2 items-center">
          <span className="text-lg font-bold text-slate-800">Total Estimate:</span>
          <span className="text-2xl font-bold text-emerald-600">${estimate.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CostEstimatorWidget;