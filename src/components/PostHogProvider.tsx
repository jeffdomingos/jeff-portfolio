'use client'

import posthog from 'posthog-js'
import { PostHogProvider as Provider } from 'posthog-js/react'
import { ReactNode, useEffect } from 'react'

export function PostHogProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || 'phc_placeholder', {
                api_host: '/ingest',
                ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
                person_profiles: 'identified_only',
                capture_pageleave: true,
                capture_pageview: false, // Disabling to let PostHogPageView handle route changes manually
                loaded: (posthog_instance) => {
                    if (process.env.NODE_ENV === 'development') posthog_instance.debug()
                }
            })
        }
    }, [])

    return <Provider client={posthog}>{children}</Provider>
}
