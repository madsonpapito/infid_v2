"use client";

import { useState, useEffect, useRef } from 'react';

import {
  MessageSquare, User, Loader2, Lock, MapPin, CheckCircle2,
  AlertTriangle, LockOpen, X, Activity, Smartphone, ShieldCheck,
  Search, Image as ImageIcon, Eye
} from 'lucide-react';

// --- DATABASE SIMULATION ---
const COUNTRIES = [
  // --- English Speaking (Primary) ---
  { code: "+1", iso: "US", name: "United States", flag: "🇺🇸", placeholder: "(555) 123-4567" },
  { code: "+44", iso: "GB", name: "United Kingdom", flag: "🇬🇧", placeholder: "7911 123456" },
  { code: "+1", iso: "CA", name: "Canada", flag: "🇨🇦", placeholder: "(555) 123-4567" },
  { code: "+61", iso: "AU", name: "Australia", flag: "🇦🇺", placeholder: "412 345 678" },
  { code: "+64", iso: "NZ", name: "New Zealand", flag: "🇳🇿", placeholder: "21 123 4567" },
  { code: "+353", iso: "IE", name: "Ireland", flag: "🇮🇪", placeholder: "87 123 4567" },
  { code: "+27", iso: "ZA", name: "South Africa", flag: "🇿🇦", placeholder: "71 123 4567" },
  // --- Europe ---
  { code: "+33", iso: "FR", name: "France", flag: "🇫🇷", placeholder: "6 12 34 56 78" },
  { code: "+49", iso: "DE", name: "Germany", flag: "🇩🇪", placeholder: "1512 3456789" },
  { code: "+39", iso: "IT", name: "Italy", flag: "🇮🇹", placeholder: "312 345 6789" },
  { code: "+34", iso: "ES", name: "Spain", flag: "🇪🇸", placeholder: "612 34 56 78" },
  { code: "+351", iso: "PT", name: "Portugal", flag: "🇵🇹", placeholder: "912 345 678" },
  { code: "+31", iso: "NL", name: "Netherlands", flag: "🇳🇱", placeholder: "6 12345678" },
  { code: "+32", iso: "BE", name: "Belgium", flag: "🇧🇪", placeholder: "470 12 34 56" },
  { code: "+41", iso: "CH", name: "Switzerland", flag: "🇨🇭", placeholder: "78 123 45 67" },
  { code: "+43", iso: "AT", name: "Austria", flag: "🇦🇹", placeholder: "664 123456" },
  { code: "+46", iso: "SE", name: "Sweden", flag: "🇸🇪", placeholder: "70-123 45 67" },
  { code: "+47", iso: "NO", name: "Norway", flag: "🇳🇴", placeholder: "406 12 345" },
  { code: "+45", iso: "DK", name: "Denmark", flag: "🇩🇰", placeholder: "20 12 34 56" },
  { code: "+358", iso: "FI", name: "Finland", flag: "🇫🇮", placeholder: "50 123 4567" },
  { code: "+48", iso: "PL", name: "Poland", flag: "🇵🇱", placeholder: "512 345 678" },
  { code: "+30", iso: "GR", name: "Greece", flag: "🇬🇷", placeholder: "691 234 5678" },
  { code: "+420", iso: "CZ", name: "Czech Republic", flag: "🇨🇿", placeholder: "712 345 678" },
  { code: "+36", iso: "HU", name: "Hungary", flag: "🇭🇺", placeholder: "20 123 4567" },
  { code: "+40", iso: "RO", name: "Romania", flag: "🇷🇴", placeholder: "712 345 678" },
  { code: "+380", iso: "UA", name: "Ukraine", flag: "🇺🇦", placeholder: "50 123 4567" },
  { code: "+7", iso: "RU", name: "Russia", flag: "🇷🇺", placeholder: "912 345-67-89" },
  // --- Latin America ---
  { code: "+55", iso: "BR", name: "Brazil", flag: "🇧🇷", placeholder: "(11) 99999-9999" },
  { code: "+52", iso: "MX", name: "Mexico", flag: "🇲🇽", placeholder: "55 1234 5678" },
  { code: "+54", iso: "AR", name: "Argentina", flag: "🇦🇷", placeholder: "11 1234-5678" },
  { code: "+56", iso: "CL", name: "Chile", flag: "🇨🇱", placeholder: "9 1234 5678" },
  { code: "+57", iso: "CO", name: "Colombia", flag: "🇨🇴", placeholder: "300 1234567" },
  { code: "+51", iso: "PE", name: "Peru", flag: "🇵🇪", placeholder: "912 345 678" },
  { code: "+58", iso: "VE", name: "Venezuela", flag: "🇻🇪", placeholder: "412-1234567" },
  { code: "+593", iso: "EC", name: "Ecuador", flag: "🇪🇨", placeholder: "99 123 4567" },
  { code: "+595", iso: "PY", name: "Paraguay", flag: "🇵🇾", placeholder: "961 123456" },
  { code: "+598", iso: "UY", name: "Uruguay", flag: "🇺🇾", placeholder: "94 123 456" },
  { code: "+591", iso: "BO", name: "Bolivia", flag: "🇧🇴", placeholder: "71234567" },
  { code: "+507", iso: "PA", name: "Panama", flag: "🇵🇦", placeholder: "6123-4567" },
  { code: "+506", iso: "CR", name: "Costa Rica", flag: "🇨🇷", placeholder: "8123-4567" },
  { code: "+1", iso: "DO", name: "Dominican Republic", flag: "🇩🇴", placeholder: "(809) 123-4567" },
  // --- Asia / Pacific ---
  { code: "+81", iso: "JP", name: "Japan", flag: "🇯🇵", placeholder: "90-1234-5678" },
  { code: "+82", iso: "KR", name: "South Korea", flag: "🇰🇷", placeholder: "10-1234-5678" },
  { code: "+86", iso: "CN", name: "China", flag: "🇨🇳", placeholder: "138 0013 8000" },
  { code: "+91", iso: "IN", name: "India", flag: "🇮🇳", placeholder: "81234 56789" },
  { code: "+62", iso: "ID", name: "Indonesia", flag: "🇮🇩", placeholder: "0812 3456 789" },
  { code: "+63", iso: "PH", name: "Philippines", flag: "🇵🇭", placeholder: "912 345 6789" },
  { code: "+60", iso: "MY", name: "Malaysia", flag: "🇲🇾", placeholder: "012-345 6789" },
  { code: "+65", iso: "SG", name: "Singapore", flag: "🇸🇬", placeholder: "8123 4567" },
  { code: "+66", iso: "TH", name: "Thailand", flag: "🇹🇭", placeholder: "081 234 5678" },
  { code: "+84", iso: "VN", name: "Vietnam", flag: "🇻🇳", placeholder: "091 234 56 78" },
  { code: "+92", iso: "PK", name: "Pakistan", flag: "🇵🇰", placeholder: "0300 1234567" },
  { code: "+880", iso: "BD", name: "Bangladesh", flag: "🇧🇩", placeholder: "01712-345678" },
  { code: "+852", iso: "HK", name: "Hong Kong", flag: "🇭🇰", placeholder: "9123 4567" },
  { code: "+886", iso: "TW", name: "Taiwan", flag: "🇹🇼", placeholder: "0912 345 678" },
  // --- Middle East / Africa / Others ---
  { code: "+972", iso: "IL", name: "Israel", flag: "🇮🇱", placeholder: "50 123 4567" },
  { code: "+90", iso: "TR", name: "Turkey", flag: "🇹🇷", placeholder: "501 234 56 78" },
  { code: "+971", iso: "AE", name: "UAE", flag: "🇦🇪", placeholder: "50 123 4567" },
  { code: "+966", iso: "SA", name: "Saudi Arabia", flag: "🇸🇦", placeholder: "50 123 4567" },
  { code: "+20", iso: "EG", name: "Egypt", flag: "🇪🇬", placeholder: "100 123 4567" },
  { code: "+234", iso: "NG", name: "Nigeria", flag: "🇳🇬", placeholder: "802 123 4567" },
  { code: "+254", iso: "KE", name: "Kenya", flag: "🇰🇪", placeholder: "712 123456" },
  { code: "+212", iso: "MA", name: "Morocco", flag: "🇲🇦", placeholder: "612-345678" },
];

const CONVERSATIONS = [
  { id: 1, name: "Unknown User 🔒", msg: "\"Don't tell her about last night...\"", time: "Yesterday" },
  { id: 2, name: "Unknown User 🔒", msg: "Photo (View Once) 📷", time: "2 days ago" },
  { id: 3, name: "Unknown User 🔒", msg: "Audio (0:14) 🎤", time: "3 days ago" }
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

export default function Upsell1Page() {
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
  // Fetch user location
  useEffect(() => {
    // 1. Try internal Vercel headers first
    fetch('/api/geo')
      .then(r => r.json())
      .then(d => {
        if (d.city && d.city !== 'Unknown Location') {
          setUserLocation(d.city);
          // If Vercel headers provide more info in the future, we can use it.
          // For now, relies on City name for map query.
        } else {
          throw new Error("Vercel Geo failed or unknown");
        }
      })
      .catch(() => {
        // 2. Fallback to IP-based Geo
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

  // Inject Mundpay script AFTER report step renders (so data-mndpay-render is in DOM)
  useEffect(() => {
    if (step !== 'report') return;

    // Remove any previous script to force fresh execution
    const existing = document.getElementById('mundpay-u1-dynamic');
    if (existing) existing.remove();

    const timer = setTimeout(() => {
      const script = document.createElement('script');
      script.id = 'mundpay-u1-dynamic';
      script.src = 'https://upsell.mundpay.com/script-v2.js';
      script.async = true;
      document.body.appendChild(script);
    }, 300);

    return () => clearTimeout(timer);
  }, [step]);


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
              <p className="text-[10px] text-white font-bold">WhatsApp • Now</p>
              <p className="text-xs text-slate-200">Message Recovered: "Don't..."</p>
            </div>
          </div>
        </div>
      )}

      <main className="w-full max-w-md mx-auto px-4 py-8 pb-32">

        {/* --- STEP 1: INTRO & FORM --- */}
        {step === 'intro' && (
          <div className="space-y-8 animate-fade-in-up">

            <div className="text-center space-y-4">
              {/* AVATAR ICON — updates with WhatsApp photo */}
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
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg text-xs text-white pl-7 p-2 focus:border-cyan-500 outline-none"
                            placeholder="Search country..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="overflow-y-auto flex-1">
                        {filteredCountries.length === 0 && (
                          <div className="p-4 text-center text-slate-500 text-xs">No countries found</div>
                        )}
                        {filteredCountries.map((c, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setCountry(c);
                              setIsDropdownOpen(false);
                              setCountrySearch('');
                            }}
                            className="w-full flex items-center gap-3 p-2 hover:bg-slate-700 text-left transition-colors border-b border-slate-700/50 last:border-0"
                          >
                            <span className="text-base flex-shrink-0">{c.flag}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-white font-bold truncate">{c.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{c.code}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={startAnalysis}
                disabled={phone.replace(/\D/g, '').length < 8}
                className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-[#0B1120] font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock className="w-5 h-5" />
                INITIATE CLONE
              </button>

              <div className="flex justify-center items-center gap-2 text-[10px] text-slate-500">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>256-bit Encrypted • Anonymous Search</span>
              </div>
            </div>

          </div>
        )}

        {/* --- STEP 2: LOADING (TERMINAL STYLE) --- */}
        {step === 'loading' && (
          <div className="max-w-md mx-auto space-y-6 animate-in zoom-in duration-300">
            <div className="bg-[#0f172a] rounded-2xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] p-6 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse"></div>
              <div className="mx-auto w-20 h-20 rounded-full border-2 border-cyan-500/20 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin"></div>
                <Smartphone className="w-8 h-8 text-cyan-400/80" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg tracking-wide uppercase">System Hacking...</h3>
                <p className="text-cyan-400/80 font-mono text-sm">{country.code} {phone}</p>
                <div className="flex items-center justify-center gap-2 text-emerald-500 text-xs mt-2 animate-pulse font-mono">
                  <MapPin className="w-3 h-3" />
                  <span>SIGNAL LOCKED: GPS ACTIVE</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-cyan-400">
                  <span>{loadingStepText}</span>
                  <span>{Math.round(loadingProgress)}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 shadow-[0_0_10px_cyan]"
                    style={{ width: `${loadingProgress}%`, transition: 'width 0.1s linear' }}
                  ></div>
                </div>
              </div>
              <div className="h-32 bg-[#050911] rounded-lg p-3 text-left overflow-y-auto border border-slate-800 font-mono text-[10px] space-y-1">
                {loadingStepsHistory.map((s, i) => (
                  <div key={i} className="flex gap-2 text-emerald-500/90">
                    <span>&gt;</span>
                    <span>{s}</span>
                  </div>
                ))}
                <div className="w-2 h-4 bg-emerald-500 animate-pulse inline-block"></div>
              </div>
            </div>
          </div>
        )}

        {/* --- STEP 3: REPORT (CYBER UI) --- */}
        {step === 'report' && (
          <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-6">

            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-cyan-700 p-4 rounded-t-2xl shadow-lg text-center relative z-10 border-b border-white/10">
              <h1 className="text-lg font-bold text-white flex items-center justify-center gap-2 uppercase tracking-wide">
                <CheckCircle2 className="w-5 h-5" /> Access Granted
              </h1>
              <p className="text-xs text-emerald-100/80 font-mono">Data extraction complete for {phone}</p>
            </div>

            <div className="bg-[#0f172a] rounded-b-2xl shadow-2xl p-5 space-y-6 pt-8 border border-slate-700 -mt-4 relative z-0">

              {/* Alert Box */}
              <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex items-start gap-3">
                <Activity className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-rose-400">Suspicious Activity Detected</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Found <span className="text-white font-bold">148 deleted messages</span> and hidden media files.
                  </p>
                </div>
              </div>

              {/* Recent Logs — with gender-based avatars */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Recent Logs</h4>
                {CONVERSATIONS.map((c, i) => (
                  <div
                    key={c.id}
                    onClick={() => { setModalData(c); setModalOpen(true); }}
                    className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-500/50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700 flex-shrink-0">
                        <img
                          src={recentLogImages[i % recentLogImages.length]}
                          alt="User"
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-white group-hover:text-cyan-400 transition-colors uppercase">{c.name}</p>
                        <p className="text-[10px] text-rose-400 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> {c.msg}
                        </p>
                      </div>
                    </div>
                    <Lock className="w-3 h-3 text-slate-600 group-hover:text-cyan-500" />
                  </div>
                ))}
              </div>

              {/* Keywords */}
              <div className="bg-slate-800/30 p-3 rounded-xl border border-slate-700">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Keyword Analysis</h4>
                <div className="flex flex-wrap gap-2">
                  {KW_STATS.map((k, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-800 border border-slate-600 rounded text-[10px] text-slate-300 flex items-center gap-1">
                      {k.w}
                      <span className="bg-rose-500 text-white px-1 rounded-sm font-bold">{k.c}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Suspicious Location */}
              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-rose-400" /> Suspicious Location
                </h4>
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-700">
                  <iframe
                    title="Suspicious Location Map"
                    src={userLat && userLon
                      ? `https://maps.google.com/maps?q=motel+near+${userLat},${userLon}&output=embed&z=14`
                      : `https://maps.google.com/maps?q=motel+near+${encodeURIComponent(userLocation)}&output=embed&z=14`
                    }
                    className="w-full h-full"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute inset-0 pointer-events-none border border-rose-500/20 rounded-lg" />
                </div>
                <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-lg p-2">
                  <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse flex-shrink-0" />
                  <p className="text-[10px] text-rose-300 font-mono">
                    Device signal detected near <span className="font-bold text-white">{userLocation}</span> — suspicious activity
                  </p>
                </div>
              </div>

              {/* Recovered Media */}
              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon className="w-3 h-3 text-cyan-400" /> Recovered Media
                  </h4>
                  <span className="text-[10px] text-rose-400 font-bold">
                    <span className="text-rose-400">247 deleted photos</span> were found.
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {recoveredImages.map((src, i) => (
                    <div
                      key={i}
                      onClick={() => setModalOpen(true)}
                      className="relative aspect-[3/4] rounded-lg overflow-hidden bg-slate-800 cursor-pointer group"
                    >
                      <img
                        src={src}
                        alt="Recovered"
                        className="w-full h-full object-cover blur-sm opacity-60 group-hover:opacity-80 transition-opacity"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                        <Lock className="w-6 h-6 text-white/80" />
                        <span className="text-[10px] text-white/70 font-bold uppercase tracking-wider">Blocked</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* UNLOCK CARD */}
              <div className="bg-[#0B1120] border border-cyan-500/50 rounded-xl p-6 text-center shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                  EXPIRING SOON
                </div>

                <div className="mx-auto w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 animate-bounce border border-cyan-500/30">
                  <LockOpen className="w-6 h-6 text-cyan-400" />
                </div>

                <h2 className="text-xl font-black text-white mb-2 uppercase tracking-wide">UNLOCK FULL REPORT</h2>
                <p className="text-slate-400 text-xs mb-6 px-4">Get instant access to the full report with all chats, conversations, audio, videos, location history and photos exchanged.</p>

                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 mb-6 flex justify-between items-center max-w-[200px] mx-auto">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Session Expires:</span>
                  <span className="font-mono font-bold text-rose-500">{formatTime(timeLeft)}</span>
                </div>

                {/* MUNDPAGG WIDGET CONTAINER */}
                <div className="md-widget-dark w-full flex justify-center py-2 bg-white/5 rounded-lg border border-white/10 min-h-[100px]">
                  <div data-mndpay-render="019b0d37-ef9b-73eb-a287-253b24e74a23"></div>
                </div>


              </div>

            </div>
          </div>
        )}

      </main>

      {/* CHAT MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div className="bg-[#0f172a] w-full max-w-sm rounded-xl overflow-hidden border border-slate-700 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="bg-slate-800 p-3 text-white flex items-center gap-3 border-b border-slate-700">
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
              <div className="flex-1 font-bold font-mono text-sm uppercase">Encrypted Content</div>
            </div>
            <div className="h-64 p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-400 text-sm">This content is locked by 256-bit encryption.</p>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-cyan-500 text-[#0B1120] px-6 py-2 rounded font-bold shadow-lg hover:bg-cyan-400 uppercase text-xs tracking-wider"
              >
                Return to Unlock
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
