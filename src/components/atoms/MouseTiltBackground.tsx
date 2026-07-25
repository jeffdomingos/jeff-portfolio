'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export function MouseTiltBackground({ imageUrl }: { imageUrl: string }) {
    const containerRef = useRef<HTMLDivElement>(null)
    
    // Valores de movimento puros, não causam re-render no React
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Suavização automática do framer-motion (substitui o lerp manual)
    const springConfig = { damping: 25, stiffness: 150 }
    const springX = useSpring(mouseX, springConfig)
    const springY = useSpring(mouseY, springConfig)

    // Mapeamento dos valores de mouse (-0.5 a 0.5) para rotação em graus (-10 a 10)
    const maxTilt = 20;
    const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt / 2, -maxTilt / 2])
    const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt / 2, maxTilt / 2])

    useEffect(() => {
        const handleMouseMove = (e: globalThis.MouseEvent) => {
            if (!containerRef.current) return;
            const parent = containerRef.current.parentElement;
            if (!parent) return;

            const rect = parent.getBoundingClientRect();
            
            // Se o mouse estiver dentro da seção do hero, calcula o tilt. Senão, zera.
            if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
                mouseX.set((e.clientX / window.innerWidth) - 0.5);
                mouseY.set((e.clientY / rect.height) - 0.5);
            } else {
                mouseX.set(0);
                mouseY.set(0);
            }
        }

        const handleMouseLeave = () => {
            mouseX.set(0);
            mouseY.set(0);
        }

        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        document.body.addEventListener('mouseleave', handleMouseLeave, { passive: true })

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.body.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [mouseX, mouseY])

    return (
        <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" style={{ perspective: 1000 }}>
            <motion.div 
                className="absolute inset-[-5%] bg-center bg-no-repeat bg-cover opacity-100 will-change-transform"
                style={{ 
                    backgroundImage: `url(${imageUrl})`,
                    rotateX,
                    rotateY,
                    scale: 1.05
                }}
            />
        </div>
    )
}
