"use client";

import { useState, useEffect } from 'react';
import Script from 'next/script';
import {
    AlertTriangle, LockOpen, MapPin, CheckCircle, Clock, EyeOff, ShieldAlert, Database
} from 'lucide-react';

const SUSPICIOUS_KEYWORDS = [
    { word: "Gorgeous", count: 26 }, { word: "Love", count: 22 }, { word: "Secret", count: 19 },
    { word: "Hidden", count: 17 }, { word: "Don't tell", count: 15 }, { word: "Miss you", count: 12 },
    { word: "Thinking of you", count: 12 }, { word: "Can't stop thinking", count: 10 },
    { word: "Baby", count: 10 }
];

export default function Downsell1Page() {
    const [timeLeft, setTimeLeft] = useState(286); // 04:46
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMapLoaded(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-[#0B1120] min-h-screen font-sans flex flex-col items-center pb-20 selection:bg-rose-500/30">

            {/* --- TOP BANNER --- */}
            <div className="w-full bg-rose-600/20 text-center py-2 px-4 sticky top-0 z-50 backdrop-blur-md border-b border-rose-500/30">
                <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest animate-pulse flex items-center justify-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    SYSTEM ALERT: DATA PURGE IMMINENT
                </p>
            </div>

            <main className="w-full max-w-md mx-auto px-4 py-8 space-y-6">

                {/* Header Offer */}
                <div className="text-center space-y-4 animate-fade-in-up">
                    <div className="inline-flex items-center justify-center p-3 bg-rose-500/10 rounded-full border border-rose-500/30 mb-2">
                        <Database className="w-6 h-6 text-rose-500" />
                    </div>

                    <h1 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">
                        WAIT! DO NOT ABORT.
                    </h1>

                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                        The encrypted report is already generated. Deleting it now is irreversible.
                    </p>

                    <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-6 py-2 rounded font-bold text-sm tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        ADMIN OVERRIDE: 50% OFF
                    </div>
                </div>

                {/* Main Report Container */}
                <div className="bg-[#0f172a] rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden relative">
                    <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500"></div>

                    {/* Section 1: Keywords */}
                    <div className="p-5 border-b border-slate-700/50">
                        <h2 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-rose-500" />
                            Flagged Keywords Found
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            {SUSPICIOUS_KEYWORDS.map((k, i) => (
                                <span key={i} className="px-2 py-1 bg-slate-800 border border-slate-600 rounded text-[10px] text-slate-300 flex items-center gap-1 group hover:border-rose-500/50 transition-colors">
                                    {k.word}
                                    <span className="bg-rose-500/20 text-rose-400 px-1 rounded-sm font-bold group-hover:bg-rose-500 group-hover:text-white transition-colors">{k.count}</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Section 2: Location */}
                    <div className="p-5 border-b border-slate-700/50 bg-[#0B1120]/50">
                        <h2 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-cyan-400" />
                            Device Location Tracked
                        </h2>

                        <div className="relative h-40 w-full rounded-lg overflow-hidden border border-slate-700 bg-slate-800 flex items-center justify-center">
                            {!mapLoaded ? (
                                <div className="text-cyan-500 animate-pulse font-mono text-xs">Triangulating signal...</div>
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-[#0f172a] opacity-80 z-10"></div>
                                    <iframe
                                        className="absolute inset-0 w-full h-full opacity-30 grayscale invert"
                                        src={`https://maps.google.com/maps?q=-23.5505,-46.6333&z=13&output=embed`}
                                    />

                                    {/* Overlay UI */}
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <div className="relative">
                                            <div className="w-20 h-20 border border-cyan-500/30 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                            <div className="w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_cyan]"></div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded border border-cyan-500/30 text-[8px] text-cyan-400 font-mono z-30">
                                        LAT: -23.55 | LNG: -46.63
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Section 3: Unlock / Checkout */}
                    <div className="p-6 bg-[#0f172a] relative text-center">

                        <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                            <LockOpen className="text-emerald-400 w-6 h-6" />
                        </div>

                        <h2 className="text-lg font-black text-white uppercase tracking-wide">SAVE REPORT NOW</h2>
                        <p className="text-slate-400 text-xs mt-1 mb-6">
                            Instant access. 50% Discount Applied.
                        </p>

                        {/* Timer */}
                        <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg mb-6 flex items-center justify-between px-6">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-rose-500 animate-pulse" />
                                <span className="text-[10px] font-bold tracking-widest text-rose-400 uppercase">Auto-Delete In:</span>
                            </div>
                            <div className="text-xl font-mono font-bold text-rose-500 tracking-tight">
                                {formatTime(timeLeft)}
                            </div>
                        </div>

                        {/* MUNDPAGG WIDGET */}
                        <div className="w-full bg-white/5 rounded-lg border border-white/10 flex justify-center py-2 min-h-[100px]">
                            <div data-mndpay-render="019b0d43-2f5b-7178-9645-20e3cf3aedad"></div>
                        </div>

                        <Script
                            id="mundpay-script-d1"
                            src="https://upsell.mundpay.com/script-v2.js"
                            strategy="lazyOnload"
                        />

                    </div>
                </div>

                <p className="text-center text-[10px] text-slate-600 font-mono uppercase">
                    Secure Server Connection • ID: #8821-X
                </p>

            </main>
        </div>
    );
}
