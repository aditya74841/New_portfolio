import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="text-3xl font-bold text-white tracking-tight mt-10 mb-4 border-b border-gray-800 pb-3" {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="text-2xl font-bold text-white tracking-tight mt-8 mb-3" {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="text-xl font-semibold text-gray-100 mt-6 mb-2" {...props} />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="text-gray-300 text-base leading-relaxed mb-5" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-2" {...props} />
    ),
    ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-6 ml-2" {...props} />
    ),
    li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
        <li className="text-gray-300 inline-block w-full" {...props} />
    ),
    blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
        <blockquote className="border-l-4 border-gray-600 bg-gray-950 px-5 py-4 rounded-r-xl my-6 text-gray-200 italic" {...props} />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <pre className="bg-gray-950 border border-gray-800 rounded-xl p-4 overflow-x-auto text-sm font-mono text-gray-200 my-6 shadow-xl" {...props} />
    ),
    code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
        if (className) {
            return (
                <code className={`font-mono text-xs md:text-sm text-gray-200 ${className}`} {...props}>
                    {children}
                </code>
            );
        }
        return (
            <code className="bg-gray-800 text-gray-200 px-1.5 py-0.5 rounded text-xs md:text-sm font-mono border border-gray-700" {...props}>
                {children}
            </code>
        );
    },
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a className="text-white hover:text-gray-300 underline underline-offset-4 font-medium transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
    ),
    hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
        <hr className="border-gray-800 my-8" {...props} />
    ),
};

interface MDXContentProps {
    source: string;
}

export default function MDXContent({ source }: MDXContentProps) {
    return (
        <div className="prose prose-invert max-w-none">
            <MDXRemote source={source} components={components} />
        </div>
    );
}
