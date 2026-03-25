"use client";

import { useState, useEffect, useRef } from 'react';
import {
    Instagram, Search, Loader2, CheckCircle2, Heart, MessageCircle,
    Lock, Terminal, AlertTriangle, User, Eye
} from 'lucide-react';

interface InstagramProfile {
    username: string;
    full_name: string;
    biography: string;
    profile_pic_url: string;
    follower_count: number;
    following_count: number;
    media_count: number;
    is_private: boolean;
    is_verified: boolean;
}

export default function Upsell2FPPage() {
    const [step, setStep] = useState<'input' | 'loading' | 'results'>('input');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState<'male' | 'female'>('female');
    const [loadingText, setLoadingText] = useState("Initializing Protocol...");
    const [progress, setProgress] = useState(0);

    const [profile, setProfile] = useState<InstagramProfile | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchStatus, setSearchStatus] = useState<'idle' | 'searching' | 'found' | 'not_found'>('idle');
    const searchTimerRef = useRef<NodeJS.Timeout | null>(null);

    const [posts, setPosts] = useState<{ id: string; imageUrl: string }[]>([]);
    const [shuffledLiked, setShuffledLiked] = useState<string[]>([]);
    const [shuffledPerfil, setShuffledPerfil] = useState<string[]>([]);

    const interactions = [
        { name: 'sarah_fitness', action: 'sent a photo (disappearing)', time: '2m ago', icon: MessageCircle, color: 'text-rose-500', badge: 'NEW' },
        { name: 'juan.pablo', action: 'liked your story', time: '12m ago', icon: Heart, color: 'text-red-500' },
        { name: 'roberto_99', action: 'replied: "Can I see you again?"', time: '25m ago', icon: MessageCircle, color: 'text-cyan-400', badge: 'DELETED' }
    ];

    // Script injection for FortPay
    useEffect(() => {
        if (step !== 'results') return;
        const existing = document.getElementById('fortpay-oneclick-u2');
        if (existing) existing.remove();
        const script = document.createElement('script');
        script.id = 'fortpay-oneclick-u2';
        script.src = 'https://app.plataformafortpay.com.br/js/oneclick.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            const added = document.getElementById('fortpay-oneclick-u2');
            if (added) added.remove();
        };
    }, [step]);

    useEffect(() => {
        const cleaned = username.replace('@', '').trim();
        if (cleaned.length < 3) {
            setProfile(null);
            setSearchStatus('idle');
            setIsSearching(false);
            return;
        }
        if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
        setIsSearching(true);
        setSearchStatus('searching');
        searchTimerRef.current = setTimeout(async () => {
            try {
                const res = await fetch('/api/instagram/profile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: cleaned }),
                });
                const data = await res.json();
                if (data.success && data.profile) {
                    setProfile(data.profile);
                    setSearchStatus('found');
                } else {
                    setProfile(null);
                    setSearchStatus('not_found');
                }
            } catch {
                setProfile(null);
                setSearchStatus('not_found');
            } finally {
                setIsSearching(false);
            }
        }, 800);
        return () => {
            if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
        };
    }, [username]);

    const handleStartScan = () => {
        if (username.replace('@', '').trim().length < 3) return;
        setStep('loading');
        setPosts([]);
        const perfilPool = gender === 'male'
            ? ['/images/male/perfil/1.jpg', '/images/male/perfil/2.jpg', '/images/male/perfil/3.jpg', '/images/male/perfil/4.jpg', '/images/male/perfil/5.jpg', '/images/male/perfil/6.jpg', '/images/male/perfil/7.jpg', '/images/male/perfil/8.jpg', '/images/male/perfil/9.jpg']
            : ['/images/female/perfil/1.jpg', '/images/female/perfil/2.jpg', '/images/female/perfil/3.jpg', '/images/female/perfil/4.jpg', '/images/female/perfil/5.jpg', '/images/female/perfil/6.jpg', '/images/female/perfil/7.jpg', '/images/female/perfil/8.jpeg', '/images/female/perfil/9.jpg'];
        const likedPool = gender === 'male'
            ? ['/images/male/liked/male-liked-photo-1.jpg', '/images/male/liked/male-liked-photo-2.jpeg', '/images/male/liked/male-liked-photo-3.jpeg', '/images/male/liked/male-liked-story-1.jpg', '/images/male/liked/male-liked-story-2.jpg', '/images/male/liked/male-liked-story-3.jpg']
            : ['/images/female/liked/female-liked-photo-1.jpg', '/images/female/liked/female-liked-photo-2.jpg', '/images/female/liked/female-liked-photo-3.jpg', '/images/female/liked/female-liked-story-1.jpg', '/images/female/liked/female-liked-story-2.jpg', '/images/female/liked/female-liked-story3.jpg'];
        setShuffledPerfil([...perfilPool].sort(() => Math.random() - 0.5));
        setShuffledLiked([...likedPool].sort(() => Math.random() - 0.5).slice(0, 4));
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setStep('results'), 800);
                    return 100;
                }
                return p + 1.2;
            });
        }, 80);
    };

    const cleanUsername = username.replace('@', '').trim();

    return (
        <div className="bg-[#0B1120] min-h-screen font-sans text-slate-200 pb-20 selection:bg-rose-500/30">
            <div className="bg-rose-600/10 border-b border-rose-500/20 text-center py-2 px-4 sticky top-0 z-50 backdrop-blur-md">
                <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest animate-pulse flex items-center justify-center gap-2">
                    <AlertTriangle className="w-3 h-3" /> Warning: Do not close console
                </p>
            </div>

            <div className="max-w-md mx-auto p-4 pt-8">
                {step === 'input' && (
                    <div className="flex flex-col items-center space-y-8 animate-in fade-in">
                        <div className="w-16 h-16 bg-[#0f172a] rounded-2xl border border-slate-700 flex items-center justify-center shadow-2xl"><Instagram className="w-8 h-8 text-rose-500" /></div>
                        <div className="w-full bg-[#0f172a] p-6 rounded-2xl border border-slate-700/50 shadow-xl space-y-6">
                            <div className="space-y-3">
                                <span className="text-[10px] text-slate-500 font-bold uppercase ml-1">What is their gender?</span>
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => setGender('male')} className={`p-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${gender === 'male' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>Male</button>
                                    <button onClick={() => setGender('female')} className={`p-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${gender === 'female' ? 'bg-rose-500/10 border-rose-500 text-rose-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>Female</button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <span className="text-[10px] text-slate-500 font-bold uppercase ml-1">Instagram Username</span>
                                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg"><span className="text-slate-400 font-bold pl-3 pr-0">@</span><input type="text" value={username} onChange={e => setUsername(e.target.value)} className="flex-1 bg-transparent text-white py-3 outline-none" placeholder="username" /></div>
                            </div>
                            <button onClick={handleStartScan} className="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-xl shadow-lg">Start Deep Scan</button>
                        </div>
                    </div>
                )}

                {step === 'loading' && (
                    <div className="flex flex-col items-center space-y-6 pt-8 animate-in fade-in">
                        <div className="relative flex items-center justify-center w-28 h-28"><div className="absolute inset-0 rounded-full animate-spin" style={{ background: 'conic-gradient(from 0deg, #e1306c, #f77737, #fcaf45, #e1306c)', padding: '3px' }} /><div className="absolute inset-[3px] rounded-full bg-[#0B1120]" /><div className="relative w-[88px] h-[88px] rounded-full overflow-hidden z-10">{profile?.profile_pic_url ? <img src={profile.profile_pic_url} alt="target" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-800 flex items-center justify-center"><Instagram className="w-10 h-10 text-rose-400" /></div>}</div></div>
                        <div className="w-full space-y-2"><div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300" style={{ width: `${progress}%` }} /></div></div>
                    </div>
                )}

                {step === 'results' && (
                    <div className="space-y-6 animate-in fade-in">
                        <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-4 space-y-3"><h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><MessageCircle className="w-4 h-4 text-rose-500" /> Recent Interactions</h3><div className="space-y-2">{interactions.map((i, idx) => (<div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 flex items-center gap-3"><div className={`w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center ${i.color}`}><i.icon className="w-4 h-4" /></div><div className="flex-1 min-w-0"><p className="text-sm font-bold text-white truncate">@{i.name}</p><p className="text-xs text-slate-400 truncate">{i.action}</p></div></div>))}</div></div>
                        <div className="bg-gradient-to-br from-rose-900/30 to-slate-900 border border-rose-500/30 rounded-2xl p-6 space-y-4 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-rose-500/10 rounded-full border border-rose-500/30"><Lock className="w-6 h-6 text-rose-400" /></div>
                            <h2 className="text-xl font-bold text-white">Unlock Full Report</h2>
                            <div className="w-full flex flex-col items-center gap-3 pt-2">
                                <a href="javascript:void(0)" data-fornpay="nqozvq7tqg" className="fornpay_btn w-full py-4 bg-gradient-to-r from-[#3d94f6] to-[#1e62d0] text-white font-bold rounded-xl shadow-lg text-center">SIM, EU ACEITO ESSA OFERTA</a>
                                <a href="/downsell-2-fp" className="text-[#004faa] text-sm hover:underline">Vou recusar essa oferta</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
