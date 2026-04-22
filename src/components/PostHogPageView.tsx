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

      // Check for Super Properties (Tracking unified Campaign Origin)
      let origemCampanha = null

      if (/(?:\/pt)?\/cv\/?$/i.test(pathname)) {
        origemCampanha = 'Currículo'
      } else if (/(?:\/pt)?\/linkedin\/?$/i.test(pathname)) {
        origemCampanha = 'Perfil LinkedIn'
      } else {
        const originMatch = pathname.match(/(?:\/pt)?\/(?:to|para)\/([^/?]+)/i)
        if (originMatch && originMatch[1]) {
          origemCampanha = decodeURIComponent(originMatch[1])
        }
      }

      if (origemCampanha) {
        posthog.register({
          origem_campanha: origemCampanha
        })
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
