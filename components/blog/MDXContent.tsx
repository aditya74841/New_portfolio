import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import CodeBlock from "./CodeBlock";

const components = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-10 mb-4" {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="text-xl sm:text-2xl font-semibold text-white mt-9 mb-3" {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="text-lg font-semibold text-white mt-7 mb-2" {...props} />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="text-gray-300 text-[17px] leading-[1.8] mb-5" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="list-disc list-outside ml-5 text-gray-300 space-y-2 mb-5 text-[17px] leading-[1.8]" {...props} />
    ),
    ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal list-outside ml-5 text-gray-300 space-y-2 mb-5 text-[17px] leading-[1.8]" {...props} />
    ),
    li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
        <li className="text-gray-300 text-[17px]" {...props} />
    ),
    blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className="border-l-2 border-gray-600 pl-5 my-6 text-gray-400 italic text-[17px] leading-[1.8]"
            {...props}
        />
    ),
    pre: CodeBlock,
    code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
        if (className) {
            return (
                <code className={`font-mono text-sm ${className}`} {...props}>
                    {children}
                </code>
            );
        }
        return (
            <code
                className="bg-gray-800 text-gray-200 px-1.5 py-0.5 rounded text-[0.85em] font-mono"
                {...props}
            >
                {children}
            </code>
        );
    },
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
            className="text-white underline underline-offset-4 decoration-gray-600 hover:decoration-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
        />
    ),
    hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
        <hr className="border-gray-800 my-8" {...props} />
    ),
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
        <strong className="font-semibold text-white" {...props} />
    ),
    em: (props: React.HTMLAttributes<HTMLElement>) => (
        <em className="italic text-gray-300" {...props} />
    ),
    table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
        <div className="overflow-x-auto my-6 border border-gray-800 rounded-lg">
            <table className="w-full text-sm text-gray-300" {...props} />
        </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <thead className="bg-gray-900 text-white text-xs uppercase font-mono" {...props} />
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
        <th className="px-4 py-2.5 text-left" {...props} />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
        <td className="px-4 py-2.5 border-t border-gray-800 text-gray-400" {...props} />
    ),
};

export default function MDXContent({ source }: { source: string }) {
    return (
        <div className="mdx-content">
            <MDXRemote
                source={source}
                components={components}
                options={{
                    mdxOptions: {
                        rehypePlugins: [rehypeHighlight],
                    },
                }}
            />
        </div>
    );
}

