import {
    MessageCircle, MapPin, AlertTriangle, User, Heart, X, Check
} from 'lucide-react';

export const CreativeAssets = () => {
    return (
        <div className="min-h-screen bg-[#000] p-10 space-y-20">

            {/* ASSET 1: SUSPICIOUS NOTIFICATION (IOS STYLE) */}
            <div className="w-[375px] mx-auto bg-cover bg-center rounded-[3rem] overflow-hidden relative border-8 border-[#1a1a1a] shadow-2xl"
                style={{ height: '812px', backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop")' }}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

                {/* Lock Screen UI */}
                <div className="pt-20 px-6 space-y-4">
                    {/* Notification 1 */}
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex gap-3 text-white shadow-lg animate-in slide-in-from-top duration-700">
                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-white" fill="white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-sm">WhatsApp</span>
                                <span className="text-xs text-gray-300">now</span>
                            </div>
                            <h4 className="font-bold text-sm">Unknown Number</h4>
                            <p className="text-sm">📷 Photo </p>
                        </div>
                    </div>

                    {/* Notification 2 - The Hook */}
                    <div className="bg-rose-600/90 backdrop-blur-md rounded-2xl p-4 flex gap-3 text-white shadow-lg transform scale-105 border border-rose-400 animate-pulse">
                        <div className="w-10 h-10 bg-black/20 rounded-xl flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-sm text-yellow-300">SYSTEM ALERT</span>
                                <span className="text-xs text-gray-300">now</span>
                            </div>
                            <h4 className="font-bold text-sm">Deleted Message Recovered</h4>
                            <p className="text-sm opacity-90">"Don't tell her about last night..."</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ASSET 2: TINDER MATCH CARD (DARK MODE) */}
            <div className="w-[400px] mx-auto bg-[#0f172a] rounded-3xl p-6 border border-slate-700 relative overflow-hidden shadow-[0_0_50px_rgba(244,63,94,0.3)]">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-500 to-purple-600"></div>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                        <span className="text-red-500 font-bold tracking-widest uppercase text-sm">Live Match Found</span>
                    </div>
                    <span className="text-slate-500 text-xs font-mono">ID: #9921</span>
                </div>

                <div className="relative aspect-[3/4] bg-slate-800 rounded-2xl overflow-hidden mb-4 group">
                    <img src="/placeholder.svg" className="w-full h-full object-cover opacity-50 blur-sm" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <User className="w-16 h-16 text-slate-400 mb-2" />
                        <div className="bg-rose-600 text-white px-3 py-1 rounded font-bold text-sm">IDENTITY HIDDEN</div>
                    </div>

                    {/* Scan Overlay */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_cyan] animate-[scan_2s_ease-in-out_infinite]"></div>
                </div>

                <div className="flex justify-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-slate-700 flex items-center justify-center text-rose-500"><X className="w-8 h-8" /></div>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg transform scale-110"><Heart className="w-8 h-8 fill-white" /></div>
                    <div className="w-14 h-14 rounded-full border-2 border-slate-700 flex items-center justify-center text-purple-500"><Check className="w-8 h-8" /></div>
                </div>
            </div>

            {/* ASSET 3: LOCATION MAP (SPY MODE) */}
            <div className="w-[400px] mx-auto bg-[#0B1120] rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl relative h-[300px]">
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                {/* Radar Circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-cyan-500/30 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-cyan-500/20 rounded-full"></div>

                {/* Pins */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="relative">
                        <div className="w-4 h-4 bg-rose-500 rounded-full animate-ping absolute inset-0"></div>
                        <MapPin className="w-8 h-8 text-rose-500 relative z-10" fill="currentColor" />
                    </div>
                    <div className="bg-black/80 text-rose-500 text-[10px] font-bold px-2 py-1 rounded mt-1 border border-rose-500/50">
                        Home: 22:00 PM <br /> <span className="text-white">NOT DETECTED</span>
                    </div>
                </div>

                <div className="absolute bottom-1/3 right-1/4 flex flex-col items-center">
                    <MapPin className="w-6 h-6 text-cyan-500" />
                    <div className="bg-black/80 text-cyan-400 text-[10px] font-bold px-2 py-1 rounded mt-1 border border-cyan-500/50">
                        Motel 6 <br /> <span className="text-white">Active Now</span>
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-slate-900/90 p-2 rounded border border-slate-700 text-xs font-mono text-green-400">
             > GPS Signal: STRONG <br />
             > Triangulation: COMPLETE
                </div>
            </div>

        </div>
    );
};
