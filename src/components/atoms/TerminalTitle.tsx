"use client";

import React from "react";
import { AnimatedTypingText } from "@/components/atoms/AnimatedTypingText";

export function TerminalTitle({ 
    text, 
    className = "", 
    as: Component = "h2"
}: { 
    text: string, 
    className?: string,
    as?: any
}) {
    return (
        <AnimatedTypingText
            as={Component}
            text={text}
            mode="scroll"
            animationType="typing"
            scrollOffset={["start 95%", "start 40%"]}
            className={className}
        />
    );
}
