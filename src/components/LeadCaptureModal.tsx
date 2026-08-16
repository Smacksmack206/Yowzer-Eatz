import React, { useState } from 'react';
import { X, Clock, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { LeadSubmission } from '../types';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultOccasion?: string;
  defaultDate?: string;
  dkiNeighborhood?: string;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  defaultOccasion = '',
  defaultDate = '',
  dkiNeighborhood = ''
}) => {
  const [formData, setFormData] = useState<LeadSubmission>({
    fullName: '',
    email: '',
    phone: '',
    eventDate: defaultDate || '',
    eventType: defaultOccasion || 'Corporate Lunch',
    guestCount: 75,
    neighborhood: dkiNeighborhood || 'Downtown Seattle',
    notes: defaultOccasion ? `Request: ${defaultOccasion}` : ''
  });

  // Keep state in sync when opened with props
  React.useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        eventType: defaultOccasion || prev.eventType || 'Corporate Lunch',
        eventDate: defaultDate || prev.eventDate || '',
        notes: defaultOccasion ? `Request: ${defaultOccasion}` : prev.notes,
        neighborhood: dkiNeighborhood || prev.neighborhood || 'Downtown Seattle',
      }));
    }
  }, [isOpen, defaultOccasion, defaultDate, dkiNeighborhood]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="lead-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-800 animate-in fade-in zoom-in-95 duration-200 text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header with Logo and Guarantee Badge */}
            <div className="flex items-center justify-between gap-3 mb-4 pr-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 shadow-xs overflow-hidden flex items-center justify-center p-0.5">
                  <img
                    src="/logo.png"
                    alt="Yowzer Eatz"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="font-serif font-bold text-sm text-white block leading-tight">Yowzer Eatz</span>
                  <span className="text-[10px] text-slate-400 font-medium">Seattle Catering Inquiries</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-amber-950/80 text-amber-300 px-2.5 py-1 rounded-full text-[11px] font-bold border border-amber-800/60">
                <Clock className="w-3 h-3 text-amber-400 animate-pulse" />
                <span>15-Min Response</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
              Check Date Availability & Lock Quote
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 mb-5">
              Enter your details and our senior catering director will review venue clearance, kitchen schedules, and contact you directly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Work / Personal Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(206) 555-0123"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Estimated Guests
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="2000"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Event Occasion & Menu Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. SLU Tech All-Hands Lunch, Wedding at Chihuly, Dietary needs"
                  value={formData.notes || formData.eventType}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#E67E22] hover:bg-[#d35400] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Send className="w-4 h-4" />
                <span>Submit Request (15-Min Response)</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Your information is private & immediately routed to our King County catering director.</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-4">
            <div className="relative w-20 h-20 mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-slate-950 border-2 border-emerald-500 shadow-lg overflow-hidden flex items-center justify-center p-1">
                <img
                  src="/logo.png"
                  alt="Yowzer Eatz"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full shadow-md">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-2xl font-bold font-serif text-white">
              Inquiry Dispatched Successfully!
            </h3>

            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Thank you, <strong className="text-white">{formData.fullName}</strong>. Our Seattle catering director has received your request and is reviewing date availability.
            </p>

            <div className="bg-emerald-950/80 border border-emerald-800/60 rounded-2xl p-4 text-xs text-left text-emerald-200 space-y-1.5 font-medium">
              <div className="flex items-center gap-2 font-bold text-emerald-300">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>15-Minute Response Window Active</span>
              </div>
              <p className="text-slate-300">
                A customized proposal with 2026 Seattle tax calculations and seasonal menu pairing suggestions is being prepared for <strong className="text-white">{formData.email}</strong>.
              </p>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer shadow-md"
              >
                Return to Catering Showcase
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
