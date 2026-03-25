"use client";

import { useState, useEffect } from 'react';
import Script from 'next/script';
import {
    Instagram, AlertTriangle, EyeOff, Lock, Clock, ShieldAlert, FileWarning
} from 'lucide-react';

export default function Downsell2Page() {
    const [timeLeft, setTimeLeft] = useState(299); // 04:59

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

            {/* Banner */}
            <div className="w-full bg-rose-600/20 text-center py-2 px-4 sticky top-0 z-50 backdrop-blur-md border-b border-rose-500/30">
                <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest animate-pulse flex items-center justify-center gap-2">
                    <FileWarning className="w-4 h-4" />
                    CRITICAL ALERT: EVIDENCE DELETION SCHEDULED
                </p>
            </div>

            <div className="max-w-md mx-auto px-4 py-8 space-y-6">

                {/* Header */}
                <div className="text-center space-y-4 animate-fade-in-up">
                    <div className="inline-flex items-center justify-center p-4 bg-rose-500/10 rounded-full border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
                        <Instagram className="w-8 h-8 text-rose-500" />
                    </div>

                    <h1 className="text-xl font-black text-rose-500 leading-tight uppercase tracking-tight">
                        DON'T LOSE THE EVIDENCE!
                    </h1>

                    <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto font-mono">
                        The scan results are stored in temporary cache. <br />
                        <span className="text-white font-bold">Unlock everything for 50% less.</span>
                    </p>
                </div>

                {/* --- MAIN CARD --- */}
                <div className="bg-[#0f172a] rounded-xl shadow-2xl overflow-hidden border border-slate-700/50">
                    {/* Top Bar */}
                    <div className="bg-slate-800/50 p-3 flex items-center justify-between border-b border-slate-700">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Investigation</span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">CACHE_ID: #XA-992</div>
                    </div>

                    <div className="p-4 bg-rose-500/5 border-b border-slate-700/50 flex items-start gap-3">
                        <ShieldAlert className="text-rose-500 shrink-0 w-5 h-5 mt-0.5" />
                        <p className="text-xs text-rose-400 font-medium">
                            Suspicious DMs and hidden stories found. <br />
                            <span className="text-white font-bold">Last chance to view before purge.</span>
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 divide-x divide-slate-700 bg-[#0f172a] p-4 text-center border-b border-slate-700">
                        <div><p className="text-lg font-bold text-white">8</p><p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">DMs</p></div>
                        <div><p className="text-lg font-bold text-rose-500">42</p><p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Likes</p></div>
                        <div><p className="text-lg font-bold text-purple-500">12</p><p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Stories</p></div>
                        <div><p className="text-lg font-bold text-emerald-500">Active</p><p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Status</p></div>
                    </div>

                    {/* Private Gallery (Censored) */}
                    <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-widest flex items-center gap-2">
                                <Lock className="w-3 h-3" /> Encrypted Gallery
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="aspect-square bg-slate-800 rounded relative overflow-hidden flex items-center justify-center text-white/50 border border-slate-700/50">
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black blur-md opacity-80"></div>

                                    {/* Glitch Effect Lines */}
                                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_3px)] opacity-20 pointer-events-none"></div>

                                    <div className="z-10 flex flex-col items-center">
                                        <EyeOff className="mb-2 w-5 h-5 text-rose-500" />
                                        <span className="text-[8px] font-bold tracking-widest border border-rose-500/30 text-rose-400 px-2 py-0.5 rounded font-mono">REDACTED</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- CHECKOUT --- */}
                <div className="bg-[#0f172a] p-5 rounded-xl shadow-[0_0_30px_rgba(244,63,94,0.1)] text-center border border-rose-500/30 relative overflow-hidden">
                    {/* Scanline */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-rose-500 shadow-[0_0_10px_#f43f5e] animate-scanline"></div>

                    <div className="mx-auto w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mb-3">
                        <Lock className="text-rose-500 w-6 h-6" />
                    </div>

                    <h2 className="text-lg font-black text-rose-500 uppercase tracking-widest">UNLOCK FULL REPORT</h2>
                    <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-[10px] font-bold inline-block mb-4 tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        ADMIN DISCOUNT: 50% APPLIED
                    </div>

                    <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-3 mb-4 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-rose-500">
                            <Clock className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Purge In:</span>
                        </div>
                        <p className="text-lg font-mono font-bold text-rose-500">{formatTime(timeLeft)}</p>
                    </div>

                    {/* MUNDPAGG */}
                    <div className="w-full bg-white/5 rounded-lg border border-white/10 flex justify-center py-2 min-h-[100px]">
                        <div data-mndpay-render="019b0d46-7198-7045-9d70-48635c69ed3a"></div>
                    </div>

                    <Script
                        id="mundpay-script-d2"
                        src="https://upsell.mundpay.com/script-v2.js"
                        strategy="lazyOnload"
                    />
                </div>

            </div>
        </div>
    );
}
