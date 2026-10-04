"use client";

import { useEffect, useId, useRef, useState } from "react";

type CardDescriptionProps = {
    description: string;
};

const CardDescription = ({ description }: CardDescriptionProps) => {
    const [expanded, setExpanded] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const descriptionId = useId();

    useEffect(() => {
        const text = textRef.current;
        if (!text) return;

        const observer = new ResizeObserver(() => {
            setHasOverflow(text.scrollHeight > text.clientHeight);
        });
        observer.observe(text);
        return () => observer.disconnect();
    }, [description]);

    return (
        <div className="mt-auto">
            <p
                id={descriptionId}
                ref={textRef}
                tabIndex={expanded ? 0 : undefined}
                className={`h-24 leading-6 ${expanded ? "overflow-y-auto" : "line-clamp-4 overflow-hidden"}`}
            >
                {description}
            </p>
            <div className="mt-2 h-6">
                {hasOverflow && (
                    <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={descriptionId}
                        onClick={() => setExpanded(!expanded)}
                        className="cursor-pointer text-sm font-semibold text-red-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        {expanded ? "কম দেখুন" : "আরও দেখুন"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default CardDescription;
