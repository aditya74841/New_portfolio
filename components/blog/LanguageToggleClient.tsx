"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";

interface TranslationInfo {
    slug: string;
    language?: string;
}

interface LanguageToggleClientProps {
    currentLanguage: string;
    translations: TranslationInfo[];
}

const label = (lang?: string) => (lang === "hi" ? "हिंदी" : "English");

export default function LanguageToggleClient({
    currentLanguage,
    translations,
}: LanguageToggleClientProps) {
    const router = useRouter();

    return (
        <div className="flex items-center gap-3 text-sm mb-8 text-gray-500">
            <span>Read in:</span>
            <span className="text-white">{label(currentLanguage)}</span>
            {translations.map((t) => (
                <button
                    key={t.slug}
                    onClick={() =>
                        startTransition(() =>
                            router.push(`/blogs/${t.slug}`)
                        )
                    }
                    className="hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
                >
                    {label(t.language)}
                </button>
            ))}
        </div>
    );
}
