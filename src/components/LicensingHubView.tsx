import React, { useState } from 'react';
import { ShieldCheck, Check, Copy, FileCode, Download, CheckCircle2, Sparkles } from 'lucide-react';

export const LicensingHubView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'table' | 'schema' | 'packet'>('table');

  const schemaSnippet = `{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FoodEstablishment", "CateringService"],
  "name": "Yowzer Eatz Seattle Catering",
  "image": "https://yowzereatz.com/images/catering-hero.jpg",
  "@id": "https://yowzereatz.com",
  "url": "https://yowzereatz.com",
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
}`;

  const handleCopySchema = () => {
    navigator.clipboard.writeText(schemaSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 3500);
  };

  const handleDownloadPacket = () => {
    const textData = `YOWZER EATZ SEATTLE CATERING - VENUE COMPLIANCE & SYNDICATION PACKET (2026)
========================================================================
Company Legal Entity: Yowzer Eatz LLC
Primary Operating Address: 1420 5th Ave, Suite 800, Seattle WA 98101
Direct Phone: (206) 555-0199 | Inquiries: compliance@yowzereatz.com

REGULATORY LICENSES & VERIFICATIONS:
1. Washington State UBI: WA-UBI-604-892-114 (Dept of Revenue)
2. City of Seattle Regulatory License: SEA-LIC-849201 (FAS Seattle)
3. King County Health Commissary Permit: KC-HEALTH-PR0094182 (Grade A Rating)
4. WSLCB Caterer's Liquor License: WSLCB-CAT-418290 (Spirits/Beer/Wine)
5. General Liability Policy: POL-GL-9938102-SEA ($2,000,000 Aggregate)

JSON-LD SYNDICATION ENDPOINT:
https://yowzereatz.com/schema-syndication.json`;

    const blob = new Blob([textData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Yowzer-Eatz-Compliance-Packet-2026.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Introduction */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold mb-3 border border-emerald-800/60">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Municipal & Venue Compliance Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
          Official Licensing & Syndication Hub
        </h1>
        <p className="mt-3 text-slate-300 max-w-3xl text-base leading-relaxed">
          For venue directors, event aggregators, and municipal compliance officers. Our operations are fully licensed and insured within the City of Seattle and King County.
        </p>

        {/* View mode toggle */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'table'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>Official Credentials Table</span>
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'schema'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Machine-Readable JSON-LD</span>
          </button>
          <button
            onClick={handleDownloadPacket}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all flex items-center gap-1.5 ml-auto border border-slate-700 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Download Compliance Packet (.txt)</span>
          </button>
        </div>
      </div>

      {/* 1. Official Credentials Table */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              King County & Washington State Certifications
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified compliant with 2026 Department of Revenue and King County Food Safety protocols.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> All Current
          </span>
        </div>

        {/* 2-Column Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="border border-slate-800 bg-slate-950 p-3.5 rounded-2xl">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">WA State UBI</p>
            <p className="text-sm font-mono font-bold text-white mt-0.5">604-892-114</p>
          </div>
          <div className="border border-slate-800 bg-slate-950 p-3.5 rounded-2xl">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">King County Permit</p>
            <p className="text-sm font-mono font-bold text-emerald-400 mt-0.5">KC-HEALTH-PR0094182</p>
          </div>
          <div className="border border-slate-800 bg-slate-950 p-3.5 rounded-2xl">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Seattle License</p>
            <p className="text-sm font-mono font-bold text-white mt-0.5">SEA-LIC-849201</p>
          </div>
          <div className="border border-slate-800 bg-slate-950 p-3.5 rounded-2xl">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">2026 Sales Tax Rate</p>
            <p className="text-sm font-mono font-bold text-[#E67E22] mt-0.5">10.35% (Seattle)</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-950 text-slate-200">
                <th className="p-3.5 font-semibold text-xs tracking-wider uppercase border border-slate-800">Credential Type</th>
                <th className="p-3.5 font-semibold text-xs tracking-wider uppercase border border-slate-800">Issuing Regulatory Agency</th>
                <th className="p-3.5 font-semibold text-xs tracking-wider uppercase border border-slate-800">Official ID / Policy Number</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/60">
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 border border-slate-800 text-white"><strong>WA State UBI</strong></td>
                <td className="p-3.5 border border-slate-800 text-slate-300">Washington State Dept of Revenue</td>
                <td className="p-3.5 border border-slate-800 font-mono text-emerald-400 font-bold"><code>WA-UBI-604-892-114</code></td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 border border-slate-800 text-white"><strong>Seattle Business License</strong></td>
                <td className="p-3.5 border border-slate-800 text-slate-300">City of Seattle FAS</td>
                <td className="p-3.5 border border-slate-800 font-mono text-emerald-400 font-bold"><code>SEA-LIC-849201</code></td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 border border-slate-800 text-white"><strong>King County Health Permit</strong></td>
                <td className="p-3.5 border border-slate-800 text-slate-300">Public Health – Seattle & King County</td>
                <td className="p-3.5 border border-slate-800 font-mono text-emerald-400 font-bold"><code>KC-HEALTH-PR0094182</code></td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 border border-slate-800 text-white"><strong>WSLCB Liquor License</strong></td>
                <td className="p-3.5 border border-slate-800 text-slate-300">Washington State Liquor and Cannabis Board</td>
                <td className="p-3.5 border border-slate-800 font-mono text-emerald-400 font-bold"><code>WSLCB-CAT-418290</code></td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 border border-slate-800 text-white"><strong>Liability Policy Number</strong></td>
                <td className="p-3.5 border border-slate-800 text-slate-300">Commercial Insurance Carrier ($2M Aggregate)</td>
                <td className="p-3.5 border border-slate-800 font-mono text-emerald-400 font-bold"><code>POL-GL-9938102-SEA</code></td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 border border-slate-800 text-white"><strong>Commercial Kitchen Address</strong></td>
                <td className="p-3.5 border border-slate-800 text-slate-300">Physical Commissary / Prep Facility</td>
                <td className="p-3.5 border border-slate-800 font-mono text-slate-200 font-bold"><code>1420 5th Ave, Suite 800, Seattle WA 98101</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Machine-Readable Venue Syndication Card */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Syndication Architecture</span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-white">Machine-Readable Venue Syndication</h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Venue coordinators can copy our validated JSON-LD schema for instant onboarding into vendor registries.
            </p>
          </div>
          <button
            onClick={handleCopySchema}
            id="copy-schema-button"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy JSON-LD Schema</span>
              </>
            )}
          </button>
        </div>

        {/* Live Schema Preview Window */}
        <div className="mt-6 bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto max-h-72">
          <pre>{schemaSnippet}</pre>
        </div>

        <button
          onClick={handleCopySchema}
          className="w-full mt-4 border-2 border-dashed border-slate-700 hover:border-slate-600 py-2.5 text-slate-300 text-xs font-bold hover:bg-slate-800/40 rounded-xl transition-colors cursor-pointer"
        >
          COPY JSON-LD SCHEMA FOR VENUE SYNDICATION
        </button>
      </div>
    </main>
  );
};
