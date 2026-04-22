'use client'

import { useState, useEffect } from 'react'

export function TypewriterEffect({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState('')
    const [isTyping, setIsTyping] = useState(true)

    useEffect(() => {
        setDisplayedText('')
        setIsTyping(true)
        
        let i = 0
        const intervalId = setInterval(() => {
            setDisplayedText(text.slice(0, i))
            i++
            if (i > text.length) {
                clearInterval(intervalId)
                setIsTyping(false)
            }
        }, 80) // Adjust typing speed here (ms per character)

        return () => clearInterval(intervalId)
    }, [text])

    return (
        <span className="inline-block relative">
            {displayedText}
            <span className="inline-block ml-1 w-[2px] h-[0.9em] bg-current animate-pulse align-middle" />
        </span>
    )
}
