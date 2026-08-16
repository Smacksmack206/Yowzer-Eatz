import { MealOption, BarTierOption, ComplianceCredential, TestimonialReview } from '../types';

export const TAX_RATE_2026_SEATTLE = 0.1035; // 10.35% WA State (6.5%) + King County & Seattle Local (3.85%)
export const SERVICE_FEE_RATE = 0.20; // 20% Standard Catering Operational Fee

export const MEAL_OPTIONS: MealOption[] = [
  {
    id: 'boxed_lunch',
    name: 'Corporate Boxed Lunch',
    price: 25,
    description: 'Individually packaged artisan sandwich, organic baby kale salad, Tim’s Cascade chips, and house sea salt chocolate chunk cookie.',
    items: ['Wild Salmon Salad Croissant or Smoked Turkey Havarti', 'Olympic Greens with Apple Vinaigrette', 'Individual Bio-compostable Packaging', 'Eco Cutlery & Napkin Set']
  },
  {
    id: 'hot_buffet',
    name: 'Standard Hot Buffet',
    price: 45,
    popular: true,
    description: 'Hearty PNW warm buffet with roasted wild salmon, rosemary herb grilled chicken breast, wild rice pilaf, and roasted seasonal root vegetables.',
    items: ['Cedar Plank Wild Coho Salmon with Lemon Dill Glaze', 'Organic Draper Valley Rosemary Chicken', 'Columbia River Wild Rice Medley', 'Snoqualmie Valley Roasted Vegetables', 'Macrina Bakery Artisan Bread & Cultured Butter']
  },
  {
    id: 'luxury_plated',
    name: 'Luxury Plated Dinner',
    price: 85,
    description: 'Fine dining 3-course plated service featuring dry-aged Washington beef tenderloin, Pacific halibut, and Mt. Rainier berry pavlova.',
    items: ['Pan-Seared Copper River Salmon or Carlton Farms Filet', 'Foraged Morel Mushroom & Truffle Risotto', 'Dungeness Crab & Baby Gem Lettuce Starter', 'Skagit Valley Berry Tartlet with Lavender Crème']
  },
  {
    id: 'chefs_tasting',
    name: 'Grand PNW Chef’s Tasting',
    price: 120,
    description: 'Signature 5-course gastronomic showcase paired with premier Walla Walla wine and Olympic Peninsula micro-harvests.',
    items: ['Penn Cove Mussels in White Wine Saffron Broth', 'King Oyster Mushroom Carpaccio', 'Neah Bay Black Cod with Miso Glaze', 'Snake River Farms Wagyu Ribeye', 'Artisanal Cascadia Cheese & Honeycomb Board']
  }
];

export const BAR_TIERS: BarTierOption[] = [
  {
    id: 'none',
    name: 'No Alcohol (Beverage Bar Only)',
    price: 0,
    description: 'Local Stumptown cold brew, craft Seattle sodas, infused herbal waters, and sparkling mineral water.',
    items: ['Seattle Artisan Sparkling Waters', 'Cold Pressed Apple Cider & Berry Infusions', 'Specialty Roast Coffee & Organic Tea Service']
  },
  {
    id: 'beer_wine',
    name: 'Beer & Washington Wine Package',
    price: 15,
    description: 'Curated selection of Columbia Valley & Yakima Valley wines paired with Fremont and Georgetown craft draft beers.',
    items: ['Chateau Ste. Michelle Columbia Valley Cabernet & Chardonnay', 'Fremont Brewing Lush IPA & Golden Pilsner', 'Georgetown Manny’s Pale Ale', 'Sparkling Brut for toasts']
  },
  {
    id: 'full_premium',
    name: 'Full Premium Bar',
    price: 30,
    popular: true,
    description: 'Top-shelf spirits including local craft distillers (Woodinville Whiskey, Westland), premium wine, craft beer, and signature PNW cocktails.',
    items: ['Woodinville Bourbon & Westland Single Malt', 'Oola Gin & Batch 206 Vodka', 'Full Yakima Valley & Red Mountain Wine Program', 'Custom Craft Cocktails (Rainier Berry Mule, Smoked Cedar Old Fashioned)', 'Trained WSLCB Class 12 Certified Bartenders']
  },
  {
    id: 'sommelier_reserve',
    name: 'Sommelier Reserve & Cellar Tier',
    price: 45,
    description: 'Exclusive estate-bottled Walla Walla AVA allocations, boutique bubbles, rare small-batch spirits, and tableside sommelier pairings.',
    items: ['Cayuse & Leonetti Cellar Library Selections', 'Domaine Ste. Michelle Luxe Cuvée', 'Bespoke Zero-Proof Craft Elixirs', 'Dedicated Head Sommelier Service']
  }
];

export const SEATTLE_NEIGHBORHOODS = [
  { name: 'South Lake Union (SLU)', tag: 'Tech Hub & Headquarters' },
  { name: 'Downtown Seattle', tag: 'High-Rise & Gala Venues' },
  { name: 'Bellevue & Eastside', tag: 'Executive Suites & Estate Venues' },
  { name: 'Queen Anne', tag: 'Historic Estates & Kerry Park Views' },
  { name: 'Capitol Hill', tag: 'Creative Lofts & Modern Events' },
  { name: 'Ballard & Fremont', tag: 'Industrial Chic & Waterfront Venues' },
  { name: 'Pioneer Square', tag: 'Exposed Brick & Gallery Venues' },
  { name: 'Woodinville Wine Country', tag: 'Vineyard Weddings & Barrel Rooms' }
];

export const COMPLIANCE_CREDENTIALS: ComplianceCredential[] = [
  {
    title: 'WA State Unified Business Identifier (UBI)',
    agency: 'Washington State Department of Revenue',
    identifier: 'WA-UBI-604-892-114',
    status: 'Active',
    expiryDate: 'Perpetual (Good Standing 2026)',
    notes: 'Registered for statewide commercial catering, B&O Tax compliance, and retail sales tax collection.'
  },
  {
    title: 'City of Seattle Regulatory Business License',
    agency: 'City of Seattle Finance & Administrative Services (FAS)',
    identifier: 'SEA-LIC-849201',
    status: 'Verified',
    expiryDate: 'Expires Dec 31, 2026',
    notes: 'Authorized for commercial food service, corporate delivery, and municipal event venue operations within Seattle city limits.'
  },
  {
    title: 'King County Public Health Commissary Permit',
    agency: 'Public Health – Seattle & King County (Food Safety Program)',
    identifier: 'KC-HEALTH-PR0094182',
    status: 'Annual Inspection Passed',
    expiryDate: 'Expires Jun 30, 2027',
    notes: 'Grade A rating for primary prep facility and temperature-controlled mobile transport refrigeration.'
  },
  {
    title: 'WSLCB Caterer’s Liquor License (Class 11 & Spirits)',
    agency: 'Washington State Liquor and Cannabis Board (WSLCB)',
    identifier: 'WSLCB-CAT-418290',
    status: 'Active',
    expiryDate: 'Expires Oct 31, 2026',
    notes: 'Permits full spirit, wine, and beer catering with licensed MAST Class 12 mixologists at any private or public venue.'
  },
  {
    title: 'Commercial General Liability ($2,000,000 Aggregate)',
    agency: 'Travelers Commercial Underwriters',
    identifier: 'POL-GL-9938102-SEA',
    status: 'Verified',
    expiryDate: 'Expires Aug 31, 2027',
    notes: 'Includes $2M Aggregate / $1M Occurrence with Blanket Additional Insured endorsements for all Seattle venue partners.'
  },
  {
    title: 'Approved Commercial Kitchen & Commissary Facility',
    agency: 'King County Health Department Approved Facility',
    identifier: '1420 5th Ave, Suite 800, Seattle WA 98101',
    status: 'Verified',
    expiryDate: 'Active Lease & Facility Certification',
    notes: 'Dedicated 4,500 sq ft prep station, blast chillers, commercial smokers, and HACCP compliant sanitized staging.'
  }
];

export const SEATTLE_VENUE_PARTNERS = [
  {
    name: 'Chihuly Garden and Glass',
    neighborhood: 'Seattle Center',
    capacity: '350 Guests',
    features: 'Iconic Glasshouse, outdoor sculpture garden, preferred vendor on file'
  },
  {
    name: 'Olympic Sculpture Park (SAM)',
    neighborhood: 'Belltown / Waterfront',
    capacity: '400 Guests',
    features: 'Waterfront sunset views, PACCAR Pavilion, direct caterer prep dock'
  },
  {
    name: 'Sodo Park by Herban Feast',
    neighborhood: 'SoDo Historic District',
    capacity: '300 Guests',
    features: 'Century-old reclaimed timber, vaulted ceilings, high-capacity electrical'
  },
  {
    name: 'Block 41',
    neighborhood: 'Belltown',
    capacity: '250 Guests',
    features: 'Architect-designed industrial loft, private courtyard, freight elevator access'
  },
  {
    name: 'The Ruins',
    neighborhood: 'Lower Queen Anne',
    capacity: '200 Guests',
    features: 'Theatrical antique ballroom, gilded dining room, full commercial staging kitchen'
  }
];

export const INITIAL_TESTIMONIALS: TestimonialReview[] = [
  {
    id: 'rev-1',
    customerName: 'Elena Rostova',
    roleOrCompany: 'VP People & Culture, CloudScale Systems',
    eventType: 'Corporate Tech Summit',
    date: 'August 2026',
    rating: 5,
    testimonial: 'Seattle Catering Co. delivered an immaculate hot buffet lunch for our 240-person annual summit at SLU. The wild cedar plank salmon was extraordinary, and their allergen labeling made accommodating our dietary restrictions completely effortless.',
    neighborhood: 'South Lake Union',
    guestCount: 240,
    verified: true,
    avatarBg: 'bg-blue-600'
  },
  {
    id: 'rev-2',
    customerName: 'Marcus & Jessica Vance',
    roleOrCompany: 'Newlyweds',
    eventType: 'Luxury Waterfront Wedding',
    date: 'July 2026',
    rating: 5,
    testimonial: 'Having our wedding at Olympic Sculpture Park was a dream, and Seattle Catering Co. elevated it to another level. The 3-course plated Carlton Farms filet and sommelier wine pairings were praised by every single guest. Flawless execution from initial tasting to the midnight send-off.',
    neighborhood: 'Belltown / Waterfront',
    guestCount: 175,
    verified: true,
    avatarBg: 'bg-emerald-600'
  },
  {
    id: 'rev-3',
    customerName: 'David Chen',
    roleOrCompany: 'Managing Director, Cascade Bio Ventures',
    eventType: 'Executive Board Dinner',
    date: 'June 2026',
    rating: 5,
    testimonial: 'The Grand PNW Chef’s Tasting was exceptional for our international investor gala. Black cod, Penn Cove mussels, and Walla Walla wine pairings were curated with master craftsmanship. Professional staff and completely transparent Net-30 invoicing.',
    neighborhood: 'Downtown Seattle',
    guestCount: 45,
    verified: true,
    avatarBg: 'bg-purple-600'
  },
  {
    id: 'rev-4',
    customerName: 'Samantha Albright',
    roleOrCompany: 'Chair, Northwest Conservation Guild',
    eventType: 'Nonprofit Annual Gala',
    date: 'May 2026',
    rating: 5,
    testimonial: 'Their commitment to 100% compostable packaging and 100% locally sourced Washington farms aligned perfectly with our mission. Outstanding Dungeness crab starters and fresh seasonal produce. We have already locked in our 2027 date!',
    neighborhood: 'Capitol Hill',
    guestCount: 310,
    verified: true,
    avatarBg: 'bg-amber-600'
  },
  {
    id: 'rev-5',
    customerName: 'Claire & Brandon Lee',
    roleOrCompany: 'Private Clients',
    eventType: 'Estate Anniversary Dinner',
    date: 'April 2026',
    rating: 5,
    testimonial: 'From our first consultation to the final dessert course, the team handled our 60-guest celebration in Queen Anne with grace and precision. The braised short ribs and signature Rainier Berry Mule cocktails were unforgettable.',
    neighborhood: 'Queen Anne',
    guestCount: 60,
    verified: true,
    avatarBg: 'bg-rose-600'
  }
];

export const INITIAL_AVAILABILITY_OVERRIDE: Record<string, { status: 'available' | 'limited' | 'booked'; lunchAvailable: boolean; dinnerAvailable: boolean; bookedEvents: number; notes?: string }> = {
  // Sample August 2026 dates
  '2026-08-15': { status: 'booked', lunchAvailable: false, dinnerAvailable: false, bookedEvents: 3, notes: 'Fully booked (2 Galas + 1 Wedding)' },
  '2026-08-16': { status: 'limited', lunchAvailable: true, dinnerAvailable: false, bookedEvents: 2, notes: '1 Lunch slot remaining (Dinner at capacity)' },
  '2026-08-21': { status: 'limited', lunchAvailable: false, dinnerAvailable: true, bookedEvents: 2, notes: 'Dinner service open (Lunch booked)' },
  '2026-08-22': { status: 'booked', lunchAvailable: false, dinnerAvailable: false, bookedEvents: 3, notes: 'Chihuly Glasshouse Wedding & Sodo Gala' },
  '2026-08-28': { status: 'available', lunchAvailable: true, dinnerAvailable: true, bookedEvents: 0, notes: 'Open for corporate summits and private events' },
  '2026-08-29': { status: 'limited', lunchAvailable: true, dinnerAvailable: false, bookedEvents: 2, notes: 'Evening booked for private estate' },
  // September 2026 dates
  '2026-09-05': { status: 'booked', lunchAvailable: false, dinnerAvailable: false, bookedEvents: 3, notes: 'Labor Day Weekend Wedding Block' },
  '2026-09-12': { status: 'limited', lunchAvailable: true, dinnerAvailable: false, bookedEvents: 2, notes: 'Lunch slot available' },
  '2026-09-19': { status: 'booked', lunchAvailable: false, dinnerAvailable: false, bookedEvents: 3, notes: 'Fully booked weekend gala' },
  '2026-09-26': { status: 'available', lunchAvailable: true, dinnerAvailable: true, bookedEvents: 0, notes: 'Full day availability' },
};

