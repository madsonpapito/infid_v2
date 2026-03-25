import { LegalFooter } from "@/components/legal-footer"
import { Check, Shield, Headphones, Mic, Scroll, Brain, Lock, XCircle, Heart } from "lucide-react"
import Link from "next/link"

export default function InitPage2() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* Warning Header Strip */}
            <div className="bg-amber-100 text-amber-800 py-3 px-4 text-center border-b border-amber-200">
                <p className="text-sm md:text-base font-bold uppercase tracking-wide">
                    ⚠️ FINAL STEP: THIS IS YOUR LAST UPGRADE OPTION.
                </p>
            </div>

            {/* Hero Section */}
            <section className="bg-white pt-12 pb-16 px-4 md:px-8 shadow-sm">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                        Finding The Truth Is Only Half The Battle. <br className="hidden md:block" />
                        <span className="text-teal-600">Now, You Must Win The Confrontation.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Don&apos;t let your emotions sabotage you. Learn how to stay <strong>100% calm</strong>, block manipulation, and control the conversation without saying a word you&apos;ll regret.
                    </p>
                </div>
            </section>

            {/* Emotional Pain Points */}
            <section className="py-16 px-4 md:px-8 bg-slate-50">
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg prose-slate mx-auto">
                        <p className="text-slate-700 leading-relaxed font-medium">
                            Let me ask you a hard question.
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                            When the moment comes... when you finally sit down to confront your partner with the truth... <strong>are you ready?</strong>
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                            Or are you afraid that:
                        </p>
                        <ul className="space-y-2 list-none pl-0">
                            <li className="flex items-start gap-3">
                                <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                                <span>Your voice will shake?</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                                <span>You will start crying and lose your train of thought?</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                                <span>They will twist your words and make you feel like the guilty one?</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                                <span>You will explode in anger and look &ldquo;crazy&rdquo;?</span>
                            </li>
                        </ul>
                        <p className="text-slate-700 leading-relaxed">
                            If a manipulator sees you losing control, they win. They use your emotions against you. They gaslight you. They make you doubt your own reality.
                        </p>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm my-8">
                            <p className="font-bold text-slate-900 text-lg mb-2">
                                You need to be a fortress. You need to be bulletproof.
                            </p>
                            <p className="text-teal-700 font-bold text-xl uppercase">
                                You need the Emotional Shielding Protocol.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Introduction */}
            <section className="py-20 px-4 md:px-8 bg-teal-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-teal-600 font-semibold uppercase tracking-wider mb-2">Introducing</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
                            <Shield className="w-8 h-8 md:w-10 md:h-10 text-teal-600" />
                            The Emotional Shielding Protocol
                        </h2>
                        <p className="text-lg text-slate-600 font-medium">
                            (Audio Guide + Emergency Scripts)
                        </p>
                        <p className="text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed">
                            This is not therapy. This is <strong className="text-teal-700">tactical emotional preparation</strong>. Designed to be used minutes before a difficult conversation, this protocol gives you the mental strength to handle any outcome with dignity and power.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Audio Feature */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-teal-100/50 hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-4">
                                <Headphones className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 mb-3">🎧 The 5-Minute &ldquo;SOS&rdquo; Audio</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Listen to this immediately before the confrontation. It uses neuro-linguistic techniques to lower your heart rate and stop the &ldquo;fight or flight&rdquo; shaking.
                            </p>
                        </div>

                        {/* Grey Rock Method */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-teal-100/50 hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mb-4">
                                <Mic className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 mb-3">🗿 The &ldquo;Grey Rock&rdquo; Method</h3>
                            <p className="text-slate-600 leading-relaxed">
                                How to become emotionally uninteresting to a manipulator. If they try to provoke you, this technique stops them dead in their tracks.
                            </p>
                        </div>

                        {/* Dignity Scripts */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-teal-100/50 hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                                <Scroll className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 mb-3">📜 The Dignity Scripts</h3>
                            <p className="text-slate-600 mb-4">Exact phrases to say when they try to blame you:</p>
                            <div className="bg-slate-50 p-4 rounded-lg text-sm border-l-4 border-blue-400 space-y-2 italic text-slate-600">
                                <p>&ldquo;When they say: &apos;You&apos;re invading my privacy!&apos;&rdquo;</p>
                                <p>&ldquo;When they say: &apos;You&apos;re crazy/paranoid.&apos;&rdquo;</p>
                            </div>
                        </div>

                        {/* Detox */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-teal-100/50 hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                                <Brain className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 mb-3">🧠 Post-Confrontation Detox</h3>
                            <p className="text-slate-600 leading-relaxed">
                                How to stop the obsessive thoughts (&ldquo;ruminating&rdquo;) after the fight, so you can actually sleep.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Visual/Calm Section */}
            <section className="py-16 px-4 md:px-8 bg-white relative overflow-hidden">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2 relative bg-slate-100 rounded-3xl aspect-square md:aspect-[4/5] overflow-hidden shadow-lg">
                        {/* Placeholder for serene image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 text-white bg-black/20 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                            <div className="flex items-center gap-3 mb-2">
                                <Headphones className="w-5 h-5 text-teal-300" />
                                <span className="font-medium text-teal-100 text-sm uppercase tracking-wide">Audio Session</span>
                            </div>
                            <p className="text-lg font-medium leading-snug">
                                &ldquo;Put your headphones in, listen to my voice, and borrow my calm.&rdquo;
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 space-y-6">
                        <h3 className="text-3xl font-bold text-slate-900">Why This Is Different</h3>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            You can&apos;t &ldquo;read&rdquo; a manual when you are panicking. That is why this program is <strong>audio-based</strong>.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Be the person who stays in control. The one who shouts loses. <strong>The one who whispers with confidence wins.</strong>
                        </p>
                        <div className="bg-teal-50 p-6 rounded-xl border border-teal-100 flex items-start gap-4">
                            <Heart className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-teal-900 mb-1">Peace of Mind</h4>
                                <p className="text-teal-800 text-sm leading-relaxed">
                                    I want you to handle this situation like a Queen/King. With dignity, grace, and absolute control.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Offer Section */}
            <section className="py-20 px-4 md:px-8 bg-slate-50 border-t border-slate-200">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <div>
                        <p className="text-slate-500 text-lg mb-2 uppercase tracking-wide font-medium">Special Offer</p>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                            Only $47 <span className="text-xl font-normal text-slate-500 block mt-2">(One-time payment)</span>
                        </h2>
                        <p className="text-slate-600 max-w-lg mx-auto leading-relaxed">
                            This protocol is usually reserved for my private coaching clients. But I want you to be safe.
                        </p>
                    </div>

                    <div className="space-y-4 pt-4">
                        <Link
                            href="https://pay.mycheckoutt.com/019880eb-6cf9-71f1-b2fa-aa4cc3cb278c?ref="
                            className="block w-full md:max-w-xl mx-auto bg-teal-600 hover:bg-teal-700 text-white text-lg md:text-xl font-bold py-5 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                        >
                            YES! Add The &ldquo;Emotional Shielding Protocol&rdquo; To My Order
                        </Link>
                        <p className="text-slate-500 text-sm">
                            Instant Digital Access • Secure Payment
                        </p>
                    </div>

                    <div className="pt-2">
                        <Link
                            href="/member"
                            className="text-slate-400 hover:text-slate-600 text-sm transition-colors inline-block border-b border-transparent hover:border-slate-400 pb-0.5"
                        >
                            No thanks. I am confident I can control my emotions during the confrontation without help. I will risk getting overwhelmed.
                        </Link>
                    </div>
                </div>
            </section>

            <LegalFooter />
        </div>
    )
}
