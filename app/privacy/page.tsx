import { LegalFooter } from "@/components/legal-footer"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <main className="flex-grow container mx-auto px-4 py-12 max-w-3xl">
                <h1 className="text-3xl font-bold mb-8 text-slate-900">Privacy Policy</h1>

                <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
                    <p>
                        Your privacy is important to us. It is Infidelity Find's policy to respect your privacy regarding any information we may collect from you across our website, Infidelity Find, and other sites we own and operate.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-800 mt-6">Information we collect</h2>
                    <p>
                        We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-800 mt-6">Use of data</h2>
                    <p>
                        We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-800 mt-6">Sharing of data</h2>
                    <p>
                        We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-800 mt-6">Cooking</h2>
                    <p>
                        Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-800 mt-6">User Commitment</h2>
                    <p>
                        The user undertakes to make appropriate use of the contents and information that Infidelity Find offers on the site and with an enunciative, but not limiting, character:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>A) Not to engage in activities that are illegal or contrary to good faith and public order;</li>
                        <li>B) Not to spread propaganda or content of a racist, xenophobic nature, or gambling, any type of illegal pornography, apology for terrorism or against human rights;</li>
                        <li>C) Not to cause damage to the physical (hardware) and logical (software) systems of Infidelity Find, its suppliers or third parties, to introduce or disseminate computer viruses or any other hardware or software systems that are capable of causing the aforementioned damage.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-slate-800 mt-6">More information</h2>
                    <p>
                        Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
                    </p>

                    <p className="mt-8 text-sm">This policy is effective as of {new Date().getFullYear()}.</p>
                </div>
            </main>
            <LegalFooter />
        </div>
    )
}
