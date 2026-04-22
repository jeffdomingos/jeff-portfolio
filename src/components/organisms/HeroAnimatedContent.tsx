'use client'

import { useState, useEffect } from 'react'
import { HeroCarousel } from "@/components/organisms/HeroCarousel"

export function HeroAnimatedContent({ headline, carouselItems }: { headline: string, carouselItems: any[] }) {
    const [displayedText, setDisplayedText] = useState('')
    const [isTyping, setIsTyping] = useState(true)
    const [showCarousel, setShowCarousel] = useState(false)

    useEffect(() => {
        setDisplayedText('')
        setIsTyping(true)
        setShowCarousel(false)
        
        let i = 0
        const intervalId = setInterval(() => {
            setDisplayedText(headline.slice(0, i))
            i++
            if (i > headline.length) {
                clearInterval(intervalId)
                setIsTyping(false)
                // Small delay before showing carousel for a dramatic effect
                setTimeout(() => setShowCarousel(true), 300)
            }
        }, 50)

        return () => clearInterval(intervalId)
    }, [headline])

    return (
        <div className="w-full flex flex-col items-center">
            {/* The h1 starts lower (translate-y-24) to simulate true vertical center, then glides up when carousel shows */}
            <h1 className={`text-4xl md:text-5xl font-bold max-w-4xl leading-tight drop-shadow-md z-10 relative text-center transition-all duration-1000 transform ${showCarousel ? 'translate-y-0 mb-8 mt-12' : 'translate-y-32 mb-0 mt-32'}`}>
                {/* Ghost text to statically reserve the exact width and height so lines do not shift */}
                <span className="opacity-0 pointer-events-none block">{headline}</span>
                
                {/* Typing text overlaid perfectly on top */}
                <span className="absolute top-0 left-0 w-full h-full text-foreground text-center flex items-start justify-center flex-wrap">
                    {displayedText}
                    {isTyping && (
                        <span className="inline-block ml-1 w-[2px] h-[0.9em] bg-current animate-pulse align-middle translate-y-1" />
                    )}
                </span>
            </h1>

            {/* Slider / Carousel animated reveal */}
            <div className={`w-full transition-all duration-1000 transform ${showCarousel ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <HeroCarousel items={carouselItems} />
            </div>
        </div>
    )
}
