'use client'

import posthog from 'posthog-js'
import { PostHogProvider as Provider } from 'posthog-js/react'
import { ReactNode, useEffect } from 'react'

export function PostHogProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || 'phc_placeholder', {
                api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
                person_profiles: 'identified_only'
            })
        }
    }, [])

    return <Provider client={posthog}>{children}</Provider>
}
