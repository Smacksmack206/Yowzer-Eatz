export type PageView = 'home' | 'corporate' | 'weddings' | 'licensing' | 'menu' | 'reviews' | 'calendar';

export interface DKIParams {
  utmTerm: string;
  neighborhood: string;
  campaignSource?: string;
  adGroup?: string;
}

export interface MealOption {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  popular?: boolean;
}

export interface BarTierOption {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  popular?: boolean;
}

export interface QuoteCalculation {
  guestCount: number;
  mealPricePerPerson: number;
  mealName: string;
  barPricePerPerson: number;
  barName: string;
  staffingAddon: number;
  rentalsAddon: number;
  subtotal: number;
  serviceFee: number; // 20%
  salesTaxRate: number; // 10.35% for 2026 Seattle
  salesTax: number;
  total: number;
  perPersonTotal: number;
}

export interface ComplianceCredential {
  title: string;
  agency: string;
  identifier: string;
  status: 'Active' | 'Verified' | 'Annual Inspection Passed';
  expiryDate: string;
  notes: string;
}

export interface LeadSubmission {
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  guestCount: number;
  neighborhood: string;
  notes?: string;
}

export interface TestimonialReview {
  id: string;
  customerName: string;
  roleOrCompany?: string;
  eventType: string;
  date: string;
  rating: number;
  testimonial: string;
  neighborhood?: string;
  guestCount?: number;
  verified?: boolean;
  avatarBg?: string;
}

export type AvailabilityStatus = 'available' | 'limited' | 'booked';

export interface AvailabilitySlot {
  dateStr: string; // YYYY-MM-DD
  status: AvailabilityStatus;
  lunchAvailable: boolean;
  dinnerAvailable: boolean;
  bookedEvents?: number;
  maxEventsPerDay: number;
  notes?: string;
  minimumGuests?: number;
}
