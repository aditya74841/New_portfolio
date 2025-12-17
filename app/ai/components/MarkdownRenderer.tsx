import React from "react";

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    // Parse and render markdown content
    const parseMarkdown = (text: string): React.ReactNode[] => {
        const elements: React.ReactNode[] = [];
        const lines = text.split("\n");
        let inCodeBlock = false;
        let codeBlockContent: string[] = [];
        let codeBlockLang = "";

        lines.forEach((line, lineIndex) => {
            // Check for code block start/end
            if (line.startsWith("```")) {
                if (!inCodeBlock) {
                    inCodeBlock = true;
                    codeBlockLang = line.slice(3).trim();
                    codeBlockContent = [];
                } else {
                    // End of code block
                    elements.push(
                        <div key={`code-${lineIndex}`} className="my-4">
                            <div className="bg-slate-800 rounded-t-lg px-4 py-2 text-xs text-slate-400 border-b border-slate-700 flex items-center justify-between">
                                <span>{codeBlockLang || "code"}</span>
                                <button
                                    onClick={() => navigator.clipboard.writeText(codeBlockContent.join("\n"))}
                                    className="text-slate-400 hover:text-white transition-colors text-xs"
                                >
                                    Copy
                                </button>
                            </div>
                            <pre className="bg-slate-800 rounded-b-lg p-4 overflow-x-auto">
                                <code className="text-sm text-cyan-300 font-mono">
                                    {codeBlockContent.join("\n")}
                                </code>
                            </pre>
                        </div>
                    );
                    inCodeBlock = false;
                    codeBlockContent = [];
                    codeBlockLang = "";
                }
                return;
            }

            if (inCodeBlock) {
                codeBlockContent.push(line);
                return;
            }

            // Empty line
            if (line.trim() === "") {
                elements.push(<div key={`empty-${lineIndex}`} className="h-4" />);
                return;
            }

            // Headers
            if (line.startsWith("### ")) {
                elements.push(
                    <h3 key={`h3-${lineIndex}`} className="text-lg font-bold text-white mt-4 mb-2">
                        {parseInlineMarkdown(line.slice(4))}
                    </h3>
                );
                return;
            }
            if (line.startsWith("## ")) {
                elements.push(
                    <h2 key={`h2-${lineIndex}`} className="text-xl font-bold text-white mt-4 mb-2">
                        {parseInlineMarkdown(line.slice(3))}
                    </h2>
                );
                return;
            }
            if (line.startsWith("# ")) {
                elements.push(
                    <h1 key={`h1-${lineIndex}`} className="text-2xl font-bold text-white mt-4 mb-2">
                        {parseInlineMarkdown(line.slice(2))}
                    </h1>
                );
                return;
            }

            // Bullet points
            if (line.match(/^[\s]*[-*]\s/)) {
                const indent = line.match(/^[\s]*/)?.[0].length || 0;
                const text = line.replace(/^[\s]*[-*]\s/, "");
                elements.push(
                    <div
                        key={`li-${lineIndex}`}
                        className="flex items-start gap-2 my-1"
                        style={{ marginLeft: `${indent * 8}px` }}
                    >
                        <span className="text-cyan-400 mt-1.5">•</span>
                        <span>{parseInlineMarkdown(text)}</span>
                    </div>
                );
                return;
            }

            // Numbered lists
            if (line.match(/^[\s]*\d+\.\s/)) {
                const match = line.match(/^[\s]*(\d+)\.\s(.*)$/);
                if (match) {
                    elements.push(
                        <div key={`ol-${lineIndex}`} className="flex items-start gap-2 my-1">
                            <span className="text-cyan-400 font-medium min-w-[20px]">{match[1]}.</span>
                            <span>{parseInlineMarkdown(match[2])}</span>
                        </div>
                    );
                }
                return;
            }

            // Regular paragraph
            elements.push(
                <p key={`p-${lineIndex}`} className="my-1">
                    {parseInlineMarkdown(line)}
                </p>
            );
        });

        return elements;
    };

    // Parse inline markdown (bold, italic, code, links)
    const parseInlineMarkdown = (text: string): React.ReactNode => {
        const parts: React.ReactNode[] = [];
        let remaining = text;
        let keyIndex = 0;

        while (remaining.length > 0) {
            // Bold with **
            const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
            // Italic with *
            const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);
            // Inline code with `
            const codeMatch = remaining.match(/`([^`]+)`/);
            // Links [text](url)
            const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

            // Find the earliest match
            const matches = [
                { type: "bold", match: boldMatch, index: boldMatch?.index ?? Infinity },
                { type: "italic", match: italicMatch, index: italicMatch?.index ?? Infinity },
                { type: "code", match: codeMatch, index: codeMatch?.index ?? Infinity },
                { type: "link", match: linkMatch, index: linkMatch?.index ?? Infinity },
            ].sort((a, b) => a.index - b.index);

            const earliest = matches.find((m) => m.match);

            if (!earliest || earliest.index === Infinity) {
                // No more matches, add remaining text
                if (remaining) parts.push(remaining);
                break;
            }

            // Add text before the match
            if (earliest.index > 0) {
                parts.push(remaining.slice(0, earliest.index));
            }

            // Add the matched element
            const match = earliest.match!;
            switch (earliest.type) {
                case "bold":
                    parts.push(
                        <strong key={`bold-${keyIndex++}`} className="font-bold text-white">
                            {match[1]}
                        </strong>
                    );
                    remaining = remaining.slice(earliest.index + match[0].length);
                    break;
                case "italic":
                    parts.push(
                        <em key={`italic-${keyIndex++}`} className="italic text-slate-300">
                            {match[1]}
                        </em>
                    );
                    remaining = remaining.slice(earliest.index + match[0].length);
                    break;
                case "code":
                    parts.push(
                        <code
                            key={`code-${keyIndex++}`}
                            className="bg-slate-700 text-cyan-300 px-1.5 py-0.5 rounded text-sm font-mono"
                        >
                            {match[1]}
                        </code>
                    );
                    remaining = remaining.slice(earliest.index + match[0].length);
                    break;
                case "link":
                    parts.push(
                        <a
                            key={`link-${keyIndex++}`}
                            href={match[2]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 underline"
                        >
                            {match[1]}
                        </a>
                    );
                    remaining = remaining.slice(earliest.index + match[0].length);
                    break;
            }
        }

        return parts.length === 1 ? parts[0] : <>{parts}</>;
    };

    return <div className="markdown-content">{parseMarkdown(content)}</div>;
};

export default MarkdownRenderer;
