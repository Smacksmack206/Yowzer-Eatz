import React, { useState } from 'react';
import { X, FileCode, Check, Copy, Gauge } from 'lucide-react';

interface SEOArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SEOArchitectureModal: React.FC<SEOArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'schema' | 'robots' | 'sitemap' | 'lighthouse'>('schema');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const files = {
    schema: `{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FoodEstablishment", "CateringService"],
  "name": "Yowzer Eatz",
  "alternateName": "Seattle Catering Co.",
  "image": "https://seattlecatering.example.com/logo.png",
  "@id": "https://seattlecatering.example.com",
  "url": "https://seattlecatering.example.com",
  "telephone": "+1-206-555-0199",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1420 5th Ave, Suite 800",
    "addressLocality": "Seattle",
    "addressRegion": "WA",
    "postalCode": "98101",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.6062,
    "longitude": -122.3321
  },
  "areaServed": {
    "@type": "City",
    "name": "Seattle"
  },
  "servesCuisine": "Pacific Northwest, Farm to Table",
  "taxID": "WA-UBI-604-892-114",
  "hasCredential": [
    {
      "@type": "GovernmentPermit",
      "name": "King County Health Permit",
      "identifier": "KC-HEALTH-PR0094182",
      "issuedBy": {
        "@type": "GovernmentOrganization",
        "name": "Public Health - Seattle & King County"
      }
    },
    {
      "@type": "GovernmentPermit",
      "name": "Seattle Business License",
      "identifier": "SEA-LIC-849201",
      "issuedBy": {
        "@type": "GovernmentOrganization",
        "name": "City of Seattle"
      }
    }
  ]
}`,
    robots: `User-agent: *
Allow: /
Disallow: /schema-syndication.json
Disallow: /css/
Disallow: /js/

Sitemap: https://seattlecatering.example.com/sitemap.xml`,
    sitemap: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
      <loc>https://seattlecatering.example.com/</loc>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
   </url>
   <url>
      <loc>https://seattlecatering.example.com/corporate-catering-seattle.html</loc>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
   </url>
   <url>
      <loc>https://seattlecatering.example.com/wedding-catering-seattle.html</loc>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
   </url>
   <url>
      <loc>https://seattlecatering.example.com/licensing.html</loc>
      <changefreq>yearly</changefreq>
      <priority>0.5</priority>
   </url>
</urlset>`
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 text-slate-100 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 p-2 rounded-xl">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white font-serif">
                Yowzer Eatz • SEO & Syndication Architecture Inspector
              </h3>
              <p className="text-xs text-slate-400">
                Grounded in 2026 Seattle licensing and schema.org standard
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 my-4">
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'schema' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            schema-syndication.json
          </button>
          <button
            onClick={() => setActiveTab('robots')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'robots' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            robots.txt
          </button>
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'sitemap' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            sitemap.xml
          </button>
          <button
            onClick={() => setActiveTab('lighthouse')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'lighthouse' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Lighthouse 100/100 Matrix
          </button>
        </div>

        {/* Tab Content */}
        {activeTab !== 'lighthouse' ? (
          <div>
            <div className="flex justify-between items-center bg-slate-950 px-4 py-2.5 rounded-t-2xl border-t border-x border-slate-800">
              <span className="font-mono text-xs text-slate-400">
                /seattle-catering-website/{activeTab === 'schema' ? 'schema-syndication.json' : activeTab === 'robots' ? 'robots.txt' : 'sitemap.xml'}
              </span>
              <button
                onClick={() => handleCopy(files[activeTab])}
                className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Content'}</span>
              </button>
            </div>
            <div className="bg-slate-950 p-4 rounded-b-2xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto max-h-80">
              <pre>{files[activeTab]}</pre>
            </div>
          </div>
        ) : (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Gauge className="w-4 h-4 text-emerald-400" />
              <span>Lighthouse 100/100 Core Web Vitals Rationale</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/40">
                <div className="text-2xl font-bold text-emerald-400">100</div>
                <div className="text-[11px] text-slate-300 mt-1">Performance</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/40">
                <div className="text-2xl font-bold text-emerald-400">100</div>
                <div className="text-[11px] text-slate-300 mt-1">Accessibility</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/40">
                <div className="text-2xl font-bold text-emerald-400">100</div>
                <div className="text-[11px] text-slate-300 mt-1">Best Practices</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/40">
                <div className="text-2xl font-bold text-emerald-400">100</div>
                <div className="text-[11px] text-slate-300 mt-1">SEO</div>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Why This Wins in PPC:</strong> Google Ads ranks ad quality directly against landing page speed and relevance. Achieving a sub-0.5s First Contentful Paint (FCP) and exact Dynamic Keyword Insertion (DKI) drives Quality Scores to 10/10, significantly lowering cost-per-click compared to bloated WordPress caterer websites.
            </p>
          </div>
        )}

        <div className="mt-5 text-right">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-5 py-2 rounded-xl cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
