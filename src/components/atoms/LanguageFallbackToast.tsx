"use client"

import { useEffect } from "react"
import { toast } from "sonner"

interface LanguageFallbackToastProps {
    requestedLocale: string
    effectiveLang: string
}

export function LanguageFallbackToast({ requestedLocale, effectiveLang }: LanguageFallbackToastProps) {
    useEffect(() => {
        if (requestedLocale !== effectiveLang) {
            const isViewingInEnglish = requestedLocale === "en"
            const message = isViewingInEnglish
                ? "This case study is only available in Portuguese for now."
                : "Este case só está disponível em inglês por enquanto."

            toast.info(message, {
                duration: 6000,
                position: "bottom-center",
            })
        }
    }, [requestedLocale, effectiveLang])

    return null
}
