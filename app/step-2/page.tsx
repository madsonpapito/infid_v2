"use client"

import { useState, useRef, useEffect, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import {
  CheckCircle2, AlertTriangle, Lock, LockOpen, Search, MapPin,
  Smartphone, Fingerprint, Eye, User, HeartCrack, Activity,
  ScanFace, Globe, ShieldCheck, ChevronRight, X, MessageCircle,
  ChevronLeft, Volume2, HelpCircle, History
} from "lucide-react"
import { getRandomProfile, MALE_NAMES, FEMALE_NAMES } from "@/lib/profile-data"
import { COUNTRIES } from "@/components/Countries"


// ==========================================================
// DATA MOCKS
// ==========================================================

interface Match {
  name: string;
  age: number;
  lastSeen: string;
  avatar: string;
  verified: boolean;
  identity: string;
  distance: string;
  bio: string;
  zodiac: string;
  interests: string[];
}

const matchesData: Match[] = [
  { name: "Mila", age: 26, lastSeen: "6h ago", avatar: "/images/male/tinder/5.jpg", verified: true, identity: "Bisexual", distance: "2 km", bio: "Good vibes only.", zodiac: "Virgo", interests: ["Hiking", "Music"] },
  { name: "John", age: 25, lastSeen: "4h ago", avatar: "/images/female/tinder/5.jpg", verified: true, identity: "Bisexual", distance: "2 km", bio: "Adrenaline junkie.", zodiac: "Leo", interests: ["Fitness", "Books"] },
  { name: "Harper", age: 21, lastSeen: "3h ago", avatar: "/images/male/tinder/3.jpg", verified: false, identity: "Woman", distance: "5 km", bio: "Sunsets and wine.", zodiac: "Leo", interests: ["Travel", "Photo"] },
  { name: "Will", age: 23, lastSeen: "2h ago", avatar: "/images/female/tinder/3.jpg", verified: true, identity: "Man", distance: "8 km", bio: "Sarcasm fluent.", zodiac: "Gemini", interests: ["Movies", "Dogs"] },
  { name: "Luna", age: 24, lastSeen: "5h ago", avatar: "/images/male/tinder/6.jpg", verified: false, identity: "Woman", distance: "4 km", bio: "Stargazer.", zodiac: "Pisces", interests: ["Space", "Art"] },
  { name: "Alex", age: 28, lastSeen: "Online", avatar: "/images/female/tinder/6.jpg", verified: true, identity: "Man", distance: "3 km", bio: "Chef & Adventurer.", zodiac: "Scorpio", interests: ["Food", "Hiking"] }
]

const photosList = ["/images/censored/photo1.jpg", "/images/censored/photo2.jpg", "/images/censored/photo3.jpg", "/images/censored/photo4.jpg"]

// ==========================================================

function DatingScannerContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q')
  const [step, setStep] = useState(1)

  // Inputs
  const [selectedGender, setSelectedGender] = useState<string | null>(null)
  const [ageRange, setAgeRange] = useState<string | null>(null)
  const [relationshipStatus, setRelationshipStatus] = useState<string | null>(null)
  const [suspicionLevel, setSuspicionLevel] = useState<string | null>(null)
  const [redFlags, setRedFlags] = useState<string[]>([])
  const [imageUploaded, setImageUploaded] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)

  // States
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [scanPhase, setScanPhase] = useState(0)
  const [location, setLocation] = useState("Unknown Location")
  const [timeLeft, setTimeLeft] = useState(5 * 60)
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const testimonials = [
    {
      name: "Jessica, 31",
      location: "Orlando, FL",
      text: "I honestly didn't think it would work, but the report pulled up deleted chats that explained everything. It felt like the missing piece.",
      video: "https://play.tynk.ai/p/55c0525d-8354-4cd6-a98f-34a31df5b1aa"
    },
    {
      name: "Amanda, 44",
      location: "Dallas, TX",
      text: "I was nervous, but within minutes it showed hidden messages and even voice notes. That was the confirmation I needed.",
      video: "https://play.tynk.ai/p/d04e1286-c92c-4f39-a679-2ce4b742cd59"
    },
    {
      name: "Daniel, 38",
      location: "Fresno, CA",
      text: "It's not guesses or random alertsâ€¦ it's actual proof. I saw the screenshots myself. It's worth it.",
      video: "https://play.tynk.ai/p/ac310c50-c224-4c0f-bdc0-ebf311ef7afa"
    }
  ]

  // Dynamic Matches State
  const [randomMatches, setRandomMatches] = useState<Match[]>([])

  useEffect(() => {
    // Fetch user location silently
    fetch('/api/geo')
      .then(res => res.json())
      .then(data => {
        if (data.city && data.city !== 'Unknown Location') {
          setLocation(data.city)
        } else {
          // Fallback to external service if internal fails
          fetch('https://get.geojs.io/v1/ip/geo.json')
            .then(res => res.json())
            .then(geo => {
              if (geo.city) setLocation(geo.city)
            })
            .catch(e => console.error("Fallback geo error:", e))
        }
      })
      .catch(err => {
        console.error("Geo fetch error:", err)
        // Fallback on error
        fetch('https://get.geojs.io/v1/ip/geo.json')
          .then(res => res.json())
          .then(geo => {
            if (geo.city) setLocation(geo.city)
          })
          .catch(e => console.error("Fallback geo error:", e))
      })
  }, [])

  useEffect(() => {
    // Generate matches when component mounts or step changes to 3 (Results)
    // Matches should be opposite gender of the target (suspect)
    if (step === 3 && selectedGender) {
      const targetGender = selectedGender === 'female' ? 'male' : 'female';
      const namesList = targetGender === 'male' ? MALE_NAMES : FEMALE_NAMES;
      // Shuffle names to ensure randomness but uniqueness in the slice
      const shuffledNames = [...namesList].sort(() => 0.5 - Math.random());

      const newMatches = Array.from({ length: 6 }).map((_, i) => getRandomProfile(targetGender, i, shuffledNames[i]));
      setRandomMatches(newMatches);
    }
  }, [step, selectedGender])

  const checkoutRef = useRef<HTMLDivElement>(null)
  const videoScrollRef = useRef<HTMLDivElement>(null)

  const scrollVideos = (direction: 'left' | 'right') => {
    if (videoScrollRef.current) {
      const scrollAmount = 300
      videoScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }


  const scrollToCheckout = useCallback(() => {
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])


  useEffect(() => {
    if (step === 3 && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev: number) => prev - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [step, timeLeft])

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "00:00"
    const m = Math.floor(seconds / 60).toString().padStart(2, "0")
    const s = (seconds % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setImagePreview(ev.target?.result as string)
        setImageUploaded(true)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const startInvestigation = () => {
    setStep(2)



    // Save analytics
    fetch('/api/survey-responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gender: selectedGender, ageRange, relationshipStatus, suspicionLevel, redFlags })
    }).catch(err => console.log('Survey save error', err))



    // Loading Simulation
    const scanSteps = [1, 2, 3, 4, 5]
    scanSteps.forEach((phase, i) => {
      setTimeout(() => {
        setScanPhase(phase)
        setLoadingProgress(((i + 1) / scanSteps.length) * 85)
      }, (i + 1) * 1500)
    })

    setTimeout(() => {
      setScanPhase(6) // Intermediate results
      setLoadingProgress(100)
    }, 7000)

    setTimeout(() => {
      // Mark as scanned to prevent future free attempts
      document.cookie = "has_scanned=true; path=/; max-age=2592000"; // 30 days
      localStorage.setItem("has_scanned", "true");
      
      setStep(3)
      setScanPhase(0)
    }, 10000)
  }

  const toggleRedFlag = (flag: string) => {
    setRedFlags(prev => prev.includes(flag) ? prev.filter(f => f !== flag) : [...prev, flag])
  }

  // Multi-Input States
  // --- COUNTRY DATA IMPORTED ---

  // Multi-Input States
  const [activeInputTab, setActiveInputTab] = useState<'photo' | 'instagram' | 'whatsapp'>('instagram')
  const [instagramUsername, setInstagramUsername] = useState('')
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [countrySearch, setCountrySearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]) // Default to USA
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [isFetchingProfile, setIsFetchingProfile] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [instagramFeed, setInstagramFeed] = useState<any[]>([])

  const checkProfile = async (type: 'instagram' | 'whatsapp', value: string) => {
    setErrorMessage(null);
    let cleanValue = value.trim();

    if (type === 'instagram') {
      cleanValue = cleanValue.replace('@', '');
      setInstagramUsername(cleanValue);
      if (cleanValue.length < 3) return;
    } else {
      // WhatsApp validation
      if (cleanValue.replace(/\D/g, '').length < 6) return;
    }

    setIsFetchingProfile(true);

    try {
      if (type === 'instagram') {
        // ... Existing Instagram Logic ...
        const res = await fetch('/api/instagram/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: cleanValue })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.profile) {
            if (data.profile.profile_pic_url) {
              setImagePreview(data.profile.profile_pic_url);
              setImageUploaded(true);
            } else {
              setErrorMessage("Profile found but private/no photo accessible.");
            }

            // Fetch feed for Instagram Scanner
            try {
              const postsRes = await fetch('/api/instagram/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: cleanValue })
              });
              if (postsRes.ok) {
                const postsData = await postsRes.json();
                if (postsData.success && postsData.posts) {
                  setInstagramFeed(postsData.posts);
                }
              }
            } catch (err) {
              console.error("Feed fetch error", err);
            }
          } else {
            setErrorMessage(data.error || "Profile picture not found.");
          }
        } else {
          setErrorMessage("Could not verify profile. Please check the username.");
        }
      } else {

        // WhatsApp Logic - CALLING RESTORED API
        const fullNumber = cleanValue.replace(/\D/g, ''); // User input cleaned

        const res = await fetch('/api/whatsapp-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: fullNumber,
            countryCode: selectedCountry.code
          })
        });

        const data = await res.json();

        if (res.ok && (data.result || data.imageUrl)) {
          const imgUrl = data.result || data.imageUrl;
          setImagePreview(imgUrl);
          setImageUploaded(true);
        } else {
          // Fallback handled by API mostly, but if fails:
          console.error("WhatsApp API Error:", data);
          setErrorMessage("Could not retrieve WhatsApp profile photo. Please verify the number.");
        }
      }

    } catch (error) {
      console.error("Profile fetch error", error);
      setErrorMessage("Connection error. Please try again.");
    } finally {
      setIsFetchingProfile(false);
    }
  }

  // --- AUTO-FETCH EFFECT ---
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeInputTab === 'instagram' && instagramUsername.length > 3) {
        checkProfile('instagram', instagramUsername);
      } else if (activeInputTab === 'whatsapp' && whatsappNumber.length > 5) {
        checkProfile('whatsapp', whatsappNumber);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [instagramUsername, whatsappNumber, activeInputTab]);

  const isFormComplete = selectedGender && ageRange && relationshipStatus && suspicionLevel && redFlags.length > 0 && (imageUploaded || (activeInputTab === 'instagram' && instagramUsername.length > 2) || (activeInputTab === 'whatsapp' && whatsappNumber.length > 5))

  // --------------------------------------------------------
  // STEP 1: INPUT (DARK MODE)
  // --------------------------------------------------------
  const renderInputStep = () => (
    <div className="space-y-6 animate-fade-in w-full max-w-lg mx-auto pb-32 px-4">

      {/* Header */}
      {searchQuery && (
        <div className="mb-6 bg-cyan-500/10 border border-cyan-500/30 p-3 rounded-lg flex items-center gap-3 animate-pulse">
          <Search className="w-5 h-5 text-cyan-400" />
          <p className="text-sm text-cyan-200">
            Continuing scan for: <span className="font-bold text-white uppercase">{searchQuery}</span>
          </p>
        </div>
      )}

      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-cyan-500/10 rounded-full border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <Search className="w-8 h-8 text-cyan-400" />
        </div>
        <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Initiate Search</h1>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">
          Configure search parameters to scan 50+ dating networks anonymously.
        </p>
      </div>

      {/* 1. Gender */}
      <div className="bg-[#0f172a] rounded-xl border border-slate-700 p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <User className="w-4 h-4" /> Target Gender
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {['male', 'female'].map(g => (
            <button
              key={g}
              onClick={() => setSelectedGender(g)}
              className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-1 ${selectedGender === g
                ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600'
                }`}
            >
              <span className="text-xl">{g === 'male' ? 'ðŸ‘¨' : 'ðŸ‘©'}</span>
              <span className="text-[10px] font-bold uppercase">{g.replace('-', ' ')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Age */}
      <div className="bg-[#0f172a] rounded-xl border border-slate-700 p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Activity className="w-4 h-4" /> Target Age
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {['18-24', '25-34', '35-44', '45+'].map(val => (
            <button
              key={val}
              onClick={() => setAgeRange(val)}
              className={`py-2 rounded-lg border text-xs font-bold transition-all ${ageRange === val
                ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Relationship */}
      <div className="bg-[#0f172a] rounded-xl border border-slate-700 p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <HeartCrack className="w-4 h-4" /> Status
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { v: 'married', l: 'Married' }, { v: 'relationship', l: 'Relationship' },
            { v: 'complicated', l: 'Complicated' }, { v: 'dating', l: 'Dating' }
          ].map(o => (
            <button
              key={o.v}
              onClick={() => setRelationshipStatus(o.v)}
              className={`p-3 text-left rounded-lg border text-xs font-bold transition-all ${relationshipStatus === o.v
                ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
            >
              {o.l}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Suspicion */}
      <div className="bg-[#0f172a] rounded-xl border border-slate-700 p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Suspicion Level
        </h2>
        <div className="space-y-2">
          {[
            { v: 'certain', l: "I'm almost certain" },
            { v: 'gut', l: "I have a gut feeling" },
            { v: 'unsure', l: "Not sure, just checking" }
          ].map(o => (
            <button
              key={o.v}
              onClick={() => setSuspicionLevel(o.v)}
              className={`w-full p-3 text-left rounded-lg border text-xs font-medium transition-all ${suspicionLevel === o.v
                ? 'bg-rose-500/10 border-rose-500 text-rose-400'
                : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
            >
              {o.l}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Red Flags */}
      <div className="bg-[#0f172a] rounded-xl border border-slate-700 p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" /> Detected Signs
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { v: 'hide_phone', l: 'Hides Phone' }, { v: 'changed_passwords', l: 'New Passwords' },
            { v: 'late_nights', l: 'Late Nights' }, { v: 'deleting_messages', l: 'Deleting Msgs' },
            { v: 'distant', l: 'Distant' }, { v: 'appearance', l: 'New Look' }
          ].map(o => (
            <button
              key={o.v}
              onClick={() => toggleRedFlag(o.v)}
              className={`p-2 text-center rounded border text-[10px] uppercase font-bold transition-all ${redFlags.includes(o.v)
                ? 'bg-rose-500/10 border-rose-500 text-rose-400'
                : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}
            >
              {o.l}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Identification Method (Required) */}
      <div className="bg-[#0f172a] rounded-xl border border-slate-700 p-5 space-y-4">
        <label className="text-sm font-bold text-slate-400 flex items-center gap-2 uppercase tracking-wide">
          <ScanFace className="w-4 h-4 text-cyan-500" /> Identify Subject (Required)
        </label>
        <p className="text-[14px] text-slate-500 -mt-2">
          Provide at least one of the options below so we can start the investigation.
        </p>

        {/* Tabs */}
        <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 shadow-inner">
          <button 
            type="button"
            onClick={() => { setActiveInputTab('instagram'); setErrorMessage(null); }} 
            className={`flex-1 py-3 text-xs font-bold uppercase rounded-lg transition-all ${activeInputTab === 'instagram' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Instagram
          </button>
          <button 
            type="button"
            onClick={() => { setActiveInputTab('photo'); setErrorMessage(null); }} 
            className={`flex-1 py-3 text-xs font-bold uppercase rounded-lg transition-all ${activeInputTab === 'photo' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Photo
          </button>
          <button 
            type="button"
            onClick={() => { setActiveInputTab('whatsapp'); setErrorMessage(null); }} 
            className={`flex-1 py-3 text-xs font-bold uppercase rounded-lg transition-all ${activeInputTab === 'whatsapp' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            WhatsApp
          </button>
        </div>

        {/* Content Area */}
        <div className="min-h-[120px] flex flex-col justify-center">

          {/* PHOTO UPLOAD */}
          {activeInputTab === 'photo' && (
            <label className="block w-full h-40 border-2 border-dashed border-slate-600 rounded-2xl hover:border-cyan-500 hover:bg-cyan-500/5 transition-all cursor-pointer relative flex flex-col items-center justify-center gap-3 group overflow-hidden">
              <input type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
              {imagePreview && activeInputTab === 'photo' ? (
                <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-50" />
              ) : (
                <ScanFace className="w-8 h-8 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              )}
              <span className="text-xs text-slate-400 font-mono relative z-10 bg-slate-900/50 px-2 py-1 rounded">
                {imageUploaded ? "IMAGE UPLOADED" : "UPLOAD TARGET PHOTO"}
              </span>
            </label>
          )}

          {/* INSTAGRAM INPUT */}
          {activeInputTab === 'instagram' && (
            <div className="space-y-3">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-500 font-bold">@</span>
                </div>
                <input
                  type="text"
                  className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-8 p-3"
                  placeholder="username"
                  value={instagramUsername}
                  onChange={(e) => setInstagramUsername(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {isFetchingProfile && <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>}
                </div>
              </div>
            </div>
          )}

          {/* WHATSAPP INPUT WITH COUNTRY SELECTOR */}
          {activeInputTab === 'whatsapp' && (
            <div className="space-y-3 relative">
              <div className="flex bg-slate-900 rounded-lg border border-slate-700 focus-within:border-emerald-500 transition-colors">

                {/* Country Dropdown Trigger */}
                <button
                  type="button"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  className="flex items-center gap-2 px-3 border-r border-slate-700 hover:bg-slate-800 transition-colors rounded-l-lg"
                >
                  <span className="text-xs font-bold text-white">{selectedCountry.iso || selectedCountry.name.substring(0, 2).toUpperCase()}</span>
                  <span className="text-xs font-mono text-slate-400">{selectedCountry.code}</span>
                </button>

                {/* Dropdown Menu */}
                {isCountryDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 flex flex-col max-h-60">

                    {/* Search Input */}
                    <div className="p-2 sticky top-0 bg-slate-800 border-b border-slate-700 z-10">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                        <input
                          type="text"
                          className="w-full bg-slate-900 border border-slate-700 rounded text-xs text-white pl-7 p-2 focus:border-cyan-500 outline-none"
                          placeholder="Search country..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          autoFocus
                        />
                      </div>
                    </div>

                    {/* List */}
                    <div className="overflow-y-auto flex-1">
                      {COUNTRIES.filter(c =>
                        c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
                        c.code.includes(countrySearch) ||
                        (c.iso && c.iso.toLowerCase().includes(countrySearch.toLowerCase()))
                      ).map((c, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedCountry(c);
                            setIsCountryDropdownOpen(false);
                            setCountrySearch('');
                          }}
                          className="w-full flex items-center gap-3 p-2 hover:bg-slate-700 text-left transition-colors border-b border-slate-700/50 last:border-0"
                        >
                          <span className="text-sm font-bold text-white w-6 flex-shrink-0 text-center">{c.iso}</span>
                          <div>
                            <p className="text-xs text-white font-bold">{c.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono">{c.code}</p>
                          </div>
                        </button>
                      ))}
                      {COUNTRIES.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase())).length === 0 && (
                        <div className="p-4 text-center text-slate-500 text-xs">No countries found</div>
                      )}
                    </div>
                  </div>
                )}

                <input
                  type="tel"
                  className="flex-1 bg-transparent text-white text-sm p-3 outline-none placeholder-slate-600 font-mono"
                  placeholder={selectedCountry.placeholder}
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value.replace(/[^0-9]/g, ''))}
                />

                <div className="pr-3 flex items-center">
                  {isFetchingProfile && <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>}
                </div>
              </div>
              <p className="text-[10px] text-slate-500 text-center">
                Select country and enter number (without country code).
              </p>
            </div>
          )}
        </div>

        {/* PROFILE RESULT PREVIEW */}
        {imageUploaded && (
          <div className="mt-4 p-3 bg-[#0B1120] border border-cyan-500/30 rounded-lg flex items-center gap-3 animate-fade-in">
            <div className="relative">
              <img src={imagePreview!} alt="Profile" className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border border-black"></div>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold flex items-center gap-2">
                {activeInputTab === 'whatsapp' ? 'Number Active' : 'Profile Found'}
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              </h4>
              <p className="text-[10px] text-emerald-400">
                {activeInputTab === 'whatsapp' ? 'WhatsApp profile verified' : 'Ready to scan'}
              </p>
            </div>
            <button
              onClick={() => { setImageUploaded(false); setImagePreview(undefined); setInstagramUsername(''); setWhatsappNumber(''); }}
              className="ml-auto text-slate-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {errorMessage && (
          <div className="bg-rose-500/10 border border-rose-500/30 p-2 rounded text-[10px] text-rose-400 flex items-center gap-2 animate-in fade-in">
            <AlertTriangle className="w-3 h-3" />
            {errorMessage}
          </div>
        )}
      </div>

      {/* 7. Start Scan Button */}
      <button
        onClick={startInvestigation}
        disabled={!isFormComplete || isFetchingProfile}
        className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:grayscale transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
      >
        {isFetchingProfile ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> VERIFYING TARGET...
          </>
        ) : (
          <>
            RUN DEEP SCAN <ShieldCheck className="w-5 h-5" />
          </>
        )}
      </button>

      <div className="text-center">
        <p className="text-[10px] text-slate-500">
          By scanning, you agree to our Terms of Service. All data is encrypted locally.
        </p>
      </div>

    </div>
  )

  // --------------------------------------------------------
  // STEP 2: LOADING (DARK MODE)
  // --------------------------------------------------------
  const renderLoadingStep = () => {
    if (scanPhase === 6) {
      // Intermediate Results
      return (
        <div className="space-y-6 animate-fade-in text-center max-w-md mx-auto pt-10">
          <div className="w-20 h-20 mx-auto bg-rose-500/10 rounded-full border-2 border-rose-500 flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(244,63,94,0.3)]">
            <AlertTriangle className="w-10 h-10 text-rose-500" />
          </div>

          <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Profiles Detected</h1>

          <div className="bg-[#0f172a] rounded-xl border border-rose-500/30 p-6 text-left space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-rose-500"></div>

            <div className="flex items-center gap-3">
              <div className="bg-rose-500/20 p-2 rounded text-rose-500"><Globe className="w-5 h-5" /></div>
              <div>
                <h3 className="text-sm font-bold text-white">Active Activity Found</h3>
                <p className="text-xs text-rose-400">Linked to 3 major dating apps.</p>
              </div>
            </div>

            <div className="h-px bg-slate-700"></div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Last Active:</span>
                <span className="text-emerald-400 font-bold">18 mins ago</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Location:</span>
                <span className="text-white font-mono">{location}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Status:</span>
                <span className="text-emerald-400 font-bold animate-pulse">ONLINE</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-400 animate-pulse">Generating final dossier...</p>
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 px-4">
        {activeInputTab === 'instagram' ? (
          /* ---- INSTAGRAM SCAN VIEW ---- */
          <div className="w-full max-w-sm mx-auto space-y-6 animate-fade-in">
            {/* Profile Circle */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className="w-20 h-20 rounded-full p-[3px]" style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#0f172a]">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                        <span className="text-2xl text-slate-400">{instagramUsername?.[0]?.toUpperCase() ?? '?'}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0f172a] flex items-center justify-center border border-slate-700">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-grad)" />
                    <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.5" fill="none" />
                    <circle cx="17" cy="7" r="1" fill="white" />
                    <defs>
                      <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#f09433" />
                        <stop offset="50%" stopColor="#e6283c" />
                        <stop offset="100%" stopColor="#bc1888" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-base">Analyzing Profile...</p>
                {instagramUsername && <p className="text-slate-400 text-sm">@{instagramUsername}</p>}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-mono">
                  {scanPhase === 1 && "Accessing profile..."}
                  {scanPhase === 2 && "Running facial recognition..."}
                  {scanPhase === 3 && "Triangulating location..."}
                  {scanPhase === 4 && "Decrypting private logs..."}
                  {scanPhase === 5 && "Compiling evidence..."}
                  {scanPhase === 0 && "Bypassing security..."}
                </span>
                <span className="text-rose-400 font-bold">{Math.round(loadingProgress)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${loadingProgress}%`,
                    background: 'linear-gradient(to right, #f09433, #e6283c, #bc1888)'
                  }}
                />
              </div>
            </div>

            {/* Feed Grid */}
            <div className="grid grid-cols-3 gap-1 w-full">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-slate-800 rounded overflow-hidden relative"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {instagramFeed[i] ? (
                    <img 
                      src={instagramFeed[i].imageUrl} 
                      alt={`Feed ${i}`} 
                      className="w-full h-full object-cover animate-fade-in"
                      style={{ 
                        opacity: scanPhase >= Math.ceil((i + 1) / 3) ? 1 : 0.3,
                        filter: scanPhase >= Math.ceil((i + 1) / 3) ? 'none' : 'blur(2px)'
                      }}
                    />
                  ) : (
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse"
                      style={{
                        animationDelay: `${i * 0.2}s`,
                        opacity: scanPhase > i * 0.5 ? 0.4 : 1
                      }}
                    />
                  )}
                  {scanPhase >= Math.ceil((i + 1) / 3) && (
                    <div className="absolute inset-0 bg-slate-700/10 flex items-center justify-center">
                      {!instagramFeed[i] && <div className="w-4 h-4 border border-rose-500/40 rounded-sm" />}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ---- DEFAULT RADAR VIEW ---- */
          <>
            {/* Radar Animation */}
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 border border-slate-700 rounded-full"></div>
              <div className="absolute inset-[20%] border border-slate-700/50 rounded-full"></div>
              <div className="absolute inset-[40%] border border-slate-700/30 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-full h-1/2 bg-gradient-to-t from-cyan-500/20 to-transparent origin-top animate-radar-spin rounded-t-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_cyan]"></div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-white uppercase tracking-widest">Scanning Deep Web</h2>
              <p className="text-cyan-400 font-mono text-sm">
                {scanPhase === 1 && "Accessing Tinder API..."}
                {scanPhase === 2 && "Running Facial Recognition..."}
                {scanPhase === 3 && "Triangulating GPS Data..."}
                {scanPhase === 4 && "Decrypting Private Logs..."}
                {scanPhase === 5 && "Compiling Evidence..."}
              </p>
            </div>

            {/* Steps */}
            <div className="w-full max-w-xs space-y-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className={`flex items-center gap-3 text-xs transition-colors ${scanPhase >= s ? 'text-emerald-400' : 'text-slate-600'}`}>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${scanPhase >= s ? 'bg-emerald-500/20 border-emerald-500' : 'border-slate-700'}`}>
                    {scanPhase >= s && <CheckCircle2 className="w-3 h-3" />}
                  </div>
                  <span className="uppercase font-bold tracking-wider">Protocol 0{s}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  // --------------------------------------------------------
  // STEP 3: RESULTS (DARK MODE)
  // --------------------------------------------------------
  const renderResultsStep = () => {
    const genderFolder = selectedGender === 'female' ? 'female' : 'male';
    const displayMatches = randomMatches.length > 0 ? randomMatches : [];

    const dynamicHiddenPhotos = genderFolder === 'male'
      ? ["censored-f-1.jpg", "censored-f-2.jpg", "censored-f-3.jpg", "censored-f-4.jpg"].map(f => `/images/male/tinder/censored/${f}`)
      : ["censored-h-1.jpg", "censored-h-2.jpg", "censored-h-3.jpg", "censored-h-4.jpg"].map(f => `/images/female/tinder/censored/${f}`);

    return (
      <div className="space-y-6 animate-fade-in w-full max-w-lg mx-auto pb-20">

        {/* Alert Main */}
        <div className="bg-rose-500 text-white p-4 rounded-xl shadow-[0_0_30px_rgba(244,63,94,0.4)] flex items-center gap-4 border border-rose-400">
          <AlertTriangle className="w-8 h-8 shrink-0 animate-bounce" />
          <div>
            <h1 className="font-bold text-lg uppercase tracking-tight">Positive Match Found</h1>
            <p className="text-xs text-rose-100">User is currently <span className="font-bold underline">ONLINE</span> in {location}.</p>
          </div>
        </div>

        {/* URGENCY BANNER */}
        <div className="bg-orange-500/10 border border-orange-500/50 p-4 rounded-xl flex items-start gap-3 mt-4">
          <Activity className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wide">Data Locking Imminent</h3>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              To guarantee true anonymity and comply with privacy rules, these intercepted messages and hidden galleries will be <strong>permanently encrypted</strong> in {formatTime(timeLeft)}.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { v: 6, l: 'Matches', c: 'text-rose-500' },
            { v: 30, l: 'Likes', c: 'text-purple-500' },
            { v: 'Active', l: 'Status', c: 'text-emerald-500' },
            { v: '18h', l: 'Last Seen', c: 'text-white' }
          ].map((s, i) => (
            <div key={i} className="bg-[#0f172a] p-2 rounded-lg border border-slate-700 text-center">
              <p className={`text-xl font-bold ${s.c}`}>{s.v}</p>
              <p className="text-[9px] text-slate-500 uppercase font-bold">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Matches Detected */}
        <div className="bg-[#0f172a] rounded-xl border border-slate-700 overflow-hidden">
          <div className="bg-slate-800/50 p-3 border-b border-slate-700 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <HeartCrack className="w-4 h-4 text-rose-500" /> Recent Matches
            </span>
            <span className="bg-rose-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">3 NEW</span>
          </div>
          <div className="divide-y divide-slate-800">
            {displayMatches.slice(0, 3).map((m: Match, i: number) => (
              <div
                key={i}
                className="p-3 flex items-center gap-3 hover:bg-slate-800/50 cursor-pointer transition-colors"
                onClick={() => setSelectedMatch(m)}
              >
                <div className="relative">
                  <img src={m.avatar} className="w-10 h-10 rounded-full object-cover border border-slate-600" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-black"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-bold text-white">{m.name}, {m.age}</p>
                    <p className="text-[10px] text-slate-500">{m.lastSeen}</p>
                  </div>
                  <p className="text-[10px] text-slate-400">Within {m.distance} â€¢ {m.identity}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>
            ))}
          </div>
        </div>

        {/* RECENT CHATS */}
        <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 overflow-hidden shadow-lg animate-fade-in delay-100">
          <div className="bg-slate-800/50 p-3 border-b border-slate-700 flex justify-between items-center group">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Recent Chats</h3>
            </div>
          </div>
          <div className="p-3 bg-slate-900/50 border-b border-slate-800 text-[10px] text-slate-400">
            Tap on a conversation to read their messages
          </div>

          <div className="divide-y divide-slate-800">
            {displayMatches.slice(3, 6).map((match: Match, i: number) => (
              <div
                key={i}
                onClick={scrollToCheckout}
                className="p-3 bg-[#0f172a] hover:bg-slate-800/80 cursor-pointer transition-colors flex items-center gap-3 group/chat"
              >
                <div className="relative">
                  <img src={match.avatar} className="w-10 h-10 rounded-full object-cover border border-slate-700 group-hover/chat:border-blue-500/50 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0f172a]"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="text-xs font-bold text-white truncate group-hover/chat:text-blue-400 transition-colors">{match.name}, {match.age}</h4>
                    <span className="text-[9px] text-slate-500 font-medium">Just now</span>
                  </div>
                  <p className="text-[10px] text-blue-400/80 flex items-center gap-1.5 font-medium truncate">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full inline-block animate-pulse"></span> Click to read messages...
                  </p>
                </div>
                <div className="text-slate-600 group-hover/chat:text-slate-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUSPICIOUS LOCATIONS */}
        <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 overflow-hidden shadow-lg animate-fade-in delay-200">
          <div className="bg-slate-800/50 p-3 border-b border-slate-700 flex justify-between items-center group">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500 group-hover:text-rose-400 transition-colors" />
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Suspicious Locations</h3>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg text-xs leading-relaxed text-slate-300">
              <span className="font-bold text-rose-400">3 suspicious activities</span> detected near: <span className="font-bold text-white">{location}</span>
            </div>

            <div className="relative w-full h-40 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 group cursor-pointer" onClick={scrollToCheckout}>
              <iframe
                title="Suspicious Location Map"
                src={`https://maps.google.com/maps?q=motel+near+${encodeURIComponent(location)}&output=embed&z=13`}
                className="w-full h-full opacity-50 hover:opacity-100 transition-opacity grayscale invert-[.85] hover:invert-0 hover:grayscale-0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="relative">
                  <div className="w-4 h-4 bg-rose-500 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-75"></div>
                  <MapPin className="w-8 h-8 text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)] relative z-10" />
                </div>
              </div>

              <div className="absolute bottom-2 right-2 bg-slate-900/90 border border-slate-700 px-2 py-1 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[8px] text-slate-400 font-bold uppercase">Live Tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Censored Photos */}
        <div className="bg-[#0f172a] rounded-xl border border-slate-700 p-4 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Lock className="w-3 h-3 text-cyan-400" /> Private Photos
            </h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {dynamicHiddenPhotos.map((src: string, i: number) => (
              <div key={i} className="flex-shrink-0 w-48 h-64 bg-slate-800 rounded relative overflow-hidden">
                <img src={src} className="w-full h-full object-cover blur-sm opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Eye className="text-white w-6 h-6 opacity-80" />
                </div>
                <div className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-[8px] text-white">HIDDEN</div>
              </div>
            ))}
          </div>
        </div>

        {/* UNLOCK WIDGET */}
        <div ref={checkoutRef} className="bg-[#0B1120] border border-cyan-500/50 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.15)] p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
            HIGH PRIORITY
          </div>

          <div className="mx-auto w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 border border-cyan-500/30 animate-pulse">
            <LockOpen className="w-7 h-7 text-cyan-400" />
          </div>

          <h2 className="text-xl font-black text-white uppercase tracking-wide mb-2">UNLOCK FULL DOSSIER</h2>
          <p className="text-xs text-slate-400 mb-6 px-4">Get instant access to the full report with all chats, conversations, audio, videos, location history and photos exchanged.</p>

          <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg mb-6 flex flex-col items-center justify-center max-w-[280px] mx-auto space-y-2">
            <div className="flex justify-between w-full items-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Offer Expires:</span>
              <span className="font-mono font-bold text-rose-500 text-lg">{formatTime(timeLeft)}</span>
            </div>
            <div className="w-full h-px bg-slate-800 my-1"></div>
            <div className="flex justify-between w-full items-center">
              <span className="text-xs text-slate-400 line-through">Regular: $149.00</span>
              <span className="font-black text-emerald-400 text-2xl">Today: $37</span>
            </div>
            <p className="text-[9px] text-slate-500">Includes full evidence download & updates</p>
          </div>

          <a
            href="https://go.plataformafortpay.com.br/ousxjbuoqw?ref="
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-emerald-500 hover:bg-emerald-400 text-[#0B1120] font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all transform hover:scale-[1.02] uppercase tracking-widest text-sm relative z-10"
          >
            UNLOCK REPORT FOR $37
          </a>

          <div className="flex justify-center items-center gap-4 mt-4 text-[10px] text-slate-500 font-mono">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-500"/> 256-bit SSL</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500"/> 7-Day Guarantee</span>
          </div>
        </div>

        {/* VIDEO TESTIMONIALS */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-700/50 p-6 space-y-4 shadow-2xl relative overflow-hidden mt-8 w-full block">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none"></div>

          <div className="text-center relative z-10 w-full mb-2">
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide">WHAT THEY DISCOVERED</h2>
            <p className="text-xs text-slate-400 mt-2">Real reactions from people who unlocked their reports today.</p>
          </div>

          <div className="relative group">
            <button 
              onClick={() => scrollVideos('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 z-20 bg-[#0B1120] hover:bg-slate-800 text-white rounded-full p-2 border border-slate-700 transition shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button 
              onClick={() => scrollVideos('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 z-20 bg-[#0B1120] hover:bg-slate-800 text-white rounded-full p-2 border border-slate-700 transition shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div 
              ref={videoScrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 relative z-10"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* JESSICA */}
              <div className="w-[280px] shrink-0 snap-center flex flex-col gap-3">
                <div className="w-full aspect-[9/16] rounded-xl overflow-hidden border border-slate-700 shadow-xl bg-black relative">
                  <iframe
                    src="https://play.tynk.ai/p/55c0525d-8354-4cd6-a98f-34a31df5b1aa"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 shadow-inner">
                  <h4 className="font-bold text-white text-[13px] mb-2">Jessica, 31 â€” Orlando, FL</h4>
                  <p className="text-xs text-slate-400 italic leading-relaxed">&quot;I honestly didn&apos;t think it would work, but the report pulled up deleted chats that explained everything. It felt like the missing piece.&quot;</p>
                </div>
              </div>

              {/* AMANDA */}
              <div className="w-[280px] shrink-0 snap-center flex flex-col gap-3">
                <div className="w-full aspect-[9/16] rounded-xl overflow-hidden border border-slate-700 shadow-xl bg-black relative">
                  <iframe
                    src="https://play.tynk.ai/p/d04e1286-c92c-4f39-a679-2ce4b742cd59"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 shadow-inner">
                  <h4 className="font-bold text-white text-[13px] mb-2">Amanda, 44 â€” Dallas, TX</h4>
                  <p className="text-xs text-slate-400 italic leading-relaxed">&quot;I was nervous, but within minutes it showed hidden messages and even voice notes. That was the confirmation I needed.&quot;</p>
                </div>
              </div>

              {/* DANIEL */}
              <div className="w-[280px] shrink-0 snap-center flex flex-col gap-3">
                <div className="w-full aspect-[9/16] rounded-xl overflow-hidden border border-slate-700 shadow-xl bg-black relative">
                  <iframe
                    src="https://play.tynk.ai/p/ac310c50-c224-4c0f-bdc0-ebf311ef7afa"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 shadow-inner">
                  <h4 className="font-bold text-white text-[13px] mb-2">Daniel, 38 â€” Fresno, CA</h4>
                  <p className="text-xs text-slate-400 italic leading-relaxed">&quot;It&apos;s not guesses or random alertsâ€¦ it&apos;s actual proof. I saw the screenshots myself. It&apos;s worth it.&quot;</p>
                </div>
              </div>
            </div>
            
            <div className="w-full flex justify-center mt-2 gap-1.5 opacity-50">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <div className="w-2 h-2 rounded-full bg-slate-600"></div>
              <div className="w-2 h-2 rounded-full bg-slate-600"></div>
            </div>
          </div>
        </div>

        {/* FAQ & OBJECTIONS */}
        <div className="bg-[#0f172a]/80 rounded-2xl border border-slate-700/30 p-6 space-y-6 shadow-xl mt-8 w-full">
          <h2 className="text-xl font-bold text-white text-center mb-6 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col items-start text-left">
              <h4 className="font-bold text-sm text-white flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-emerald-400" /> Is this 100% Anonymous?
              </h4>
              <p className="text-xs text-slate-400">Absolutely. There is no trace that you accessed this data. We don&apos;t notify them or need any access to their device.</p>
            </div>
            
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col items-start text-left">
              <h4 className="font-bold text-sm text-white flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-emerald-400" /> What exactly is in the report?
              </h4>
              <p className="text-xs text-slate-400">You will instantly download a dossier containing hidden social media activity, deleted messages logs, GPS history, and hidden gallery items found in our database scan.</p>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex flex-col items-start text-left">
              <h4 className="font-bold text-sm text-white flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> What if I don&apos;t find anything?
              </h4>
              <p className="text-xs text-slate-400">If our scan comes back completely clean, you have the peace of mind you deserve. You are covered by our 7-Day Guarantee.</p>
            </div>
          </div>
          
          {/* Secondary CTA */}
          <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
            <button
               onClick={scrollToCheckout}
               className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold py-4 px-8 rounded-xl transition-all text-sm uppercase tracking-widest"
            >
              Get My Dossier Now
            </button>
          </div>
        </div>

      </div>
    )
  }

  // --------------------------------------------------------
  // MATCH DETAILS MODAL (DARK)
  // --------------------------------------------------------
  const renderMatchModal = () => {
    if (!selectedMatch) return null;
    return (
      <div
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4 backdrop-blur-sm animate-in fade-in"
        onClick={() => setSelectedMatch(null)}
      >
        <div className="bg-[#0f172a] rounded-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto relative border border-slate-700 shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <button onClick={() => setSelectedMatch(null)} aria-label="Close modal" className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-10 transition-colors">
            <X className="w-5 h-5" />
          </button>

          <div className="relative h-80">
            <img src={selectedMatch.avatar} alt="Full match profile" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                {selectedMatch.name}, {selectedMatch.age}
                {selectedMatch.verified && <CheckCircle2 className="text-blue-500 w-6 h-6 fill-white" />}
              </h1>
              <div className="flex gap-2 mt-1">
                <span className="bg-slate-800/80 backdrop-blur px-2 py-0.5 rounded text-[10px] text-white font-bold uppercase">{selectedMatch.identity}</span>
                <span className="bg-slate-800/80 backdrop-blur px-2 py-0.5 rounded text-[10px] text-white font-bold uppercase">{selectedMatch.distance} away</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Bio</h2>
              <p className="text-slate-300 text-sm leading-relaxed">"{selectedMatch.bio}"</p>
            </div>

            <div>
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {selectedMatch.interests.map((int: string, i: number) => (
                  <span key={i} className="bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs font-medium">{int}</span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                scrollToCheckout()
                setSelectedMatch(null)
              }}
              className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold py-3 rounded-xl shadow-lg uppercase tracking-wide text-sm"
            >
              View Full Profile
            </button>
          </div>
        </div>
      </div>
    )
  }

  // --------------------------------------------------------
  // MAIN RENDER
  // --------------------------------------------------------
  return (
    <>
      {/* PERFORMANCE PRELOAD HOISTED BY NEXT.JS */}
      <link rel="preconnect" href="https://play.tynk.ai" />
      <link rel="dns-prefetch" href="https://play.tynk.ai" />
      <link rel="prerender" href="https://play.tynk.ai/p/55c0525d-8354-4cd6-a98f-34a31df5b1aa" />

      <div className="min-h-[100dvh] flex flex-col items-center bg-[#0B1120] font-sans selection:bg-cyan-500/30">
      
      <main className="w-full h-full flex-grow">
        {step === 1 && renderInputStep()}
        {step === 2 && renderLoadingStep()}
        {step === 3 && renderResultsStep()}
      </main>

      {step !== 2 && (
        <footer className="py-6 text-center border-t border-slate-800 w-full mt-auto">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest">Â© 2026 Digital Truth Check. All rights reserved.</p>
        </footer>
      )}

      {renderMatchModal()}
      </div>
    </>
  )
}

export default function DatingScanner() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center p-4"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <DatingScannerContent />
    </Suspense>
  )
}
