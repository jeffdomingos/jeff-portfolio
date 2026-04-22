'use client'

import { useState, useEffect, useRef } from 'react'

export function MouseTiltBackground({ imageUrl }: { imageUrl: string }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const requestRef = useRef<number>()
    const target = useRef({ x: 0, y: 0 })
    const current = useRef({ x: 0, y: 0 })
    const [style, setStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.05)' })

    useEffect(() => {
        const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

        const animate = () => {
            current.current.x = lerp(current.current.x, target.current.x, 0.04);
            current.current.y = lerp(current.current.y, target.current.y, 0.04);

            const maxTilt = 8;
            const rotateX = -current.current.y * maxTilt; 
            const rotateY = current.current.x * maxTilt;

            setStyle({
                transform: `perspective(1000px) rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg) scale(1.05)`
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: globalThis.MouseEvent) => {
            if (!containerRef.current) return;
            const parent = containerRef.current.parentElement;
            if (!parent) return;

            const rect = parent.getBoundingClientRect();
            
            // If the mouse goes below the hero section or outside horizontally, return to center
            if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
                target.current.x = 0;
                target.current.y = 0;
            } else {
                target.current.x = (e.clientX / window.innerWidth) - 0.5;
                target.current.y = (e.clientY / rect.height) - 0.5; // Calc relative to Hero height
            }
        }

        const handleMouseLeave = () => {
            target.current.x = 0;
            target.current.y = 0;
        }

        window.addEventListener('mousemove', handleMouseMove)
        document.body.addEventListener('mouseleave', handleMouseLeave)
        
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            window.removeEventListener('mousemove', handleMouseMove)
            document.body.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div 
                className="absolute inset-[-5%] bg-center bg-no-repeat bg-cover opacity-100 dark:mix-blend-multiply dark:opacity-80 will-change-transform"
                style={{ 
                    backgroundImage: `url(${imageUrl})`,
                    ...style 
                }}
            />
        </div>
    )
}
