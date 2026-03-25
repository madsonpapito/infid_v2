"use client";

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import {
  MessageSquare, User, Loader2, Lock, MapPin, CheckCircle2,
  AlertTriangle, LockOpen, X, Activity, Smartphone, ShieldCheck,
  Search, Image as ImageIcon, Eye
} from 'lucide-react';

// --- DATABASE SIMULATION ---
const COUNTRIES = [
  // --- English Speaking (Primary) ---
  { code: "+1", iso: "US", name: "United States", flag: "\uD83C\uDDFA\uD83C\uDDF8", placeholder: "(555) 123-4567" },
  { code: "+44", iso: "GB", name: "United Kingdom", flag: "\uD83C\uDDEC\uD83C\uDDE7", placeholder: "7911 123456" },
  { code: "+1", iso: "CA", name: "Canada", flag: "\uD83C\uDDE8\uD83C\uDDE6", placeholder: "(555) 123-4567" },
  { code: "+61", iso: "AU", name: "Australia", flag: "\uD83C\uDDE6\uD83C\uDDFA", placeholder: "412 345 678" },
  { code: "+64", iso: "NZ", name: "New Zealand", flag: "\uD83C\uDDF3\uD83C\uDDFF", placeholder: "21 123 4567" },
  { code: "+353", iso: "IE", name: "Ireland", flag: "\uD83C\uDDEE\uD83C\uDDEA", placeholder: "87 123 4567" },
  { code: "+27", iso: "ZA", name: "South Africa", flag: "\uD83C\uDDFF\uD83C\uDDE6", placeholder: "71 123 4567" },
  // --- Europe ---
  { code: "+33", iso: "FR", name: "France", flag: "\uD83C\uDDEB\uD83C\uDDF7", placeholder: "6 12 34 56 78" },
  { code: "+49", iso: "DE", name: "Germany", flag: "\uD83C\uDDE9\uD83C\uDDEA", placeholder: "1512 3456789" },
  { code: "+39", iso: "IT", name: "Italy", flag: "\uD83C\uDDEE\uD83C\uDDF9", placeholder: "312 345 6789" },
  { code: "+34", iso: "ES", name: "Spain", flag: "\uD83C\uDDEA\uD83C\uDDF8", placeholder: "612 34 56 78" },
  { code: "+351", iso: "PT", name: "Portugal", flag: "\uD83C\uDDF5\uD83C\uDDF9", placeholder: "912 345 678" },
  { code: "+31", iso: "NL", name: "Netherlands", flag: "\uD83C\uDDF3\uD83C\uDDF1", placeholder: "6 12345678" },
  { code: "+32", iso: "BE", name: "Belgium", flag: "\uD83C\uDDE7\uD83C\uDDEA", placeholder: "470 12 34 56" },
  { code: "+41", iso: "CH", name: "Switzerland", flag: "\uD83C\uDDE8\uD83C\uDDED", placeholder: "78 123 45 67" },
  { code: "+43", iso: "AT", name: "Austria", flag: "\uD83C\uDDE6\uD83C\uDDF9", placeholder: "664 123456" },
  { code: "+46", iso: "SE", name: "Sweden", flag: "\uD83C\uDDF8\uD83C\uDDEA", placeholder: "70-123 45 67" },
  { code: "+47", iso: "NO", name: "Norway", flag: "\uD83C\uDDF3\uD83C\uDDF4", placeholder: "406 12 345" },
  { code: "+45", iso: "DK", name: "Denmark", flag: "\uD83C\uDDE9\uD83C\uDDF0", placeholder: "20 12 34 56" },
  { code: "+358", iso: "FI", name: "Finland", flag: "\uD83C\uDDEB\uD83C\uDDEE", placeholder: "50 123 4567" },
  { code: "+48", iso: "PL", name: "Poland", flag: "\uD83C\uDDF5\uD83C\uDDF1", placeholder: "512 345 678" },
  { code: "+30", iso: "GR", name: "Greece", flag: "\uD83C\uDDEC\uD83C\uDDF7", placeholder: "691 234 5678" },
  { code: "+420", iso: "CZ", name: "Czech Republic", flag: "\uD83C\uDDE8\uD83C\uDDFF", placeholder: "712 345 678" },
  { code: "+36", iso: "HU", name: "Hungary", flag: "\uD83C\uDDED\uD83C\uDDFA", placeholder: "20 123 4567" },
  { code: "+40", iso: "RO", name: "Romania", flag: "\uD83C\uDDF7\uD83C\uDDF4", placeholder: "712 345 678" },
  { code: "+380", iso: "UA", name: "Ukraine", flag: "\uD83C\uDDFA\uD83C\uDDE6", placeholder: "50 123 4567" },
  { code: "+7", iso: "RU", name: "Russia", flag: "\uD83C\uDDF7\uD83C\uDDFA", placeholder: "912 345-67-89" },
  // --- Latin America ---
  { code: "+55", iso: "BR", name: "Brazil", flag: "\uD83C\uDDE7\uD83C\uDDF7", placeholder: "(11) 99999-9999" },
  { code: "+52", iso: "MX", name: "Mexico", flag: "\uD83C\uDDF2\uD83C\uDDFD", placeholder: "55 1234 5678" },
  { code: "+54", iso: "AR", name: "Argentina", flag: "\uD83C\uDDE6\uD83C\uDDF7", placeholder: "11 1234-5678" },
  { code: "+56", iso: "CL", name: "Chile", flag: "\uD83C\uDDE8\uD83C\uDDF1", placeholder: "9 1234 5678" },
  { code: "+57", iso: "CO", name: "Colombia", flag: "\uD83C\uDDE8\uD83C\uDDF4", placeholder: "300 1234567" },
  { code: "+51", iso: "PE", name: "Peru", flag: "\uD83C\uDDF5\uD83C\uDDEA", placeholder: "912 345 678" },
  { code: "+58", iso: "VE", name: "Venezuela", flag: "\uD83C\uDDFB\uD83C\uDDEA", placeholder: "412-1234567" },
  { code: "+593", iso: "EC", name: "Ecuador", flag: "\uD83C\uDDEA\uD83C\uDDE8", placeholder: "99 123 4567" },
  { code: "+595", iso: "PY", name: "Paraguay", flag: "\uD83C\uDDF5\uD83C\uDDFE", placeholder: "961 123456" },
  { code: "+598", iso: "UY", name: "Uruguay", flag: "\uD83C\uDDFA\uD83C\uDDFE", placeholder: "94 123 456" },
  { code: "+591", iso: "BO", name: "Bolivia", flag: "\uD83C\uDDE7\uD83C\uDDF4", placeholder: "71234567" },
  { code: "+507", iso: "PA", name: "Panama", flag: "\uD83C\uDDF5\uD83C\uDDE6", placeholder: "6123-4567" },
  { code: "+506", iso: "CR", name: "Costa Rica", flag: "\uD83C\uDDE8\uD83C\uDDF7", placeholder: "8123-4567" },
  { code: "+1", iso: "DO", name: "Dominican Republic", flag: "\uD83C\uDDE9\uD83C\uDDF4", placeholder: "(809) 123-4567" },
  // --- Asia / Pacific ---
  { code: "+81", iso: "JP", name: "Japan", flag: "\uD83C\uDDEF\uD83C\uDDF5", placeholder: "90-1234-5678" },
  { code: "+82", iso: "KR", name: "South Korea", flag: "\uD83C\uDDF0\uD83C\uDDF7", placeholder: "10-1234-5678" },
  { code: "+86", iso: "CN", name: "China", flag: "\uD83C\uDDE8\uD83C\uDDF3", placeholder: "138 0013 8000" },
  { code: "+91", iso: "IN", name: "India", flag: "\uD83C\uDDEE\uD83C\uDDF3", placeholder: "81234 56789" },
  { code: "+62", iso: "ID", name: "Indonesia", flag: "\uD83C\uDDEE\uD83C\uDDE9", placeholder: "0812 3456 789" },
  { code: "+63", iso: "PH", name: "Philippines", flag: "\uD83C\uDDF5\uD83C\uDDED", placeholder: "912 345 6789" },
  { code: "+60", iso: "MY", name: "Malaysia", flag: "\uD83C\uDDF2\uD83C\uDDFE", placeholder: "012-345 6789" },
  { code: "+65", iso: "SG", name: "Singapore", flag: "\uD83C\uDDF8\uD83C\uDDEC", placeholder: "8123 4567" },
  { code: "+66", iso: "TH", name: "Thailand", flag: "\uD83C\uDDF9\uD83C\uDDED", placeholder: "081 234 5678" },
  { code: "+84", iso: "VN", name: "Vietnam", flag: "\uD83C\uDDFB\uD83C\uDDF3", placeholder: "091 234 56 78" },
  { code: "+92", iso: "PK", name: "Pakistan", flag: "\uD83C\uDDF5\uD83C\uDDF0", placeholder: "0300 1234567" },
  { code: "+880", iso: "BD", name: "Bangladesh", flag: "\uD83C\uDDE7\uD83C\uDDE9", placeholder: "01712-345678" },
  { code: "+852", iso: "HK", name: "Hong Kong", flag: "\uD83C\uDDED\uD83C\uDDF0", placeholder: "9123 4567" },
  { code: "+886", iso: "TW", name: "Taiwan", flag: "\uD83C\uDDF9\uD83C\uDDFC", placeholder: "0912 345 678" },
  // --- Middle East / Africa / Others ---
  { code: "+972", iso: "IL", name: "Israel", flag: "\uD83C\uDDEE\uD83C\uDDF1", placeholder: "50 123 4567" },
  { code: "+90", iso: "TR", name: "Turkey", flag: "\uD83C\uDDF9\uD83C\uDDF7", placeholder: "501 234 56 78" },
  { code: "+971", iso: "AE", name: "UAE", flag: "\uD83C\uDDE6\uD83C\uDDEA", placeholder: "50 123 4567" },
  { code: "+966", iso: "SA", name: "Saudi Arabia", flag: "\uD83C\uDDF8\uD83C\uDDE6", placeholder: "50 123 4567" },
  { code: "+20", iso: "EG", name: "Egypt", flag: "\uD83C\uDDEA\uD83C\uDDEC", placeholder: "100 123 4567" },
  { code: "+234", iso: "NG", name: "Nigeria", flag: "\uD83C\uDDF3\uD83C\uDDEC", placeholder: "802 123 4567" },
  { code: "+254", iso: "KE", name: "Kenya", flag: "\uD83C\uDDF0\uD83C\uDDEA", placeholder: "712 123456" },
  { code: "+212", iso: "MA", name: "Morocco", flag: "\uD83C\uDDF2\uD83C\uDDE6", placeholder: "612-345678" },
];

const CONVERSATIONS = [
  { id: 1, name: "Unknown User \uD83D\uDD12", msg: "Don't tell her about last night...", time: "Yesterday" },
  { id: 2, name: "Unknown User \uD83D\uDD12", msg: "Photo (View Once) \uD83D\uDCF7", time: "2 days ago" },
  { id: 3, name: "Unknown User \uD83D\uDD12", msg: "Audio (0:14) \uD83C\uDFA4", time: "3 days ago" }
];

const KW_STATS = [
  { w: "Love", c: 22 }, { w: "Naughty", c: 18 }, { w: "Baby", c: 15 },
  { w: "Miss you", c: 12 }, { w: "Babe", c: 10 }, { w: "Secret", c: 9 }
];

// Image paths per gender
const RECENT_LOGS_IMAGES = {
  male: ["/images/male/zap/1-f.png", "/images/male/zap/2-f.png", "/images/male/zap/3-f.png"],
  female: ["/images/female/zap/1-h.png", "/images/female/zap/2-h.png", "/images/female/zap/3-h.png"],
};

const RECOVERED_MEDIA_IMAGES = {
  male: [
    "/images/male/zap/block/4-f.png", "/images/male/zap/block/5-f.png",
    "/images/male/zap/block/6-f.png", "/images/male/zap/block/7-f.png",
    "/images/male/zap/block/8-f.png", "/images/male/zap/block/9-f.png",
  ],
  female: [
    "/images/female/zap/block/4-h.png", "/images/female/zap/block/5-h.png",
    "/images/female/zap/block/6-h.png", "/images/female/zap/block/7-h.png",
    "/images/female/zap/block/8-h.png", "/images/female/zap/block/9-h.png",
  ],
};

export default function Upsell1FPPage() {
  const [step, setStep] = useState<'intro' | 'loading' | 'report'>('intro');
  const [gender, setGender] = useState('Female');
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [phone, setPhone] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isFetchingAvatar, setIsFetchingAvatar] = useState(false);
  const [userLocation, setUserLocation] = useState("New York, US");
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLon, setUserLon] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Loading State
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStepText, setLoadingStepText] = useState("Initializing System...");
  const [loadingStepsHistory, setLoadingStepsHistory] = useState<string[]>([]);

  // Report State
  const [timeLeft, setTimeLeft] = useState(300);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<typeof CONVERSATIONS[0] | null>(null);

  // Fetch user location
  useEffect(() => {
    fetch('/api/geo')
      .then(r => r.json())
      .then(d => {
        if (d.city && d.city !== 'Unknown Location') {
          setUserLocation(d.city);
        } else {
          throw new Error("Vercel Geo failed or unknown");
        }
      })
      .catch(() => {
        fetch('https://get.geojs.io/v1/ip/geo.json')
          .then(r => r.json())
          .then(d => {
            if (d.city) setUserLocation(d.city);
            if (d.latitude) setUserLat(parseFloat(d.latitude));
            if (d.longitude) setUserLon(parseFloat(d.longitude));
          })
          .catch(e => console.error("Geo fallback error:", e));
      });
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Auto-fetch WhatsApp avatar when phone is long enough
  useEffect(() => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 8) {
      setAvatarUrl(null);
      return;
    }
    const timer = setTimeout(async () => {
      setIsFetchingAvatar(true);
      try {
        const res = await fetch('/api/whatsapp-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: cleaned, countryCode: country.code })
        });
        const data = await res.json();
        if (res.ok && (data.result || data.imageUrl)) {
          setAvatarUrl(data.result || data.imageUrl);
        } else {
          setAvatarUrl(null);
        }
      } catch {
        setAvatarUrl(null);
      } finally {
        setIsFetchingAvatar(false);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [phone, country]);

  const filteredCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.code.includes(countrySearch) ||
    c.iso.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9\s-]/g, '');
    setPhone(val);
  };

  const startAnalysis = () => {
    if (phone.replace(/\D/g, '').length < 8) return;
    setStep('loading');
    runLoadingSequence();
  };

  const runLoadingSequence = () => {
    const STEPS = [
      "Establishing encrypted tunnel...", "Bypassing 2FA protocols...", "Accessing WhatsApp servers...",
      "Extracting chat logs...", "Decryping media files...", "Recovering deleted messages...",
      "Geolocating device signal...", "Analyzing interaction patterns...", "Compiling final report..."
    ];
    let currentStep = 0;
    const barInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) { clearInterval(barInterval); return 100; }
        return prev + 0.8;
      });
    }, 80);
    const stepInterval = setInterval(() => {
      if (currentStep < STEPS.length) {
        setLoadingStepText(STEPS[currentStep]);
        setLoadingStepsHistory(prev => [...prev, STEPS[currentStep]]);
        currentStep++;
      } else {
        clearInterval(stepInterval);
        setTimeout(() => setStep('report'), 1000);
      }
    }, 1200);
  };

  useEffect(() => {
    if (step === 'report' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Gender key for images (what gender of photos to show = opposite of target)
  const genderKey = gender === 'Male' ? 'male' : 'female';
  const recentLogImages = RECENT_LOGS_IMAGES[genderKey];
  const recoveredImages = RECOVERED_MEDIA_IMAGES[genderKey];

  return (
    <div className="bg-[#0B1120] min-h-screen font-sans text-slate-200 selection:bg-cyan-500/30">

      {/* --- TOP BANNER --- */}
      <div className="w-full bg-rose-600/90 backdrop-blur-md text-center py-2 px-4 sticky top-0 z-50 border-b border-rose-500/50">
        <p className="text-xs font-bold text-white uppercase tracking-widest animate-pulse flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          System Alert: Payment Processing
        </p>
      </div>

      {step === 'report' && (
        <div className="fixed top-20 right-4 z-[40] animate-in slide-in-from-right duration-1000 delay-500">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl shadow-2xl flex items-center gap-3 w-64">
            <div className="bg-green-500 p-2 rounded-lg"><MessageSquare className="w-4 h-4 text-white" /></div>
            <div>
              <p className="text-[10px] text-white font-bold">WhatsApp - Now</p>
              <p className="text-xs text-slate-200">{"Message Recovered: \"Don't...\""}</p>
            </div>
          </div>
        </div>
      )}

      <main className="w-full max-w-md mx-auto px-4 py-8 pb-32">

        {/* --- STEP 1: INTRO & FORM --- */}
        {step === 'intro' && (
          <div className="space-y-8 animate-fade-in-up">

            <div className="text-center space-y-4">
              {/* AVATAR ICON */}
              <div className="relative inline-flex items-center justify-center mx-auto">
                <div className="w-24 h-24 rounded-full border-2 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)] overflow-hidden bg-slate-800 flex items-center justify-center">
                  {isFetchingAvatar ? (
                    <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
                  ) : avatarUrl ? (
                    <img src={avatarUrl} alt="Target Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-slate-500" />
                  )}
                </div>
                {avatarUrl && !isFetchingAvatar && (
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#0B1120] flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              <h1 className="text-2xl font-bold text-white">
                <span className="text-cyan-400">WhatsApp</span> Deep Scan
              </h1>

              <p className="text-slate-400 text-sm leading-relaxed">
                Our intelligence network has flagged suspicious activity. Enter the target number to extract hidden logs.
              </p>
            </div>

            {/* Form Container */}
            <div className="bg-[#0f172a] border border-slate-700/50 rounded-2xl p-6 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

              {/* Gender */}
              <div className="space-y-3 z-10 relative">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target Gender</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Male', 'Female', 'Other'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`py-3 rounded-xl text-sm font-bold border transition-all ${gender === g
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                        }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone Input with Country Dropdown */}
              <div className="space-y-3 z-10 relative" ref={dropdownRef}>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target Number</label>
                <div className="relative">
                  <div className="flex bg-slate-800 rounded-xl border border-slate-700 overflow-visible focus-within:border-cyan-500 transition-colors">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="px-3 py-3 bg-slate-900/50 border-r border-slate-700 flex items-center gap-1.5 hover:bg-slate-800 transition-colors rounded-l-xl min-w-[80px]"
                    >
                      <span className="text-base">{country.flag}</span>
                      <span className="text-xs font-mono text-slate-300">{country.code}</span>
                    </button>
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder={country.placeholder}
                      className="flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder-slate-600 font-mono text-sm"
                    />
                    {isFetchingAvatar && (
                      <div className="pr-3 flex items-center">
                        <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Country Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 flex flex-col max-h-60">
                      <div className="p-2 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                          <input
                            type="text"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg text-xs text-white pl-7 p-2 focus:outline-none focus:border-cyan-500"
                            placeholder="Search..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="overflow-y-auto flex-1">
                        {filteredCountries.map((c) => (
                          <button
                            key={c.iso}
                            onClick={() => { setCountry(c); setIsDropdownOpen(false); setCountrySearch(''); }}
                            className="w-full px-3 py-2 flex items-center gap-2 hover:bg-slate-700 transition-colors text-left"
                          >
                            <span>{c.flag}</span>
                            <span className="text-xs text-white flex-1">{c.name}</span>
                            <span className="text-xs font-mono text-slate-400">{c.code}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={startAnalysis}
                disabled={phone.replace(/\D/g, '').length < 8}
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search className="w-5 h-5" />
                Start Deep Scan
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 2: LOADING --- */}
        {step === 'loading' && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="text-center space-y-4">
              <div className="relative inline-flex items-center justify-center mx-auto">
                <div className="w-24 h-24 rounded-full border-2 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)] overflow-hidden bg-slate-800 flex items-center justify-center">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Target Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-slate-500" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-cyan-500 rounded-full border-2 border-[#0B1120] flex items-center justify-center animate-pulse">
                  <Activity className="w-4 h-4 text-white" />
                </div>
              </div>

              <h1 className="text-xl font-bold text-white">Scanning Target...</h1>
              <p className="text-slate-400 text-sm">{loadingStepText}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 text-center font-mono">{Math.round(loadingProgress)}%</p>
            </div>

            {/* Steps History */}
            <div className="bg-[#0f172a] border border-slate-700/50 rounded-xl p-4 space-y-2 max-h-48 overflow-y-auto">
              {loadingStepsHistory.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span className="text-slate-400">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- STEP 3: REPORT --- */}
        {step === 'report' && (
          <div className="space-y-6 animate-fade-in-up">

            {/* Timer Banner */}
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-bold text-rose-400 uppercase">Report Expires In:</span>
              </div>
              <span className="text-lg font-mono font-bold text-rose-500">{formatTime(timeLeft)}</span>
            </div>

            {/* Profile Card */}
            <div className="bg-[#0f172a] border border-slate-700/50 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-800 border-2 border-cyan-500/40">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Target" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-slate-500 m-auto mt-4" />
                  )}
                </div>
                <div>
                  <p className="text-white font-bold">{country.code} {phone}</p>
                  <p className="text-xs text-slate-400">WhatsApp Account Detected</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span className="text-xs text-cyan-400">{userLocation}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Keywords Section */}
            <div className="bg-[#0f172a] border border-slate-700/50 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-500" />
                Flagged Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {KW_STATS.map((k, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 flex items-center gap-1">
                    {k.w}
                    <span className="bg-rose-500/20 text-rose-400 px-1 rounded text-[10px] font-bold">{k.c}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Logs */}
            <div className="bg-[#0f172a] border border-slate-700/50 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                Recent Chat Logs
              </h3>
              <div className="space-y-2">
                {CONVERSATIONS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setModalData(c); setModalOpen(true); }}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 flex items-center gap-3 hover:border-cyan-500/50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700 flex-shrink-0">
                      <img src={recentLogImages[c.id - 1]} alt="" className="w-full h-full object-cover blur-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{c.name}</p>
                      <p className="text-xs text-slate-400 truncate">{c.msg}</p>
                    </div>
                    <span className="text-[10px] text-slate-500">{c.time}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recovered Media */}
            <div className="bg-[#0f172a] border border-slate-700/50 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-400" />
                Recovered Media
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {recoveredImages.map((img, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden bg-slate-800 relative">
                    <img src={img} alt="" className="w-full h-full object-cover blur-md" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white/50" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FortPay CTA */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-slate-900 border border-cyan-500/30 rounded-2xl p-6 space-y-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/10 rounded-full border border-cyan-500/30">
                <LockOpen className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Unlock Full Report</h2>
              <p className="text-sm text-slate-400">Get instant access to all recovered data, messages, and media.</p>

              {/* FortPay Button */}
              <div className="w-full flex flex-col items-center gap-3 pt-2">
                <a
                  href="javascript:void(0)"
                  data-fornpay="3diwhi3kqn"
                  className="fornpay_btn w-full py-4 bg-gradient-to-r from-[#3d94f6] to-[#1e62d0] hover:from-[#4da3ff] hover:to-[#2a75e8] text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] text-center"
                >
                  SIM, EU ACEITO ESSA OFERTA
                </a>
                <a
                  href="/downsell-1-fp"
                  data-downsell="/downsell-1-fp"
                  className="fornpay_downsell text-[#004faa] text-sm hover:underline"
                >
                  Vou recusar essa oferta
                </a>
              </div>

              <Script
                id="fortpay-oneclick-u1"
                src="https://app.plataformafortpay.com.br/js/oneclick.js"
                strategy="lazyOnload"
              />
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {modalOpen && modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setModalOpen(false)}>
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl p-6 max-w-sm w-full space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold">{modalData.name}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-slate-800 relative">
              <img src={recentLogImages[modalData.id - 1]} alt="" className="w-full h-full object-cover blur-lg" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-8 h-8 text-white/50 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">Unlock to view</p>
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm">{modalData.msg}</p>
            <p className="text-xs text-slate-500">{modalData.time}</p>
          </div>
        </div>
      )}
    </div>
  );
}
