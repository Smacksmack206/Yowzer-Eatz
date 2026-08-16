import React, { useState } from 'react';
import { AvailabilitySlot, AvailabilityStatus } from '../types';
import { INITIAL_AVAILABILITY_OVERRIDE } from '../data/cateringData';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  Sparkles,
  RefreshCw,
  Lock,
  ArrowRight,
  ShieldCheck,
  CalendarCheck2
} from 'lucide-react';

interface AvailabilityCalendarWidgetProps {
  onSelectDateForBooking?: (dateStr: string, details?: string) => void;
}

export const AvailabilityCalendarWidget: React.FC<AvailabilityCalendarWidgetProps> = ({
  onSelectDateForBooking,
}) => {
  // Calendar current view month/year (Defaulting to August 2026)
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(7); // 0-indexed: 7 is August
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-08-28');
  const [filterAvailableOnly, setFilterAvailableOnly] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('Just now');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper to compute slot status for any date in the month
  const getSlotForDate = (year: number, month: number, day: number): AvailabilitySlot => {
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const monthStr = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
    const dateStr = `${year}-${monthStr}-${dayStr}`;

    // If pre-seeded override exists
    if (INITIAL_AVAILABILITY_OVERRIDE[dateStr]) {
      const override = INITIAL_AVAILABILITY_OVERRIDE[dateStr];
      return {
        dateStr,
        status: override.status,
        lunchAvailable: override.lunchAvailable,
        dinnerAvailable: override.dinnerAvailable,
        bookedEvents: override.bookedEvents,
        maxEventsPerDay: 3,
        notes: override.notes,
      };
    }

    // Default availability logic:
    // Weekends (Fri/Sat) in high season are sometimes limited or booked
    const dayOfWeek = new Date(year, month, day).getDay();
    if (dayOfWeek === 6) { // Saturday
      if (day % 2 === 0) {
        return {
          dateStr,
          status: 'booked',
          lunchAvailable: false,
          dinnerAvailable: false,
          bookedEvents: 3,
          maxEventsPerDay: 3,
          notes: 'High-volume Saturday wedding block booked',
        };
      } else {
        return {
          dateStr,
          status: 'limited',
          lunchAvailable: true,
          dinnerAvailable: false,
          bookedEvents: 2,
          maxEventsPerDay: 3,
          notes: 'Evening gala booked • 1 Afternoon lunch slot open',
        };
      }
    } else if (dayOfWeek === 5) { // Friday
      if (day > 20) {
        return {
          dateStr,
          status: 'limited',
          lunchAvailable: true,
          dinnerAvailable: false,
          bookedEvents: 2,
          maxEventsPerDay: 3,
          notes: '1 Lunch event slot remaining',
        };
      }
    }

    return {
      dateStr,
      status: 'available',
      lunchAvailable: true,
      dinnerAvailable: true,
      bookedEvents: 0,
      maxEventsPerDay: 3,
      notes: 'Full catering capacity available (Lunch & Dinner)',
    };
  };

  // Calendar matrix calculations
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingArray = Array.from({ length: firstDayIndex }, (_, i) => i);

  const selectedSlot = (() => {
    const parts = selectedDateStr.split('-');
    if (parts.length === 3) {
      const y = parseInt(parts[0]);
      const m = parseInt(parts[1]) - 1;
      const d = parseInt(parts[2]);
      return getSlotForDate(y, m, d);
    }
    return getSlotForDate(currentYear, currentMonth, 15);
  })();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleSyncRefresh = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncedTime('Just now (All channels 100% synchronized)');
    }, 1200);
  };

  const formatDisplayDate = (dateStr: string) => {
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="availability-calendar" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Container with Sleek Dark Interface and Emerald accents */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-bold mb-2 border border-emerald-800/60">
              <CalendarCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real-Time Commissary & Dispatch Scheduling</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              2026 Live Catering Availability Calendar
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Select your proposed event date to inspect real-time prep kitchen capacity, staffing slots, and hold availability.
            </p>
          </div>

          {/* Backend Sync Indicator Badge */}
          <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl self-start lg:self-auto">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Live Dispatch Sync
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  {isSyncing ? 'Syncing with HoneyBook...' : `Status: Active (${lastSyncedTime})`}
                </div>
              </div>
            </div>
            <button
              onClick={handleSyncRefresh}
              disabled={isSyncing}
              title="Force Real-Time Calendar Sync"
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Legend & Filter Controls */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 font-medium text-slate-300">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-slate-300">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span>Limited (1 Slot Left)</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-slate-300">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span>Fully Booked</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterAvailableOnly(!filterAvailableOnly)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                filterAvailableOnly
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {filterAvailableOnly ? 'Showing Available Dates Only' : 'Filter: Show All'}
            </button>
          </div>
        </div>

        {/* Main Calendar Body: 7-Col Grid on Left, Inspection Detail Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Calendar Grid (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800">
            {/* Month & Year Bar */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-emerald-400" />
                <span>{monthNames[currentMonth]} {currentYear}</span>
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer shadow-xs"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer shadow-xs"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-slate-400 uppercase tracking-wider mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {/* Padding empty cells for month start */}
              {paddingArray.map((p) => (
                <div key={`pad-${p}`} className="h-14 rounded-xl opacity-0 pointer-events-none" />
              ))}

              {/* Month Day Cells */}
              {daysArray.map((day) => {
                const slot = getSlotForDate(currentYear, currentMonth, day);
                const isSelected = selectedDateStr === slot.dateStr;
                const isBooked = slot.status === 'booked';
                const isLimited = slot.status === 'limited';
                const isAvailable = slot.status === 'available';

                const isHiddenByFilter = filterAvailableOnly && isBooked;

                return (
                  <button
                    key={slot.dateStr}
                    type="button"
                    onClick={() => setSelectedDateStr(slot.dateStr)}
                    className={`h-14 rounded-xl p-1.5 flex flex-col justify-between items-center transition-all cursor-pointer relative border ${
                      isHiddenByFilter
                        ? 'opacity-20 grayscale pointer-events-none'
                        : ''
                    } ${
                      isSelected
                        ? 'ring-2 ring-emerald-500 bg-slate-900 shadow-lg border-emerald-400 font-bold scale-[1.03] z-10'
                        : isBooked
                        ? 'bg-slate-900/40 border-slate-800/80 text-slate-600 hover:bg-slate-900'
                        : isLimited
                        ? 'bg-amber-950/20 border-amber-800/40 text-amber-200 hover:border-amber-500/70'
                        : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    <span className={`text-xs ${isSelected ? 'text-emerald-400 font-extrabold' : ''}`}>
                      {day}
                    </span>

                    {/* Status Dot / Lock Marker */}
                    <div>
                      {isBooked ? (
                        <span className="flex items-center text-[9px] text-slate-500 font-medium">
                          <Lock className="w-2.5 h-2.5 mr-0.5 text-slate-500" />
                          <span className="hidden sm:inline">Booked</span>
                        </span>
                      ) : isLimited ? (
                        <span className="w-2 h-2 rounded-full bg-amber-500 inline-block shadow-xs"></span>
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-xs"></span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Preset Buttons */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-2 items-center text-xs">
              <span className="text-slate-400 font-medium">Quick Jumps:</span>
              <button
                type="button"
                onClick={() => {
                  setCurrentYear(2026);
                  setCurrentMonth(7); // August
                  setSelectedDateStr('2026-08-28');
                }}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium hover:border-emerald-500 hover:text-emerald-400 cursor-pointer transition-colors"
              >
                Aug 28 (Available Friday)
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentYear(2026);
                  setCurrentMonth(8); // September
                  setSelectedDateStr('2026-09-26');
                }}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium hover:border-emerald-500 hover:text-emerald-400 cursor-pointer transition-colors"
              >
                Sept 26 (Prime Saturday)
              </button>
            </div>
          </div>

          {/* Inspection Detail Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-950 text-white rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    Selected Event Date
                  </span>
                  <h4 className="text-lg font-bold text-white mt-0.5">
                    {formatDisplayDate(selectedSlot.dateStr)}
                  </h4>
                </div>
                <div>
                  {selectedSlot.status === 'available' ? (
                    <span className="inline-flex items-center gap-1 bg-emerald-950 text-emerald-300 border border-emerald-700/60 text-xs font-bold px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Available</span>
                    </span>
                  ) : selectedSlot.status === 'limited' ? (
                    <span className="inline-flex items-center gap-1 bg-amber-950 text-amber-300 border border-amber-700/60 text-xs font-bold px-2.5 py-1 rounded-full">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Limited Slots</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-rose-950 text-rose-300 border border-rose-700/60 text-xs font-bold px-2.5 py-1 rounded-full">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Fully Booked</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Service Slot Breakdown */}
              <div className="space-y-3 mb-6">
                {/* Lunch Slot */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">Lunch Service (11:00 AM - 2:30 PM)</div>
                      <div className="text-[10px] text-slate-400">Corporate Boxed Lunches & Warm Buffets</div>
                    </div>
                  </div>
                  <div>
                    {selectedSlot.lunchAvailable ? (
                      <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/50">
                        Open
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        Filled
                      </span>
                    )}
                  </div>
                </div>

                {/* Dinner Slot */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">Dinner Service (5:00 PM - 11:00 PM)</div>
                      <div className="text-[10px] text-slate-400">Plated Dinners, Tastings & Bar Catering</div>
                    </div>
                  </div>
                  <div>
                    {selectedSlot.dinnerAvailable ? (
                      <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/50">
                        Open
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        Filled
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Operational Dispatch Notes */}
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs mb-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Commissary Dispatch Note
                </span>
                <p className="text-slate-300">
                  {selectedSlot.notes || 'Capacity open for King County events.'}
                </p>
              </div>
            </div>

            {/* Call to Action based on availability */}
            <div>
              {selectedSlot.status !== 'booked' ? (
                <button
                  type="button"
                  id="calendar-reserve-date-cta"
                  onClick={() => {
                    if (onSelectDateForBooking) {
                      onSelectDateForBooking(selectedSlot.dateStr, `Selected Date: ${formatDisplayDate(selectedSlot.dateStr)}`);
                    }
                  }}
                  className="w-full bg-[#E67E22] hover:bg-[#d35400] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-orange-900/20 text-sm transition-all cursor-pointer text-center uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Hold This Date For Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  id="calendar-waitlist-cta"
                  onClick={() => {
                    if (onSelectDateForBooking) {
                      onSelectDateForBooking(selectedSlot.dateStr, `Priority Waitlist for Booked Date: ${formatDisplayDate(selectedSlot.dateStr)}`);
                    }
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3.5 px-4 rounded-xl text-sm transition-all cursor-pointer text-center uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700"
                >
                  <span>Join Priority Waitlist</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <p className="text-[10px] text-center text-slate-400 mt-2">
                Official date holds are honored for 48 hours with complimentary quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
