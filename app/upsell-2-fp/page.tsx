"use client";

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
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

    // Instagram profile state
    const [profile, setProfile] = useState<InstagramProfile | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchStatus, setSearchStatus] = useState<'idle' | 'searching' | 'found' | 'not_found'>('idle');
    const searchTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Instagram posts state
    const [posts, setPosts] = useState<{ id: string; imageUrl: string }[]>([]);

    // Shuffled image pools
    const [shuffledLiked, setShuffledLiked] = useState<string[]>([]);
    const [shuffledPerfil, setShuffledPerfil] = useState<string[]>([]);

    // --- MOCK DATA ---
    const interactions = [
        { name: 'sarah_fitness', action: 'sent a photo (disappearing)', time: '2m ago', icon: MessageCircle, color: 'text-rose-500', badge: 'NEW' },
        { name: 'juan.pablo', action: 'liked your story', time: '12m ago', icon: Heart, color: 'text-red-500' },
        { name: 'roberto_99', action: 'replied: "Can I see you again?"', time: '25m ago', icon: MessageCircle, color: 'text-cyan-400', badge: 'DELETED' }
    ];

    // Auto-search Instagram profile as user types
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

        const cleaned = username.replace('@', '').trim();
        fetch('/api/instagram/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: cleaned }),
        })
            .then(r => r.json())
            .then(data => {
                if (data.success && Array.isArray(data.posts) && data.posts.length > 0) {
                    const mapped = data.posts
                        .filter((p: any) => p.imageUrl)
                        .slice(0, 9)
                        .map((p: any) => ({
                            id: p.id || String(Math.random()),
                            imageUrl: `/api/instagram/image?url=${encodeURIComponent(p.imageUrl)}`,
                        }));

                    let index = 0;
                    const revealInterval = setInterval(() => {
                        if (index >= mapped.length) {
                            clearInterval(revealInterval);
                            return;
                        }
                        setPosts(prev => [...prev, mapped[index]]);
                        index++;
                    }, 900);
                }
            })
            .catch(() => { });

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

        setTimeout(() => setLoadingText("Extracting followers..."), 500);
        setTimeout(() => setLoadingText("Bypassing security..."), 1800);
        setTimeout(() => setLoadingText("Scanning direct messages..."), 3500);
        setTimeout(() => setLoadingText("Recovering hidden media..."), 5500);
        setTimeout(() => setLoadingText("Finalizing report..."), 7000);
    };

    const cleanUsername = username.replace('@', '').trim();

    return (
        <div className="bg-[#0B1120] min-h-screen font-sans text-slate-200 pb-20 selection:bg-rose-500/30">

            {/* Banner */}
            <div className="bg-rose-600/10 border-b border-rose-500/20 text-center py-2 px-4 sticky top-0 z-50 backdrop-blur-md">
                <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest animate-pulse flex items-center justify-center gap-2">
                    <AlertTriangle className="w-3 h-3" />
                    Warning: Do not close console
                </p>
            </div>

            <div className="max-w-md mx-auto p-4 pt-8">

                {/* --- STEP 1: INPUT --- */}
                {step === 'input' && (
                    <div className="flex flex-col items-center space-y-8 animate-in fade-in slide-in-from-bottom-4">

                        <div className="relative">
                            <div className="absolute inset-0 bg-rose-500 blur-[40px] opacity-20 rounded-full"></div>
                            <div className="w-16 h-16 bg-[#0f172a] rounded-2xl border border-slate-700 flex items-center justify-center shadow-2xl relative z-10">
                                <Instagram className="w-8 h-8 text-rose-500" />
                            </div>
                        </div>

                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Instagram Forensics</h1>
                            <p className="text-slate-400 text-sm max-w-xs mx-auto">
                                Detect hidden DMs, secret stories, and deleted interactions.
                            </p>
                        </div>

                        <div className="w-full bg-[#0f172a] p-6 rounded-2xl border border-slate-700/50 shadow-xl space-y-6">

                            {/* Gender */}
                            <div className="space-y-3">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">What is their gender?</span>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setGender('male')}
                                        className={`p-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${gender === 'male' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600'}`}
                                    >
                                        <span className="text-lg">{"\uD83D\uDC68"}</span>
                                        <span className="font-bold text-sm uppercase">Male</span>
                                    </button>
                                    <button
                                        onClick={() => setGender('female')}
                                        className={`p-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${gender === 'female' ? 'bg-rose-500/10 border-rose-500 text-rose-400' : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600'}`}
                                    >
                                        <span className="text-lg">{"\uD83D\uDC69"}</span>
                                        <span className="font-bold text-sm uppercase">Female</span>
                                    </button>
                                </div>
                            </div>

                            {/* Username Input */}
                            <div className="space-y-3">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Instagram Username</span>
                                <div className="relative group">
                                    <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg focus-within:border-rose-500 focus-within:shadow-[0_0_15px_rgba(244,63,94,0.2)] transition-all">
                                        <span className="text-slate-400 font-bold pl-3 pr-0 select-none font-mono">@</span>
                                        <input
                                            type="text"
                                            value={username.replace('@', '')}
                                            onChange={e => setUsername(e.target.value.replace('@', ''))}
                                            className="flex-1 bg-transparent text-white py-3 pl-0.5 pr-10 outline-none font-mono placeholder-slate-600"
                                            placeholder="username"
                                        />
                                        <div className="pr-3 flex items-center pointer-events-none">
                                            {isSearching ? (
                                                <Loader2 className="w-4 h-4 text-rose-400 animate-spin" />
                                            ) : searchStatus === 'found' ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            ) : (
                                                <Search className="w-4 h-4 text-slate-600 group-focus-within:text-rose-500 transition-colors" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {searchStatus === 'searching' && (
                                    <div className="flex items-center gap-2 text-rose-400 text-xs font-mono animate-pulse pl-1">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        <span>Searching...</span>
                                    </div>
                                )}

                                {searchStatus === 'found' && profile && (
                                    <div className="flex items-center gap-3 bg-slate-800/60 border border-emerald-500/30 rounded-xl p-3 animate-in slide-in-from-top-2 duration-300">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700 flex-shrink-0 border border-emerald-500/30">
                                            {profile.profile_pic_url ? (
                                                <img
                                                    src={profile.profile_pic_url}
                                                    alt={profile.username}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                />
                                            ) : (
                                                <User className="w-5 h-5 text-slate-500 m-auto mt-2.5" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-white truncate">@{profile.username}</p>
                                            {profile.full_name && (
                                                <p className="text-[11px] text-slate-400 truncate">{profile.full_name}</p>
                                            )}
                                        </div>
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 animate-pulse" />
                                    </div>
                                )}

                                {searchStatus === 'not_found' && cleanUsername.length >= 3 && (
                                    <p className="text-[11px] text-slate-500 pl-1 font-mono">
                                        {"Profile not found - scan will proceed anyway"}
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={handleStartScan}
                                disabled={cleanUsername.length < 3}
                                className="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm tracking-wide"
                            >
                                <span>Start Deep Scan</span>
                                <Terminal className="w-4 h-4" />
                            </button>

                        </div>
                    </div>
                )}

                {/* --- STEP 2: LOADING --- */}
                {step === 'loading' && (
                    <div className="flex flex-col items-center space-y-6 pt-8 animate-in fade-in px-2">

                        <div className="relative flex items-center justify-center w-28 h-28">
                            <div className="absolute inset-0 rounded-full animate-spin"
                                style={{
                                    background: 'conic-gradient(from 0deg, #e1306c, #f77737, #fcaf45, #e1306c)',
                                    padding: '3px',
                                }}
                            />
                            <div className="absolute inset-[3px] rounded-full bg-[#0B1120]" />
                            <div className="relative w-[88px] h-[88px] rounded-full overflow-hidden z-10">
                                {profile?.profile_pic_url ? (
                                    <img
                                        src={profile.profile_pic_url}
                                        alt="target"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                        <Instagram className="w-10 h-10 text-rose-400" />
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-0 right-0 z-20 bg-white rounded-full p-1 shadow-lg">
                                <Instagram className="w-4 h-4 text-rose-500" />
                            </div>
                        </div>

                        <div className="text-center space-y-1">
                            <h2 className="text-lg font-bold text-white">Analyzing Profile...</h2>
                            <p className="text-sm text-slate-400">@{cleanUsername}</p>
                        </div>

                        <div className="w-full space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400 font-medium">{loadingText}</span>
                                <span className="text-rose-400 font-mono">{Math.round(progress)}%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Posts Grid Loading */}
                        <div className="w-full grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <div key={i} className="aspect-square bg-slate-800 relative overflow-hidden">
                                    {posts[i] ? (
                                        <img
                                            src={posts[i].imageUrl}
                                            alt=""
                                            className="w-full h-full object-cover animate-in fade-in"
                                        />
                                    ) : (
                                        <div className="w-full h-full animate-pulse bg-slate-700/50" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- STEP 3: RESULTS --- */}
                {step === 'results' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">

                        {/* Profile Header */}
                        <div className="bg-[#0f172a] rounded-2xl border border-slate-700/50 p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-800 border-2 border-rose-500/40">
                                    {profile?.profile_pic_url ? (
                                        <img src={profile.profile_pic_url} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-8 h-8 text-slate-500 m-auto mt-4" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-white font-bold">@{cleanUsername}</p>
                                    <p className="text-xs text-slate-400">{profile?.full_name || 'Instagram Account'}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded font-bold">FLAGGED</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactions */}
                        <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-4 space-y-3">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <MessageCircle className="w-4 h-4 text-rose-500" />
                                Recent Interactions
                            </h3>
                            <div className="space-y-2">
                                {interactions.map((i, idx) => (
                                    <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center ${i.color}`}>
                                            <i.icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-white truncate">@{i.name}</p>
                                            <p className="text-xs text-slate-400 truncate">{i.action}</p>
                                        </div>
                                        <div className="text-right">
                                            {i.badge && (
                                                <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold ${i.badge === 'NEW' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                                    {i.badge}
                                                </span>
                                            )}
                                            <p className="text-[10px] text-slate-500 mt-1">{i.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Liked Photos */}
                        <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-4 space-y-3">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Heart className="w-4 h-4 text-red-500" />
                                Liked Photos (Hidden)
                            </h3>
                            <div className="grid grid-cols-4 gap-2">
                                {shuffledLiked.map((img, i) => (
                                    <div key={i} className="aspect-square rounded-lg overflow-hidden bg-slate-800 relative">
                                        <img src={img} alt="" className="w-full h-full object-cover blur-md" />
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <Lock className="w-4 h-4 text-white/50" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Secret Profiles */}
                        <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-4 space-y-3">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Eye className="w-4 h-4 text-purple-500" />
                                Secret Profiles Visited
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                {shuffledPerfil.slice(0, 6).map((img, i) => (
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
                        <div className="bg-gradient-to-br from-rose-900/30 to-slate-900 border border-rose-500/30 rounded-2xl p-6 space-y-4 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-rose-500/10 rounded-full border border-rose-500/30">
                                <Lock className="w-6 h-6 text-rose-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Unlock Full Report</h2>
                            <p className="text-sm text-slate-400">Get instant access to all DMs, hidden likes, and secret profiles.</p>

                            {/* FortPay Button */}
                            <div className="w-full flex flex-col items-center gap-3 pt-2">
                                <a
                                    href="javascript:void(0)"
                                    data-fornpay="nqozvq7tqg"
                                    className="fornpay_btn w-full py-4 bg-gradient-to-r from-[#3d94f6] to-[#1e62d0] hover:from-[#4da3ff] hover:to-[#2a75e8] text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] text-center"
                                >
                                    SIM, EU ACEITO ESSA OFERTA
                                </a>
                                <a
                                    href="/downsell-2-fp"
                                    data-downsell="/downsell-2-fp"
                                    className="fornpay_downsell text-[#004faa] text-sm hover:underline"
                                >
                                    Vou recusar essa oferta
                                </a>
                            </div>

                            <Script
                                id="fortpay-oneclick-u2"
                                src="https://app.plataformafortpay.com.br/js/oneclick.js"
                                strategy="lazyOnload"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
