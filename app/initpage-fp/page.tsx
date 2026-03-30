"use client"

import { LegalFooter } from "@/components/legal-footer"
import { Check, ShieldCheck, Lock, Eye, BookOpen, MessageCircle } from "lucide-react"
import Link from "next/link"
import { FacebookTracker } from "@/components/FacebookTracker"

export default function InitPageFP() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <FacebookTracker />
            {/* Warning Header Strip */}
            <div className="bg-red-600 text-white py-3 px-4 text-center">
                <p className="text-sm md:text-base font-bold uppercase tracking-wide animate-pulse">
                    âš ï¸ WAIT! YOUR ORDER IS NOT COMPLETE YET. DO NOT CLOSE THIS PAGE. âš ï¸
                </p>
            </div>

            {/* Hero Section */}
            <section className="bg-white pt-12 pb-16 px-4 md:px-8 shadow-sm text-center space-y-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                        You Can See the Lies. <br className="hidden md:block" />
                        <span className="text-blue-600">Now, You Need to Hear the Truth.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mt-6">
                        Congratulations! You have just secured the <strong>Digital Footprint</strong> system. You are now seconds away from seeing what they hide on their phone.
                    </p>
                </div>
            </section>

            {/* Important Notice */}
            <section className="py-10 px-4 md:px-8 bg-amber-50 border-y border-amber-100">
                <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6">
                    <div className="bg-amber-100 p-4 rounded-full">
                        <ShieldCheck className="w-10 h-10 text-amber-600" />
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-xl font-bold text-amber-900">Wait! There is one final piece missing...</h2>
                        <p className="text-amber-800">
                            Most people find the evidence but don&apos;t know how to use it. Don&apos;t make that mistake.
                        </p>
                    </div>
                </div>
            </section>

            {/* Body Copy Section */}
            <section className="py-16 px-4 md:px-8 bg-white">
                <div className="max-w-3xl mx-auto prose prose-lg prose-slate">
                    <p className="text-slate-700 leading-relaxed italic border-l-4 border-slate-200 pl-6 my-8">
                        &ldquo;Body language is the subconscious leaking the truth before the mouth has a chance to lie.&rdquo;
                    </p>
                    
                    <p className="text-slate-700 leading-relaxed">
                        Now that you have the digital proof, you will likely face a <strong>confrontation</strong>.
                    </p>
                    
                    <p className="text-slate-700 leading-relaxed">
                        When you show them the evidence, they will try to lie their way out of it. They will say it&apos;s &ldquo;just a friend,&rdquo; &ldquo;old messages,&rdquo; or that &ldquo;you are crazy and imagining things.&rdquo;
                    </p>

                    <p className="text-slate-900 font-bold text-xl leading-relaxed">
                        Do you know how to tell if they are lying to your face in real-time?
                    </p>

                    <p className="text-slate-700 leading-relaxed">
                        If you can&apos;t read their micro-expressions, their eye movements, and their hand gestures, you will be <strong>gaslighted</strong>. You will have the proof in your hands, but they will make you feel like the guilty one.
                    </p>
                </div>
            </section>

            {/* Product Introduction */}
            <section className="py-16 px-4 md:px-8 bg-slate-900 text-white rounded-3xl mx-4 my-8 shadow-2xl">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block bg-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                        Limited Time Upgrade
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
                        ðŸ•µï¸ The Reading Signs Method
                    </h2>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                        Learn how to read a person like an open book. Know they are lying before they even finish the sentence.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                            <Eye className="text-blue-400 w-8 h-8 mb-4" />
                            <h3 className="font-bold mb-2 text-lg">Eye Gaze Patterns</h3>
                            <p className="text-sm text-slate-400">Discover where they look when they are creating a lie vs. remembering the truth.</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                            <MessageCircle className="text-blue-400 w-8 h-8 mb-4" />
                            <h3 className="font-bold mb-2 text-lg">Verbal Stutters</h3>
                            <p className="text-sm text-slate-400">The 3 specific &ldquo;trigger words&rdquo; liars use to buy time while thinking of a cover story.</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                            <BookOpen className="text-blue-400 w-8 h-8 mb-4" />
                            <h3 className="font-bold mb-2 text-lg">The Full Guide</h3>
                            <p className="text-sm text-slate-400">A complete masterclass on human psychology and lie detection.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 px-4 md:px-8">
                <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="bg-blue-600 p-8 text-center text-white">
                        <p className="uppercase tracking-widest text-sm font-bold opacity-80 mb-2">Exclusive Offer</p>
                        <div className="flex items-center justify-center gap-4">
                            <span className="text-3xl line-through opacity-50">$67</span>
                            <span className="text-6xl font-black">$19</span>
                        </div>
                    </div>
                    
                    <div className="p-8 md:p-12 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Check className="text-green-500 w-6 h-6 shrink-0" />
                                <p className="text-slate-700"><strong>Instant Access:</strong> Download the guide immediately.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Check className="text-green-500 w-6 h-6 shrink-0" />
                                <p className="text-slate-700"><strong>Universal:</strong> Works for partners, friends, and coworkers.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Check className="text-green-500 w-6 h-6 shrink-0" />
                                <p className="text-slate-700"><strong>Lifetime Updates:</strong> Never pay for new versions.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Link 
                                href="https://go.plataformafortpay.com.br/mdyvshobez"
                                className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-5 rounded-2xl text-xl font-bold shadow-lg shadow-orange-200 transition-all transform hover:-translate-y-1"
                            >
                                âœ… Add to My Order - Just $19
                            </Link>
                            <Link 
                                href="/initpage1-fp"
                                className="block w-full text-center text-slate-400 hover:text-slate-600 text-sm underline transition-colors"
                            >
                                No thanks, I don&apos;t want to read their signs. I&apos;ll stick with just the digital proof.
                            </Link>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400 text-xs">
                            <Lock className="w-3 h-3" /> Secure 256-bit Encrypted Payment
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 md:px-8 bg-slate-100">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-lg mb-2">Is this a physical book?</h3>
                            <p className="text-slate-600">No, this is a digital masterclass that you can access instantly on your phone, tablet, or computer.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-lg mb-2">Does this work if the person is a &ldquo;good liar&rdquo;?</h3>
                            <p className="text-slate-600">Yes. These techniques are based on biological responses that are impossible to control consciously, even for experienced liars.</p>
                        </div>
                    </div>
                </div>
            </section>

            <LegalFooter />
        </div>
    )
}
