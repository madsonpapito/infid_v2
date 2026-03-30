"use client"

import { useState, useEffect, useRef } from "react"
import { 
  CheckCircle2, ShieldCheck, Lock, AlertTriangle, 
  Clock, Ghost, Database, Zap, ArrowRight,
  MessageSquare, Instagram, Heart, EyeOff, MapPin,
  ChevronLeft, ChevronRight, LockOpen, Eye
} from "lucide-react"

export default function RemarketingResultsPage() {
  const [timeLeft, setTimeLeft] = useState(415) // ~7 minutes
  const [progress, setProgress] = useState(0)
  const [location, setLocation] = useState("Your Location")
  const videoScrollRef = useRef<HTMLDivElement>(null)

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Simulated progress bar entry
  useEffect(() => {
    const interval = setTimeout(() => setProgress(100), 100)
    return () => clearTimeout(interval)
  }, [])

  // Fetch Location
  useEffect(() => {
    fetch('/api/geo')
      .then(res => res.json())
      .then(data => {
        if (data.city && data.city !== 'Unknown Location') setLocation(data.city)
      })
      .catch(() => setLocation("Your City"))
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const scrollVideos = (dir: 'left' | 'right') => {
    if (videoScrollRef.current) {
      const scrollAmount = 300;
      videoScrollRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  }

  const checkoutLink = "https://go.plataformafortpay.com.br/oavin"

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 font-sans selection:bg-rose-500/30 overflow-x-hidden">
      {/* 100% Complete Progress Bar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="bg-rose-600 h-9 flex items-center justify-center relative overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-rose-500 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
          <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.25em] text-white animate-pulse">
             FINAL DOSSIER: 100% RECOVERED
          </span>
        </div>
      </div>

      <main className="pt-20 pb-40 px-5 max-w-md mx-auto space-y-12">
        
        {/* Aggressive Remarketing Hook */}
        <section className="text-center space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="inline-block px-3 py-1 bg-rose-500/10 border border-rose-500/30 rounded text-[10px] font-black text-rose-500 tracking-widest uppercase mb-2">
            Remarketing Session Active
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-[0.9] text-balance">
            3 SECRET <br />
            <span className="text-rose-500">PROFILES</span> <br />
            FOUND.
          </h1>
          <p className="text-slate-400 text-sm font-medium leading-relaxed px-4">
            The target's deep web scan is complete. Private interactions and hidden locations are ready for viewing. 
            <span className="text-white font-bold block mt-2 underline decoration-rose-500">Are you ready to see the truth?</span>
          </p>
        </section>

        {/* Evidence Banner (from Step-2) */}
        <div className="bg-rose-500 text-white p-4 rounded-2xl shadow-[0_0_30px_rgba(244,63,94,0.3)] flex items-center gap-4 border border-rose-400 animate-in zoom-in duration-700">
          <AlertTriangle className="w-8 h-8 shrink-0 animate-bounce" />
          <div>
            <h1 className="font-bold text-lg uppercase tracking-tight">POSITIVE MATCH FOUND</h1>
            <p className="text-xs text-rose-100">Hidden activity detected near <span className="font-bold underline">{location}</span>.</p>
          </div>
        </div>

        {/* Stats Grid (from Step-2) */}
        <div className="grid grid-cols-4 gap-2 animate-in fade-in delay-200">
          {[
            { v: 6, l: 'Matches', c: 'text-rose-500' },
            { v: 30, l: 'Likes', c: 'text-purple-500' },
            { v: 'Active', l: 'Status', c: 'text-emerald-500' },
            { v: '18h', l: 'Last Seen', c: 'text-white' }
          ].map((s, i) => (
            <div key={i} className="bg-[#0f172a] p-3 rounded-xl border border-slate-800 text-center">
              <p className={`text-xl font-bold ${s.c}`}>{s.v}</p>
              <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Censored Matches Evidence */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden animate-in slide-in-from-right-8 duration-700 delay-300 shadow-xl">
          <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex justify-between items-center">
            <span className="text-xs font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-rose-500" /> Recent Activity
            </span>
            <span className="bg-rose-600 text-white text-[9px] px-2 py-0.5 rounded-full font-black animate-pulse">3 SENSITIVE</span>
          </div>
          <div className="divide-y divide-slate-800/50">
            {[
              { name: "D****", age: 24, activity: "Active 18m ago", color: "bg-blue-500" },
              { name: "M****", age: 27, activity: "Sending Media...", color: "bg-purple-500" },
              { name: "S****", age: 21, activity: "Active in Chat", color: "bg-emerald-500" }
            ].map((m, i) => (
              <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-800/30 transition-colors">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full border-2 border-slate-700 ${m.color} opacity-40 blur-[4px]`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-white opacity-50" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0f172a]"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-black text-white">{m.name}, {m.age}</p>
                    <p className="text-[10px] text-slate-500 font-mono">ENCRYPTED</p>
                  </div>
                  <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mt-0.5">{m.activity}</p>
                </div>
                <Lock className="w-4 h-4 text-slate-700" />
              </div>
            ))}
          </div>
        </div>

        {/* Social Discovery Grid (Remarketing counts) */}
        <section className="space-y-4 animate-in fade-in delay-500">
           <h2 className="text-[11px] font-black tracking-[0.3em] text-slate-600 uppercase text-center">
            DEEP SCAN METRICS
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: "WhatsApp Recovery", sub: "14 Private Chats (DELETED)", icon: MessageSquare, color: "text-emerald-500", count: 14 },
              { label: "Instagram Intel", sub: "3 Hidden Interaction Logs", icon: Instagram, color: "text-purple-500", count: 3 },
              { label: "Dating Network", sub: "Active Matches Found", icon: Zap, color: "text-rose-500", count: "!" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                <div className="relative">
                  <div className={`w-12 h-12 ${item.color.replace('text', 'bg')}/10 rounded-xl flex items-center justify-center`}>
                    <item.icon className={`w-6 h-6 ${item.color} opacity-60`} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 rounded-full border-2 border-[#0B1120] text-[10px] font-bold flex items-center justify-center text-white">
                    {item.count}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-black text-white uppercase tracking-wider">{item.label}</p>
                  <p className="text-[10px] text-slate-500 font-mono italic">{item.sub}</p>
                </div>
                <Lock className="w-4 h-4 text-slate-700" />
              </div>
            ))}
          </div>
        </section>

        {/* Suspicious Map (from Step-2) */}
        <section className="bg-[#0f172a] rounded-2xl border border-slate-800 p-5 space-y-5 animate-in slide-in-from-bottom-8 duration-1000">
           <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-rose-500 animate-pulse" />
              <h3 className="text-xs font-black text-white uppercase tracking-widest">SUSPICIOUS GEOLOCATION</h3>
           </div>
           <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-xs leading-relaxed text-slate-300">
              <span className="font-bold text-rose-400">Activity Cluster</span> detected near: <span className="font-bold text-white underline decoration-rose-500">{location}</span>
           </div>
           <div className="relative w-full h-44 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
              <iframe
                title="Evidence Map"
                src={`https://maps.google.com/maps?q=motel+near+${encodeURIComponent(location)}&output=embed&z=13`}
                className="w-full h-full opacity-40 grayscale invert-[.85]"
                style={{ border: 0 }}
                loading="lazy"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-12 h-12 bg-rose-500/20 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  <MapPin className="w-8 h-8 text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-slate-950/90 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-2xl">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] text-white font-black uppercase tracking-widest">LIVE TRACKING</span>
              </div>
           </div>
        </section>

        {/* Censored Private Gallery (from Step-2) */}
        <section className="bg-[#0f172a] rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Lock className="w-3 h-3 text-rose-500" /> PRIVATE MEDIA VAULT
           </h3>
           <div className="flex gap-3 overflow-x-auto pb-4 pt-1 snap-x scrollbar-hide">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-shrink-0 w-36 h-48 bg-slate-800 rounded-2xl relative overflow-hidden group snap-center border border-slate-700">
                   <img src={`/images/censored/photo${i}.jpg`} className="w-full h-full object-cover blur-[8px] opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Eye className="text-white w-6 h-6 opacity-30 shadow-2xl" />
                   </div>
                   <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 px-2 py-1 rounded text-[8px] font-black text-rose-400 uppercase tracking-widest whitespace-nowrap">LOCKED CONTENT</div>
                </div>
              ))}
           </div>
        </section>

        {/* Video Testimonials Carousel (from Step-2) */}
        <section className="bg-[#0f172a] rounded-[2rem] border border-slate-800 p-8 space-y-6 shadow-2xl relative overflow-hidden w-full">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>

          <div className="text-center relative z-10 w-full mb-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">WHAT THEY <br /> DISCOVERED</h2>
            <p className="text-[10px] text-slate-500 mt-3 font-bold uppercase tracking-widest px-4">Instant Truth Recognition System</p>
          </div>

          <div className="relative group">
            <button 
              onClick={() => scrollVideos('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 bg-slate-900/90 text-white rounded-full p-2.5 border border-slate-800 shadow-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button 
              onClick={() => scrollVideos('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 bg-slate-900/90 text-white rounded-full p-2.5 border border-slate-800 shadow-xl"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div 
              ref={videoScrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 relative z-10 scrollbar-hide"
            >
              {/* JESSICA */}
              <div className="w-[280px] shrink-0 snap-center flex flex-col gap-4">
                <div className="w-full aspect-[9/16] rounded-[1.5rem] overflow-hidden border border-slate-800 shadow-2xl bg-black relative">
                  <iframe src="https://play.tynk.ai/p/55c0525d-8354-4cd6-a98f-34a31df5b1aa" width="100%" height="100%" style={{ border: "none" }} allowFullScreen></iframe>
                </div>
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-inner">
                  <h4 className="font-black text-white text-xs mb-2 uppercase tracking-wide">Jessica, 31 — Orlando, FL</h4>
                  <p className="text-[11px] text-slate-400 font-medium italic leading-relaxed">"The report pulled up deleted chats that explained everything. It felt like the missing piece I needed to move on."</p>
                </div>
              </div>

              {/* AMANDA */}
              <div className="w-[280px] shrink-0 snap-center flex flex-col gap-4">
                <div className="w-full aspect-[9/16] rounded-[1.5rem] overflow-hidden border border-slate-800 shadow-2xl bg-black relative">
                  <iframe src="https://play.tynk.ai/p/d04e1286-c92c-4f39-a679-2ce4b742cd59" width="100%" height="100%" style={{ border: "none" }} allowFullScreen></iframe>
                </div>
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-inner">
                  <h4 className="font-black text-white text-xs mb-2 uppercase tracking-wide">Amanda, 44 — Dallas, TX</h4>
                  <p className="text-[11px] text-slate-400 font-medium italic leading-relaxed">"Within minutes it showed hidden messages and even voice notes. That was the confirmation I finally deserved."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Price & CTA Section */}
        <section className="text-center space-y-10 pb-24 relative">
          <div className="absolute inset-0 bg-rose-500/10 blur-[120px] pointer-events-none rounded-full"></div>
          
          <div className="inline-flex flex-col items-center gap-3 relative z-10">
            <span className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em]">Confidential Remarketing Access</span>
            <div className="flex items-center gap-4">
              <span className="text-slate-500 line-through text-2xl font-black">$37</span>
              <span className="text-8xl font-black text-white tracking-tighter drop-shadow-2xl">$27</span>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/40 px-4 py-1.5 rounded-full flex items-center gap-2">
               <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
               <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest pt-0.5">$10 DISCOUNT LIVE</span>
            </div>
          </div>

          <div className="space-y-8 relative z-10">
            <a 
              href={checkoutLink}
              className="group relative block w-full bg-rose-600 hover:bg-rose-500 text-white font-black py-8 rounded-[2.5rem] shadow-[0_30px_60px_rgba(225,29,72,0.5)] transition-all transform hover:scale-[1.04] active:scale-95 overflow-hidden border-t border-rose-400/50"
            >
              <span className="relative z-10 text-xl uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                SEE THE EVIDENCE NOW <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>

            <div className="space-y-5">
              <div className="flex flex-col items-center gap-3 opacity-60">
                 <p className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase">
                   SECURE • DATA PROTECTED • ANONYMOUS
                 </p>
                 <div className="flex gap-6">
                   <ShieldCheck className="w-5 h-5 text-emerald-500" />
                   <Lock className="w-5 h-5 text-rose-500" />
                   <Database className="w-5 h-5 text-blue-500" />
                 </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-6 mt-6 border-t border-slate-900">
                 <div className="text-right">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">EVIDENCE EXPIRES IN</p>
                    <p className="font-mono text-3xl text-white font-black leading-none mt-1">{formatTime(timeLeft)}</p>
                 </div>
                 <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center border border-rose-500/30">
                    <Clock className="w-6 h-6 text-rose-500 animate-pulse" />
                 </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-50 animate-in slide-in-from-bottom-12 transition-all">
         <a 
           href={checkoutLink}
           className="flex items-center justify-between bg-white text-[#0B1120] font-black px-7 h-16 rounded-[1.25rem] shadow-[0_15px_40px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all"
         >
           <span className="uppercase tracking-widest text-xs pt-0.5">Reveal Secret Profiles Now</span>
           <div className="bg-emerald-500 rounded-full p-2">
             <Zap className="w-4 h-4 text-white fill-white" />
           </div>
         </a>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
