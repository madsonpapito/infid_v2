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

export default function Upsell2Page() {
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

    // Shuffled image pools â€” computed once per scan, stable across re-renders
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

        // Debounce: wait 800ms after user stops typing
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

        // Compute shuffled image pools ONCE per scan (stable for the whole results view)
        const perfilPool = gender === 'male'
            ? ['/images/male/perfil/1.jpg', '/images/male/perfil/2.jpg', '/images/male/perfil/3.jpg', '/images/male/perfil/4.jpg', '/images/male/perfil/5.jpg', '/images/male/perfil/6.jpg', '/images/male/perfil/7.jpg', '/images/male/perfil/8.jpg', '/images/male/perfil/9.jpg']
            : ['/images/female/perfil/1.jpg', '/images/female/perfil/2.jpg', '/images/female/perfil/3.jpg', '/images/female/perfil/4.jpg', '/images/female/perfil/5.jpg', '/images/female/perfil/6.jpg', '/images/female/perfil/7.jpg', '/images/female/perfil/8.jpeg', '/images/female/perfil/9.jpg'];
        const likedPool = gender === 'male'
            ? ['/images/male/liked/male-liked-photo-1.jpg', '/images/male/liked/male-liked-photo-2.jpeg', '/images/male/liked/male-liked-photo-3.jpeg', '/images/male/liked/male-liked-story-1.jpg', '/images/male/liked/male-liked-story-2.jpg', '/images/male/liked/male-liked-story-3.jpg']
            : ['/images/female/liked/female-liked-photo-1.jpg', '/images/female/liked/female-liked-photo-2.jpg', '/images/female/liked/female-liked-photo-3.jpg', '/images/female/liked/female-liked-story-1.jpg', '/images/female/liked/female-liked-story-2.jpg', '/images/female/liked/female-liked-story3.jpg'];

        setShuffledPerfil([...perfilPool].sort(() => Math.random() - 0.5));
        setShuffledLiked([...likedPool].sort(() => Math.random() - 0.5).slice(0, 4));

        // Fetch real posts in background while progress bar runs
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

                    // Reveal posts one-by-one every ~900ms
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
            .catch(() => { /* silently fail, skeleton stays */ });

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

    // Inject Mundpay script AFTER results step renders (so data-mndpay-render is in DOM)
    useEffect(() => {
        if (step !== 'results') return;

        // Remove any previous script to force re-execution
        const existing = document.getElementById('mundpay-u2-dynamic');
        if (existing) existing.remove();

        const timer = setTimeout(() => {
            const script = document.createElement('script');
            script.id = 'mundpay-u2-dynamic';
            script.src = 'https://upsell.mundpay.com/script-v2.js';
            script.async = true;
            document.body.appendChild(script);
        }, 300);

        return () => clearTimeout(timer);
    }, [step]);

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

                        {/* Instagram Icon â€” sem badge SCANNER V2.0 */}
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

                                {/* Search Status Feedback */}
                                {searchStatus === 'searching' && (
                                    <div className="flex items-center gap-2 text-rose-400 text-xs font-mono animate-pulse pl-1">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        <span>Searching...</span>
                                    </div>
                                )}

                                {/* Profile Preview Card */}
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
                                        Profile not found â€” scan will proceed anyway
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

                        {/* Profile photo with animated ring */}
                        <div className="relative flex items-center justify-center w-28 h-28">
                            {/* Animated gradient ring */}
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
                            {/* Instagram badge */}
                            <div className="absolute bottom-0 right-0 z-20 bg-white rounded-full p-1 shadow-lg">
                                <Instagram className="w-4 h-4 text-rose-500" />
                            </div>
                        </div>

                        {/* Title */}
                        <div className="text-center space-y-1">
                            <h2 className="text-lg font-bold text-white">Analyzing Profile...</h2>
                            <p className="text-sm text-slate-400">@{cleanUsername}</p>
                        </div>

                        {/* Progress bar with label */}
                        <div className="w-full space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400 font-medium">{loadingText}</span>
                                <span className="text-rose-400 font-bold">{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${progress}%`,
                                        background: 'linear-gradient(90deg, #e1306c, #f77737)',
                                        transition: 'width 0.1s linear'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Instagram-style grid â€” real posts or skeleton */}
                        <div className="w-full grid grid-cols-3 gap-0.5">
                            {[...Array(9)].map((_, i) => {
                                const post = posts[i];
                                return post ? (
                                    <div key={i} className="aspect-square overflow-hidden bg-slate-800">
                                        <img
                                            src={post.imageUrl}
                                            alt=""
                                            className="w-full h-full object-cover animate-in fade-in duration-500"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        key={i}
                                        className="aspect-square bg-slate-800 animate-pulse"
                                        style={{ animationDelay: `${i * 80}ms` }}
                                    />
                                );
                            })}
                        </div>

                    </div>
                )}

                {/* --- STEP 3: RESULTS --- */}
                {step === 'results' && (() => {

                    // â”€â”€ Username pools (opposite gender to create suspicion) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
                    // If user selected MALE â†’ show FEMALE names (women interacting with him)
                    // If user selected FEMALE â†’ show MALE names (men interacting with her)
                    const maleUsernames = [
                        'carlos_08', 'juan.pablo', 'roberto_30', 'mart_be',
                        'diego.rv', 'lucas_fit', 'andres_mx', 'felipe.ok',
                    ];
                    const femaleUsernames = [
                        'sarah_fitness', 'laura.m', 'ana_bella', 'camila.rs',
                        'julia_ok', 'sofia.vip', 'valentina_x', 'isabela.fit',
                    ];
                    // Opposite: male user â†’ female names; female user â†’ male names
                    const namePool = gender === 'male' ? femaleUsernames : maleUsernames;

                    // â”€â”€ Intercepted logs (4 cards, last 2 with scroll-to-unlock CTA) â”€â”€â”€â”€â”€
                    const interceptedLogs = [
                        {
                            img: shuffledPerfil[0],
                            name: namePool[0],
                            action: 'liked your photo',
                            time: '2m ago',
                            icon: Heart,
                            color: 'text-rose-500',
                            badge: null,
                            cta: false,
                        },
                        {
                            img: shuffledPerfil[1],
                            name: namePool[1],
                            action: 'liked your photo',
                            time: '12m ago',
                            icon: Heart,
                            color: 'text-red-500',
                            badge: null,
                            cta: false,
                        },
                        {
                            img: shuffledPerfil[2],
                            name: namePool[2],
                            action: 'sent you a message',
                            time: '18m ago',
                            icon: MessageCircle,
                            color: 'text-cyan-400',
                            badge: null,
                            cta: true,
                        },
                        {
                            img: shuffledPerfil[3],
                            name: namePool[3],
                            action: 'sent you a message',
                            time: '1h ago',
                            icon: MessageCircle,
                            color: 'text-rose-500',
                            badge: null,
                            cta: true,
                        },
                    ];

                    const scrollToUnlock = () => {
                        document.getElementById('unlock-widget')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    };

                    return (
                        <div className="animate-in slide-in-from-bottom-8 space-y-4 pt-2">

                            {/* Analysis Complete banner */}
                            <div className="flex items-center justify-center gap-2 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                <CheckCircle2 className="text-emerald-500 w-4 h-4" />
                                <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest">Analysis Complete</span>
                            </div>

                            {/* Instagram Profile Card */}
                            <div className="bg-[#0f172a] rounded-xl border border-emerald-500/30 p-4 shadow-lg">
                                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-3 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Instagram Profile Detected
                                </div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-800 flex-shrink-0 border-2 border-emerald-500/40">
                                        {profile?.profile_pic_url ? (
                                            <img src={profile.profile_pic_url} alt={cleanUsername} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                        ) : (
                                            <User className="w-6 h-6 text-slate-500 m-auto mt-4" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-white text-base">@{cleanUsername}</p>
                                        {profile?.full_name && <p className="text-xs text-slate-400">{profile.full_name}</p>}
                                    </div>
                                </div>

                                {/* Stats row */}
                                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                                    <div className="bg-slate-800/60 rounded-lg py-2">
                                        <p className="text-white font-bold text-sm">{profile?.media_count ?? 'â€”'}</p>
                                        <p className="text-slate-500 text-[10px]">Posts</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded-lg py-2">
                                        <p className="text-white font-bold text-sm">
                                            {profile?.follower_count ? (profile.follower_count >= 1000 ? `${(profile.follower_count / 1000).toFixed(1)}k` : profile.follower_count) : 'â€”'}
                                        </p>
                                        <p className="text-slate-500 text-[10px]">Followers</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded-lg py-2">
                                        <p className="text-white font-bold text-sm">
                                            {profile?.following_count ? (profile.following_count >= 1000 ? `${(profile.following_count / 1000).toFixed(1)}k` : profile.following_count) : 'â€”'}
                                        </p>
                                        <p className="text-slate-500 text-[10px]">Following</p>
                                    </div>
                                </div>

                                <div className="text-[11px] text-slate-400 italic border-t border-slate-700/50 pt-2">
                                    {profile?.biography
                                        ? profile.biography
                                        : profile?.is_private
                                            ? '🔒 Private account — bio hidden'
                                            : '📍 Bio and last 4 locations extracted'
                                    }
                                </div>
                            </div>

                            {/* System Log Card */}
                            <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-3 font-mono text-[10px]">
                                <p className="text-slate-500 mb-2 uppercase tracking-widest text-[9px]">[SYSTEM_LOG] New activity detected</p>
                                <div className="space-y-1">
                                    <div className="flex gap-1 flex-wrap">
                                        <span className="bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">@{cleanUsername}</span>
                                        <span className="bg-rose-900/50 text-rose-300 px-1.5 py-0.5 rounded">@{namePool[4] ?? namePool[0]}</span>
                                        <span className="text-slate-400">liked your photo.</span>
                                    </div>
                                    <div className="flex gap-1 flex-wrap">
                                        <span className="bg-cyan-900/50 text-cyan-300 px-1.5 py-0.5 rounded">@{cleanUsername}</span>
                                        <span className="text-slate-400">new message from</span>
                                        <span className="bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">@{namePool[5] ?? namePool[1]}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Intercepted Logs — 4 cards */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Intercepted Logs</h3>
                                    <span className="bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded animate-pulse">LIVE</span>
                                </div>

                                {interceptedLogs.map((it, i) => (
                                    <div
                                        key={i}
                                        onClick={it.cta ? scrollToUnlock : undefined}
                                        className={`bg-[#0f172a] border border-slate-700/50 rounded-lg p-3 flex items-center gap-3 transition-colors ${it.cta ? 'cursor-pointer hover:border-rose-500/60 active:scale-[0.99]' : 'hover:border-rose-500/30'}`}
                                    >
                                        <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-800 flex-shrink-0">
                                            <img src={it.img} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <p className="text-xs font-bold text-slate-300">@{it.name}</p>
                                                <p className="text-[9px] text-slate-500 ml-2 flex-shrink-0">{it.time}</p>
                                            </div>
                                            <p className="text-[10px] text-slate-400 truncate">{it.action}</p>
                                            {it.cta && (
                                                <p className="text-[10px] text-rose-400 font-bold mt-0.5 animate-pulse">Click to read history...</p>
                                            )}
                                        </div>
                                        {it.cta ? (
                                            <span className="text-[9px] bg-rose-500 text-white px-1.5 py-0.5 rounded font-bold flex-shrink-0">READ</span>
                                        ) : (
                                            <it.icon className={`w-3.5 h-3.5 ${it.color} flex-shrink-0`} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* INTERCEPTED: Suspicious Likes */}
                            <div className="space-y-3 pt-2">
                                <h3 className="font-bold text-rose-500 text-sm uppercase tracking-wide">
                                    INTERCEPTED: Suspicious Likes from {cleanUsername}
                                </h3>

                                {shuffledLiked.map((imgSrc, i) => (
                                    <div key={i} className="relative rounded-xl overflow-hidden border border-slate-700/50">
                                        <img
                                            src={imgSrc}
                                            alt=""
                                            className="w-full object-cover"
                                            style={{ filter: 'blur(12px)', transform: 'scale(1.05)' }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                            <Lock className="w-8 h-8 text-white/80" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2 flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-700 flex-shrink-0 border border-white/20">
                                                {profile?.profile_pic_url ? (
                                                    <img src={profile.profile_pic_url} alt={cleanUsername} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                                ) : (
                                                    <div className="w-full h-full bg-slate-600" />
                                                )}
                                            </div>
                                            <span className="text-white text-[10px] font-bold">@{cleanUsername}</span>
                                            <span className="text-slate-300 text-[10px] ml-1">
                                                {['Wow, you look great 🔥', '❤️ ❤️', 'So beautiful 😍', 'You drive me crazy 😈'][i % 4]}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Unlock Widget */}
                            <div id="unlock-widget" className="text-center bg-[#0B1120] border border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.15)] rounded-2xl p-6 relative overflow-hidden mt-2">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500" />
                                <div className="mb-4 flex justify-center">
                                    <div className="bg-rose-500/10 p-3 rounded-full border border-rose-500/30 animate-pulse">
                                        <Lock className="w-6 h-6 text-rose-500" />
                                    </div>
                                </div>
                                <h2 className="text-lg font-black text-white mb-2 uppercase tracking-wide">UNLOCK FULL REPORT</h2>
                                <p className="text-xs text-slate-400 mb-6 px-4">Instant access. 100% Anonymous.</p>
                                <div className="w-full flex justify-center min-h-[100px] bg-white/5 rounded-lg border border-white/10 py-2">
                                    <div data-mndpay-render="019b0d3e-2aeb-71c2-bad6-a416c3933ce1" />
                                </div>
                            </div>

                        </div>
                    );
                })()}

            </div>
        </div>
    );
}
