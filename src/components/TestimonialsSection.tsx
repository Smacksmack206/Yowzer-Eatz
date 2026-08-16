import React, { useState, useEffect } from 'react';
import { TestimonialReview } from '../types';
import { Star, CheckCircle2, MessageSquarePlus, Sparkles, X, Send, MapPin, Calendar, Users, Award } from 'lucide-react';

interface TestimonialsSectionProps {
  onOpenLeadModal?: (occasion?: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenLeadModal }) => {
  const [reviews, setReviews] = useState<TestimonialReview[]>(() => {
    try {
      const saved = localStorage.getItem('seattle_catering_reviews');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return []; // Removed INITIAL_TESTIMONIALS, defaults to empty array
  });

  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // New review form state
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newEventType, setNewEventType] = useState('Corporate Event');
  const [newDate, setNewDate] = useState('August 2026');
  const [newRating, setNewRating] = useState(5);
  const [newHoverRating, setNewHoverRating] = useState(0);
  const [newNeighborhood, setNewNeighborhood] = useState('Downtown Seattle');
  const [newGuestCount, setNewGuestCount] = useState<number>(100);
  const [newTestimonial, setNewTestimonial] = useState('');

  // Persist reviews locally
  useEffect(() => {
    try {
      localStorage.setItem('seattle_catering_reviews', JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newTestimonial.trim()) return;

    const bgColors = ['bg-emerald-600', 'bg-blue-600', 'bg-purple-600', 'bg-amber-600', 'bg-rose-600'];
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];

    const createdReview: TestimonialReview = {
      id: `rev-${Date.now()}`,
      customerName: newName.trim(),
      roleOrCompany: newRole.trim() || 'Verified Client',
      eventType: newEventType,
      date: newDate,
      rating: newRating,
      testimonial: newTestimonial.trim(),
      neighborhood: newNeighborhood,
      guestCount: newGuestCount > 0 ? newGuestCount : undefined,
      verified: true,
      avatarBg: randomBg,
    };

    setReviews([createdReview, ...reviews]);
    setSubmitSuccess(true);

    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitModalOpen(false);
      setNewName('');
      setNewRole('');
      setNewTestimonial('');
    }, 1800);
  };

  const filteredReviews = reviews.filter((rev) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'corporate') return rev.eventType.toLowerCase().includes('corporate') || rev.eventType.toLowerCase().includes('board') || rev.eventType.toLowerCase().includes('summit');
    if (selectedFilter === 'wedding') return rev.eventType.toLowerCase().includes('wedding') || rev.eventType.toLowerCase().includes('reception');
    if (selectedFilter === 'private') return rev.eventType.toLowerCase().includes('gala') || rev.eventType.toLowerCase().includes('private') || rev.eventType.toLowerCase().includes('anniversary');
    return true;
  });

  // Safeguard against division by zero if there are no reviews
  const averageRating = (
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0
  ).toFixed(1);

  return (
    <section id="testimonials-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold mb-2 border border-emerald-800/60">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Client Experiences</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
              Client Testimonials & Event Reviews
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Authentic feedback from Seattle tech headquarters, waterfront weddings, and private galas served across King County.
            </p>
          </div>

          {/* Rating Summary Metric Block */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="text-center pr-4 border-r border-slate-800">
              <div className="text-3xl font-extrabold text-white tracking-tight">{averageRating}</div>
              <div className="flex items-center justify-center gap-0.5 mt-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-[#E67E22] fill-[#E67E22]" />
                ))}
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                {reviews.length} Verified Reviews
              </div>
            </div>

            <button
              onClick={() => setIsSubmitModalOpen(true)}
              id="open-submit-review-button"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Submit A Review</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'corporate', label: 'Corporate & Tech' },
              { id: 'wedding', label: 'Weddings & Receptions' },
              { id: 'private', label: 'Galas & Private Estates' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Showing {filteredReviews.length} of {reviews.length} testimonials
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with Avatar and Rating */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${item.avatarBg || 'bg-emerald-600'} text-white flex items-center justify-center font-bold text-sm shadow-xs`}>
                      {item.customerName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-snug">
                        {item.customerName}
                      </h3>
                      {item.roleOrCompany && (
                        <p className="text-[11px] text-slate-400 line-clamp-1">{item.roleOrCompany}</p>
                      )}
                    </div>
                  </div>

                  {item.verified && (
                    <span className="inline-flex items-center gap-1 bg-emerald-950/80 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-emerald-800/60">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                {/* Star Rating & Event Details */}
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= item.rating
                          ? 'text-[#E67E22] fill-[#E67E22]'
                          : 'text-slate-700 fill-slate-800'
                      }`}
                    />
                  ))}
                  <span className="text-[11px] text-slate-400 font-bold ml-1">{item.rating}.0</span>
                </div>

                {/* Event Type & Date Tag */}
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 mb-3">
                  <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-lg font-medium text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {item.eventType} • {item.date}
                  </span>
                  {item.neighborhood && (
                    <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-lg font-medium text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {item.neighborhood}
                    </span>
                  )}
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{item.testimonial}"
                </p>
              </div>

              {/* Footer with guest count */}
              {item.guestCount && (
                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-slate-500" />
                    <span>{item.guestCount} Guests Catered</span>
                  </span>
                  <span className="text-emerald-400 font-bold">100% On-Time Setup</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-800 rounded-3xl">
            <p className="text-slate-400 text-sm">No reviews have been published yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>

      {/* Submit Review Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-800 relative my-8 animate-in fade-in zoom-in duration-200 text-slate-100">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-serif text-white">Thank You for Your Feedback!</h3>
                <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto">
                  Your testimonial has been verified and published to the live Yowzer Eatz review showcase.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Client Feedback Hub</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-white">Share Your Event Experience</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Help other King County planners discover our farm-to-table culinary services.
                  </p>
                </div>

                {/* Rating Input */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Your Overall Rating *
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        onMouseEnter={() => setNewHoverRating(star)}
                        onMouseLeave={() => setNewHoverRating(0)}
                        className="p-1 text-slate-600 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            (newHoverRating || newRating) >= star
                              ? 'text-[#E67E22] fill-[#E67E22]'
                              : 'text-slate-700 fill-slate-800'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-300 ml-2">
                      {newRating === 5 ? '5.0 - Flawless Service' : `${newRating}.0 Stars`}
                    </span>
                  </div>
                </div>

                {/* Full Name & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-700 bg-slate-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Role / Company (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Event Coordinator, Amazon"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-700 bg-slate-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Event Type & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Event Type *
                    </label>
                    <select
                      value={newEventType}
                      onChange={(e) => setNewEventType(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-700 bg-slate-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Corporate Tech Summit">Corporate Tech Summit</option>
                      <option value="Luxury Wedding">Luxury Wedding</option>
                      <option value="Executive Dinner">Executive Dinner</option>
                      <option value="Nonprofit Gala">Nonprofit Gala</option>
                      <option value="Private Estate Reception">Private Estate Reception</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Event Date / Month *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. August 2026"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-700 bg-slate-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Guest Count
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="1000"
                      value={newGuestCount}
                      onChange={(e) => setNewGuestCount(parseInt(e.target.value) || 50)}
                      className="w-full px-3 py-2 text-xs border border-slate-700 bg-slate-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Neighborhood Location */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Event Location / Neighborhood
                  </label>
                  <select
                    value={newNeighborhood}
                    onChange={(e) => setNewNeighborhood(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-700 bg-slate-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="South Lake Union (SLU)">South Lake Union (SLU)</option>
                    <option value="Downtown Seattle">Downtown Seattle</option>
                    <option value="Bellevue & Eastside">Bellevue & Eastside</option>
                    <option value="Queen Anne">Queen Anne</option>
                    <option value="Capitol Hill">Capitol Hill</option>
                    <option value="Belltown / Waterfront">Belltown / Waterfront</option>
                    <option value="Woodinville Wine Country">Woodinville Wine Country</option>
                  </select>
                </div>

                {/* Testimonial text */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Your Testimonial Review *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your culinary experience, food quality, staff professionalism, or favorite menu items..."
                    value={newTestimonial}
                    onChange={(e) => setNewTestimonial(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-700 bg-slate-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-6 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};