"use client";

import React from "react";
import { AnimatedTypingText } from "@/components/atoms/AnimatedTypingText";

export function TypewriterEffect({ text }: { text: string }) {
    return (
        <AnimatedTypingText
            as="span"
            text={text}
            mode="auto"
            animationType="typing"
            speed={80}
            delay={0}
            className="inline-block relative"
        />
    );
}
