import { LegalFooter } from "@/components/legal-footer"
import { Check, ShieldCheck, Lock, Battery, MapPin, Calculator, Trash2, Cloud, Smartphone, Search } from "lucide-react"
import Link from "next/link"

export default function InitPage1() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Warning Header Strip */}
            <div className="bg-red-600 text-white py-3 px-4 text-center">
                <p className="text-sm md:text-base font-bold uppercase tracking-wide animate-pulse">
                    ⚠️ WAIT! YOUR ORDER IS NOT COMPLETE YET. DO NOT CLOSE THIS PAGE. ⚠️
                </p>
            </div>

            {/* Hero Section */}
            <section className="bg-white pt-12 pb-16 px-4 md:px-8 shadow-sm">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                        Body Language Tells You If They Are Lying. <br className="hidden md:block" />
                        <span className="text-blue-600">This Kit Tells You What They Are Hiding.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        You now have the skills to read their face. But if you want <strong>concrete proof</strong>, you need to look where 99% of secrets are hidden: <strong className="text-blue-600">The Digital Footprint.</strong>
                    </p>
                </div>
            </section>

            {/* Video Placeholder */}
            <section className="py-10 px-4 md:px-8 bg-slate-100">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-slate-800 rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                        <div className="text-center z-10 p-6">
                            <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20">
                                <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                            </div>
                            <p className="text-white/80 text-sm md:text-base max-w-md">
                                &ldquo;Most people think deleting a message deletes the evidence. It doesn&apos;t. Your phone tracks everything...&rdquo;
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Body Copy Section */}
            <section className="py-16 px-4 md:px-8 bg-white">
                <div className="max-w-3xl mx-auto prose prose-lg prose-slate">
                    <p className="text-slate-700 leading-relaxed">
                        <strong>Dear Friend,</strong>
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        Congratulations on securing the <em>Reading Signs</em> method. You are now miles ahead of everyone else when it comes to spotting a lie.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        But let&apos;s be honest for a second.
                    </p>
                    <p className="text-slate-900 font-semibold text-xl leading-relaxed">
                        Knowing they are lying is painful. <span className="text-blue-600">Proving it is power.</span>
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        When you confront your partner based on a &ldquo;feeling&rdquo; or a &ldquo;micro-expression,&rdquo; they can gaslight you. They can say, <em>&ldquo;You&apos;re crazy,&rdquo;</em> or <em>&ldquo;You&apos;re imagining things.&rdquo;</em>
                    </p>
                    <p className="text-slate-900 font-semibold leading-relaxed">
                        But they cannot argue with a screenshot. They cannot argue with digital logs.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        Most cheating partners think they are smart. They delete WhatsApp chats. They clear their browser history. They use &ldquo;Vanish Mode.&rdquo;
                    </p>
                    <p className="text-slate-900 font-bold text-xl">
                        But they make mistakes.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        They forget that smartphones are designed to track everything. Every action leaves a digital residue. Even if they delete the message, the phone remembers the app usage. Even if they turn off GPS, the photo metadata remembers the location.
                    </p>
                    <p className="text-blue-600 font-bold text-xl">
                        You just need to know where to look.
                    </p>
                </div>
            </section>

            {/* Product Introduction */}
            <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-blue-400 text-lg font-semibold mb-4">Introducing:</p>
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                            <Smartphone className="w-8 h-8 text-blue-400" />
                        </div>
                        <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                            <Search className="w-8 h-8 text-blue-400" />
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                        📱 The Digital Audit Kit
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-300 font-medium">
                        How to Find Concrete Proof Without Being a Hacker
                    </p>
                    <p className="text-slate-400 mt-6 max-w-2xl mx-auto leading-relaxed">
                        This is not a spy app. This is not illegal software. This is a <strong className="text-white">step-by-step guide</strong> on how to audit digital devices effectively to find what is hidden in plain sight.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 px-4 md:px-8 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-slate-900">
                        Here is what you will discover inside:
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Feature 1 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Battery className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 mb-2">🔋 The &ldquo;Battery Betrayal&rdquo; Technique</h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        How to instantly see which apps are being used the most (and at what times), even if the icon is hidden from the home screen.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 mb-2">📍 The Location Timeline</h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        How to access the hidden map inside Google and Apple accounts that shows exactly where the phone has been, minute by minute.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Calculator className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 mb-2">🛡️ The &ldquo;Calculator&rdquo; Vaults</h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        Is that really a calculator app? Learn how to spot fake apps that are actually secret vaults for photos and messages.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Trash2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 mb-2">🗑️ The Ghost Folder</h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        The one place inside the photo gallery that 90% of people forget to empty after deleting incriminating photos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 5 - Full Width */}
                        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="flex items-start gap-4 max-w-2xl mx-auto">
                                <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Cloud className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 mb-2">☁️ The Cloud Backdoor</h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        How to find messages that were deleted from the phone but are still living in the cloud backup.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Urgency Section */}
            <section className="py-16 px-4 md:px-8 bg-amber-50 border-y-4 border-amber-400">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-amber-900">
                        Why You Need This Right Now:
                    </h3>
                    <p className="text-lg text-amber-800 leading-relaxed">
                        If you leave this page, you might never find this offer again. But more importantly, <strong>digital evidence disappears with time.</strong>
                    </p>
                    <p className="text-lg text-amber-900 font-semibold">
                        Every day you wait is a day they might clear the cache or update the software.
                    </p>
                    <p className="text-amber-800 leading-relaxed">
                        You don&apos;t need to be a tech genius. You don&apos;t need to guess passwords. You just need to follow the checklist.
                    </p>
                    <p className="text-xl font-bold text-amber-900 pt-4">
                        Get the Peace of Mind You Deserve.
                    </p>
                </div>
            </section>

            {/* Offer Section */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <div>
                        <p className="text-blue-200 text-lg mb-2">The Offer:</p>
                        <p className="text-blue-100 leading-relaxed">
                            Normally, we sell this advanced module separately for <span className="line-through opacity-70">$97</span> because it is so powerful.
                        </p>
                        <p className="text-white leading-relaxed mt-2">
                            But since you are a new member, and I want you to have the <strong>COMPLETE truth</strong>, you can add this to your order right now for a single payment of:
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                        <p className="text-blue-200 text-lg font-medium mb-2">One Time Only</p>
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-3xl text-white/50 line-through">$97</span>
                            <span className="text-6xl md:text-7xl font-extrabold text-white">$47</span>
                        </div>
                        <p className="text-yellow-400 font-bold mt-3 text-lg">
                            🔥 That&apos;s a 50% Discount - One Time Only!
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Link
                            href="https://pay.mycheckoutt.com/019bc677-f5bc-70ee-8e14-7f2ad8946394?ref="
                            className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg md:text-xl font-bold py-5 px-10 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-orange-400"
                        >
                            ✅ YES! Add The &ldquo;Digital Audit Kit&rdquo; To My Order
                        </Link>
                        <p className="text-blue-100 text-sm">
                            Click here to add for just $47. Instant Access.
                        </p>
                    </div>

                    <div className="pt-4">
                        <Link
                            href="/initpage2"
                            className="text-slate-400 hover:text-slate-300 text-sm underline transition-colors inline-block"
                        >
                            No thanks, I don&apos;t want the digital proof. I will rely only on my intuition and body language signs.
                        </Link>
                    </div>
                </div>
            </section>

            {/* Guarantee Section */}
            <section className="py-16 px-4 md:px-8 bg-white">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-green-900 mb-4">
                            🔒 100% Risk-Free Guarantee
                        </h3>
                        <p className="text-green-800 leading-relaxed">
                            Just like the main course, if you use these techniques and find they are too difficult or not useful, just email us, and we will refund this upgrade immediately. <strong>No questions asked.</strong>
                        </p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-12 px-4 md:px-8 bg-slate-100">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <Link
                        href="https://pay.mycheckoutt.com/019bc677-f5bc-70ee-8e14-7f2ad8946394?ref="
                        className="inline-block w-full md:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    >
                        ✅ YES! Add The Digital Audit Kit - Only $47
                    </Link>
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                        <Lock className="w-4 h-4" />
                        Secure Payment • Instant Access
                    </div>
                </div>
            </section>

            <LegalFooter />
        </div>
    )
}
