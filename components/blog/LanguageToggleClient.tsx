"use client";

import React, { startTransition } from "react";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";

interface TranslationInfo {
    slug: string;
    language?: string;
}

interface LanguageToggleClientProps {
    currentLanguage: string;
    translations: TranslationInfo[];
}

export default function LanguageToggleClient({ currentLanguage, translations }: LanguageToggleClientProps) {
    const router = useRouter();

    const handleNavigate = (slug: string) => {
        startTransition(() => {
            router.push(`/blog/${slug}`);
        });
    };

    return (
        <div className="flex justify-end mb-8 animate-fadeIn">
            <div className="flex items-center gap-2 bg-black border border-gray-800 rounded-2xl p-1.5 px-3.5 shadow-2xl">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="font-mono text-gray-500 uppercase tracking-wider mr-1 text-[11px]">Read in:</span>
                <div className="flex items-center gap-1.5">
                    <span 
                        className="px-3 py-1 rounded-xl font-bold bg-white text-black shadow-md border border-gray-250 select-none"
                        style={{ fontSize: "15px" }}
                    >
                        {currentLanguage === "hi" ? "हिंदी" : "English"}
                    </span>
                    {translations.map((t) => (
                        <button
                            key={t.slug}
                            onClick={() => handleNavigate(t.slug)}
                            className="px-3 py-1 rounded-xl font-medium text-gray-400 hover:text-white transition-all hover:bg-gray-900 border border-transparent hover:border-gray-800 cursor-pointer text-left focus:outline-none"
                            style={{ fontSize: "15px" }}
                        >
                            {t.language === "hi" ? "हिंदी" : "English"}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
