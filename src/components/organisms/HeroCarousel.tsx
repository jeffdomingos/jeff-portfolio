"use client";

import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

export function HeroCarousel({ items }: { items: { src: string, caption: string }[] }) {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false })
    );

    const fade = React.useRef(Fade());

    return (
        <Carousel
            plugins={[plugin.current, fade.current]}
            className="w-full max-w-5xl mx-auto mt-12 mb-8"
            opts={{
                align: "center",
                loop: true,
            }}
        >
            <CarouselContent>
                {items.map((item, index) => (
                    <CarouselItem key={index}>
                        <div className="p-2 flex flex-col items-center">
                            <img src={item.src} alt={item.caption} className="w-full max-w-4xl object-contain drop-shadow-2xl" />
                            <div className="mt-8 text-center text-lg font-medium text-foreground">{item.caption}</div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
