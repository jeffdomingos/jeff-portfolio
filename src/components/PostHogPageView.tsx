'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { usePostHog } from 'posthog-js/react'

export default function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    // Triggers a $pageview event on every route change.
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture('$pageview', {
        $current_url: url,
      })

      // The cleanup function runs just before the component unmounts 
      // or when the dependencies (pathname) change, sending an explicit pageleave.
      return () => {
        posthog.capture('$pageleave')
      }
    }
  }, [pathname, searchParams, posthog])
  
  return null
}
