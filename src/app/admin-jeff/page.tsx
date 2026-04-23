'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePostHog } from 'posthog-js/react'

export default function AdminJeffPage() {
    const router = useRouter()
    const posthog = usePostHog()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Save local hardcoded block
            window.localStorage.setItem('jeff_opt_out', 'true')
            
            if (posthog) {
                posthog.opt_out_capturing()
            }
            
            alert('Opt-out nativo do PostHog E Bloqueio Completo (Storage) ativado com sucesso para este dispositivo.')
            router.push('/')
        }
    }, [router, posthog])

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <p>Desativando rastreamento (Opt-out nativo)...</p>
        </div>
    )
}
