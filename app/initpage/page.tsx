"use client"

import { LegalFooter } from "@/components/legal-footer"
import { Check, ShieldCheck, Lock, Eye, BookOpen, MessageCircle } from "lucide-react"
import Link from "next/link"
import { FacebookTracker } from "@/components/FacebookTracker"

export default function InitPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Facebook Tracking - envia evento ViewContent com dados enriquecidos */}
            <FacebookTracker
                eventName="ViewContent"
                contentName="Sales Page - Reading Signs"
                contentCategory="Offer"
                customData={{ value: 37, currency: "BRL" }}
            />

            {/* Hero Section */}
            <section className="bg-white pt-20 pb-16 px-4 md:px-8 shadow-sm">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
                        Discover the Truth
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                        Is Your Partner Hiding Something? <br className="hidden md:block" />
                        <span className="text-blue-600">Learn to Read the Signs.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        The proven method to identify lies through body language and behavioral psychology. Reclaim your peace of mind today.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
                        <Link
                            href="https://pay.mycheckoutt.com/019bc3ae-63ca-7242-97fd-5ca7d86778fd?ref="
                            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                        >
                            Get Access Now For $37
                        </Link>
                    </div>
                    <p className="text-sm text-slate-400 mt-4 flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> 100% Safe and Discrete Purchase
                    </p>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-20 px-4 md:px-8 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">What You Will Learn</h2>
                        <p className="text-slate-600 mt-4 text-lg">Advanced techniques simplified for immediate application.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Benefit 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                                <Eye className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Body Language Reading</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Identify micro-expressions and involuntary gestures that reveal lies and omissions in seconds.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Conversation Techniques</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Know exactly what questions to ask and how to analyze answers to uncover the truth without aggressive confrontation.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Couples Reconnection</h3>
                            <p className="text-slate-600 leading-relaxed">
                                It's not just about uncovering lies. Learn techniques to rekindle the flame and rebuild trust if that is your desire.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Breakdown Section */}
            <section className="py-20 px-4 md:px-8 bg-white">
                <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
                    <h2 className="text-3xl font-bold text-center mb-10">Training Content</h2>
                    <div className="space-y-4">
                        {[
                            "Module 1: The fundamentals of lying and how the brain reacts.",
                            "Module 2: Reading eyes, hands, and posture – The body speaks.",
                            "Module 3: Analyzing text messages and online behavior.",
                            "Module 4: The Truth Method – How to confront safely.",
                            "Bonus: Guide to Rebuilding Trust and Intimacy."
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                                <div className="bg-green-100 text-green-600 p-1 rounded-full mt-0.5">
                                    <Check className="w-4 h-4" />
                                </div>
                                <p className="text-slate-700 font-medium">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold">Stop Living in Doubt.</h2>
                    <p className="text-blue-100 text-lg md:text-xl">
                        Get immediate access to all content and discover the truth today. Unconditional 7-day guarantee.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href="https://pay.mycheckoutt.com/019bc3ae-63ca-7242-97fd-5ca7d86778fd?ref="
                            className="bg-white text-blue-700 hover:bg-slate-100 text-lg font-bold py-4 px-10 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 w-full md:w-auto"
                        >
                            Yes! I Want Immediate Access
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-blue-200 opacity-90">
                            <Lock className="w-4 h-4" /> Secure Payment via Kirvano
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 md:px-8 bg-slate-50">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {/* FAQ Item 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg mb-2 text-slate-800">Is it safe to buy?</h3>
                            <p className="text-slate-600">Yes, 100% safe. The payment is processed by Kirvano, one of the most secure platforms. Your data is protected.</p>
                        </div>
                        {/* FAQ Item 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg mb-2 text-slate-800">How do I get access?</h3>
                            <p className="text-slate-600">Immediately after payment confirmation, you will receive an email with your login and password to access the member area.</p>
                        </div>
                        {/* FAQ Item 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg mb-2 text-slate-800">Does it work for any relationship?</h3>
                            <p className="text-slate-600">Yes. The body language and psychology techniques are universal and work regardless of the length of the relationship.</p>
                        </div>
                    </div>
                </div>
            </section>

            <LegalFooter />
        </div>
    )
}
