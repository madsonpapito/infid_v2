import { LegalFooter } from "@/components/legal-footer"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <main className="flex-grow container mx-auto px-4 py-12 max-w-3xl">
                <h1 className="text-3xl font-bold mb-8 text-slate-900">Terms of Use</h1>

                <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
                    <h2 className="text-xl font-semibold text-slate-800 mt-6">1. Terms</h2>
                    <p>
                        By accessing the website <span className="font-semibold">Infidelity Find</span>, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-800 mt-6">2. Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on Infidelity Find's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>modify or copy the materials;</li>
                        <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                        <li>attempt to decompile or reverse engineer any software contained on Infidelity Find's website;</li>
                        <li>remove any copyright or other proprietary notations from the materials; or</li>
                        <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                    </ul>
                    <p>
                        This license shall automatically terminate if you violate any of these restrictions and may be terminated by Infidelity Find at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-800 mt-6">3. Disclaimer</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>The materials on Infidelity Find's website are provided on an 'as is' basis. Infidelity Find makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</li>
                        <li>Further, Infidelity Find does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-slate-800 mt-6">4. Limitations</h2>
                    <p>
                        In no event shall Infidelity Find or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Infidelity Find, even if Infidelity Find or a Infidelity Find authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-800 mt-6">5. Accuracy of materials</h2>
                    <p>
                        The materials appearing on Infidelity Find's website could include technical, typographical, or photographic errors. Infidelity Find does not warrant that any of the materials on its website are accurate, complete or current. Infidelity Find may make changes to the materials contained on its website at any time without notice. However Infidelity Find does not make any commitment to update the materials.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-800 mt-6">6. Links</h2>
                    <p>
                        Infidelity Find has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Infidelity Find of the site. Use of any such linked website is at the user's own risk.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-800 mt-6">Modifications</h2>
                    <p>
                        Infidelity Find may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-800 mt-6">Governing Law</h2>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of Infidelity Find and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>
                </div>
            </main>
            <LegalFooter />
        </div>
    )
}
