/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView, DKIParams } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CostEstimatorWidget } from './components/CostEstimatorWidget';
import { CorporateView } from './components/CorporateView';
import { WeddingView } from './components/WeddingView';
import { LicensingHubView } from './components/LicensingHubView';
import { MenuCatalogView } from './components/MenuCatalogView';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AvailabilityCalendarWidget } from './components/AvailabilityCalendarWidget';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { SEOArchitectureModal } from './components/SEOArchitectureModal';
import { Footer } from './components/Footer';
import { Utensils, Award, Users, ShieldCheck, Heart, Sparkles, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [seoModalOpen, setSeoModalOpen] = useState(false);
  const [leadModalDefaultType, setLeadModalDefaultType] = useState<string>('');
  const [leadModalDefaultDate, setLeadModalDefaultDate] = useState<string>('');

  // Dynamic Keyword Insertion State initialized from URL search params
  const [dki, setDki] = useState<DKIParams>({
    utmTerm: '',
    neighborhood: '',
    campaignSource: '',
    adGroup: '',
  });

  useEffect(() => {
    // 1. Read URL Search Parameters for Dynamic Keyword Insertion (DKI) Engine
    const urlParams = new URLSearchParams(window.location.search);
    const utmTerm = urlParams.get('utm_term') || urlParams.get('utm_campaign') || '';
    const neighborhood = urlParams.get('neighborhood') || '';
    const page = urlParams.get('page') as PageView;

    if (utmTerm || neighborhood) {
      setDki({
        utmTerm: utmTerm || 'Seattle Farm to Table Catering',
        neighborhood: neighborhood || '',
      });
    } else {
      setDki({
        utmTerm: 'Seattle Farm to Table Catering',
        neighborhood: '',
      });
    }

    if (page && ['home', 'corporate', 'weddings', 'licensing', 'menu', 'reviews', 'calendar'].includes(page)) {
      setCurrentView(page);
    }
  }, []);

  const handleUpdateDki = (newDki: Partial<DKIParams>) => {
    setDki((prev) => ({ ...prev, ...newDki }));
  };

  const handleOpenLeadModal = (defaultType?: string, defaultDate?: string) => {
    setLeadModalDefaultType(defaultType || '');
    setLeadModalDefaultDate(defaultDate || '');
    setLeadModalOpen(true);
  };

  const handleScrollToEstimator = () => {
    // If not on home or corporate or wedding, switch to home first
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('catering-estimator');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('catering-estimator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCalendar = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('availability-calendar');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('availability-calendar');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Main Home Page specific content
  const renderHomeContent = () => (
    <div className="space-y-16">
      {/* 1. Dynamic Hero */}
      <HeroSection
        dki={dki}
        onOpenLeadModal={() => handleOpenLeadModal('General Catering Inquiry')}
        onNavigate={setCurrentView}
        onScrollToEstimator={handleScrollToEstimator}
      />

      {/* 2. Core Service Offerings Trio */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Pacific Northwest Catering Excellence
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Tailored culinary experiences prepared in our King County-certified commercial kitchen, featuring 100% sustainable local ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Corporate */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/40 text-blue-400 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Corporate & Tech Lunches
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Seamless Net-30 executive box lunches, hot buffets, and all-hands catering for tech headquarters across SLU, Downtown, and Bellevue.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">From $25 / person</span>
              <button
                onClick={() => setCurrentView('corporate')}
                className="text-xs font-bold text-slate-200 hover:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View Corporate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Weddings */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border-2 border-emerald-500/80 shadow-lg flex flex-col justify-between relative bg-gradient-to-b from-emerald-950/30 to-slate-900">
            <div className="absolute -top-3 right-6 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
              Popular 2026
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Luxury Weddings & Galas
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Multi-course plated dinners, sommelier-curated Washington wine pairings, and private tastings coordinated with premier Seattle venues.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">From $85 / person</span>
              <button
                onClick={() => setCurrentView('weddings')}
                className="text-xs font-bold text-slate-200 hover:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View Weddings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Licensing & Compliance */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-800/40 text-amber-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Licensing & Venue Syndication
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Instant machine-readable JSON-LD Schema snippet, $2M commercial liability insurance on file, and King County Health permit verification.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono">UBI-604-892-114</span>
              <button
                onClick={() => setCurrentView('licensing')}
                className="text-xs font-bold text-slate-200 hover:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Compliance Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Real-Time Availability Calendar Widget */}
      <AvailabilityCalendarWidget
        onSelectDateForBooking={(dateStr, details) =>
          handleOpenLeadModal(details || `Reservation Hold for ${dateStr}`, dateStr)
        }
      />

      {/* 4. The 2026 Instant Cost Estimator Widget */}
      <CostEstimatorWidget
        onOpenLeadModalWithQuote={(q) =>
          handleOpenLeadModal(`Quote for ${q.guestCount} guests (${q.meal})`)
        }
      />

      {/* 5. Customer Testimonials & Reviews Section */}
      <TestimonialsSection
        onOpenLeadModal={(occasion) => handleOpenLeadModal(occasion || 'General Inquiry')}
      />

      {/* 6. Why Choose Seattle Catering Co. */}
      <section className="bg-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              The Pacific Northwest Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Grounded in Integrity, Craft, & 2026 Compliance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-amber-400 font-bold text-lg mb-1">100% Zero-Surprise</div>
              <p className="text-xs text-slate-300">
                Itemized 10.35% WA/Seattle sales tax and 20% hospitality fees up front. Never hidden back-end additions.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-emerald-400 font-bold text-lg mb-1">Grade 'A' Commissary</div>
              <p className="text-xs text-slate-300">
                Fully permitted commercial commissary kitchen at 1420 5th Ave in Downtown Seattle.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-blue-400 font-bold text-lg mb-1">WSLCB Licensed</div>
              <p className="text-xs text-slate-300">
                Full class 11 liquor & spirits catering endorsement with MAST certified Seattle mixologists.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-purple-400 font-bold text-lg mb-1">15-Min Response</div>
              <p className="text-xs text-slate-300">
                Dedicated event dispatch team ensures lightning fast quote turnaround during business hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col font-sans">
      {/* 1. Main Site Header */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenLeadModal={() => handleOpenLeadModal()}
        dkiNeighborhood={dki.neighborhood}
      />

      {/* 2. Page Body Switcher */}
      <main className="flex-1">
        {currentView === 'home' && renderHomeContent()}
        {currentView === 'corporate' && (
          <CorporateView
            onOpenLeadModal={handleOpenLeadModal}
            onScrollToEstimator={handleScrollToEstimator}
          />
        )}
        {currentView === 'weddings' && (
          <WeddingView
            onOpenLeadModal={handleOpenLeadModal}
            onScrollToEstimator={handleScrollToEstimator}
          />
        )}
        {currentView === 'menu' && (
          <MenuCatalogView
            onOpenLeadModal={handleOpenLeadModal}
            onScrollToEstimator={handleScrollToEstimator}
          />
        )}
        {currentView === 'licensing' && <LicensingHubView />}
        {currentView === 'calendar' && (
          <div className="py-6">
            <AvailabilityCalendarWidget
              onSelectDateForBooking={(dateStr, details) =>
                handleOpenLeadModal(details || `Reservation Hold for ${dateStr}`, dateStr)
              }
            />
          </div>
        )}
        {currentView === 'reviews' && (
          <div className="py-6">
            <TestimonialsSection
              onOpenLeadModal={(occasion) => handleOpenLeadModal(occasion || 'General Inquiry')}
            />
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <Footer
        onNavigate={setCurrentView}
        onOpenLeadModal={() => handleOpenLeadModal()}
      />

      {/* 4. Modals */}
      <LeadCaptureModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        defaultOccasion={leadModalDefaultType}
        defaultDate={leadModalDefaultDate}
        dkiNeighborhood={dki.neighborhood}
      />

      <SEOArchitectureModal
        isOpen={seoModalOpen}
        onClose={() => setSeoModalOpen(false)}
      />
    </div>
  );
}
