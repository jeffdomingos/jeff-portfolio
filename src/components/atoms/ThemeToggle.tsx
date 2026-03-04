"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme, systemTheme } = useTheme()

    // Resolve current theme safely
    const currentTheme = theme === "system" ? systemTheme : theme
    const isDark = currentTheme === "dark"

    // To avoid hydration mismatch, we only render the actual UI after mount
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => setMounted(true), [])

    if (!mounted) {
        return <div className="w-10 h-10" /> // Placeholder to prevent layout shift
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-10 h-10 border border-transparent hover:border-border hover:bg-muted"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle Theme"
        >
            {isDark ? (
                <Sun className="h-5 w-5 transition-all text-foreground" />
            ) : (
                <Moon className="h-5 w-5 transition-all text-foreground" />
            )}
        </Button>
    )
}
