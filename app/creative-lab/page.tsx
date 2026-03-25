"use client";

import { CreativeAssets } from '@/components/CreativeAssets';

export default function CreativeLabPage() {
    return (
        <div className="min-h-screen bg-black">
            <div className="p-4 text-center text-white border-b border-gray-800">
                <h1 className="text-xl font-bold">Creative Assets Generator</h1>
                <p className="text-sm text-gray-400">Use these components to take high-converting screenshots for your ads.</p>
            </div>
            <CreativeAssets />
        </div>
    );
}
