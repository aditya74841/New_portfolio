"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock({
    children,
    ...props
}: React.HTMLAttributes<HTMLPreElement>) {
    const [copied, setCopied] = useState(false);

    // Helper to extract text and language from code children
    const extractCodeInfo = () => {
        let text = "";
        let lang = "";

        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child)) {
                const childProps = child.props as {
                    className?: string;
                    children?: React.ReactNode;
                };
                if (childProps.children) {
                    text += extractText(childProps.children);
                }
                if (childProps.className) {
                    const match =
                        childProps.className.match(/language-(\w+)/) ||
                        childProps.className.match(/hljs\s+language-(\w+)/) ||
                        childProps.className.match(/hljs\s+(\w+)/);
                    if (match && match[1] !== "hljs") {
                        lang = match[1];
                    }
                }
            } else if (typeof child === "string") {
                text += child;
            }
        });

        return { text: text.trimEnd(), lang };
    };

    const extractText = (node: React.ReactNode): string => {
        if (typeof node === "string") return node;
        if (typeof node === "number") return String(node);
        if (Array.isArray(node)) return node.map(extractText).join("");
        if (React.isValidElement(node)) {
            const props = node.props as { children?: React.ReactNode };
            return extractText(props.children);
        }
        return "";
    };

    const { text, lang } = extractCodeInfo();

    const handleCopy = () => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative my-6 rounded-xl border border-gray-800 bg-gray-900/90 overflow-hidden group shadow-lg">
            {/* Top header bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900/90 border-b border-gray-800 text-xs font-mono select-none">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    {lang && (
                        <span className="ml-2 text-gray-400 font-semibold uppercase tracking-wider text-[11px]">
                            {lang}
                        </span>
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-gray-800/80 hover:bg-gray-700/80 px-2.5 py-1 rounded-md transition-colors cursor-pointer border border-gray-700/50"
                    title="Copy code"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code block */}
            <pre
                className="p-4 overflow-x-auto text-sm font-mono text-gray-200 leading-relaxed bg-gray-950/60"
                {...props}
            >
                {children}
            </pre>
        </div>
    );
}
