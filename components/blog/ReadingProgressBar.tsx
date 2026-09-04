"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            setProgress(totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[200] h-[3px] bg-transparent pointer-events-none">
            <div
                className="h-full bg-white transition-all duration-75 ease-out opacity-30"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
