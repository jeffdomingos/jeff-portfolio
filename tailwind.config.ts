import type { Config } from 'tailwindcss'

const config = {
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['var(--font-barlow)', 'Tahoma', 'Verdana', 'sans-serif'],
				heading: ['var(--font-barlow-condensed)', '"Arial Narrow"', '"Helvetica Neue Condensed"', 'Tahoma', 'Verdana', 'sans-serif'],
			},
			colors: {
				border: 'oklch(var(--color-border) / <alpha-value>)',
				input: 'oklch(var(--color-input) / <alpha-value>)',
				ring: 'oklch(var(--color-ring) / <alpha-value>)',
				background: 'oklch(var(--color-background) / <alpha-value>)',
				foreground: 'oklch(var(--color-foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'oklch(var(--color-primary) / <alpha-value>)',
					foreground: 'oklch(var(--color-primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'oklch(var(--color-secondary) / <alpha-value>)',
					foreground: 'oklch(var(--color-secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'oklch(var(--color-destructive) / <alpha-value>)',
					foreground: 'oklch(var(--color-destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'oklch(var(--color-muted) / <alpha-value>)',
					foreground: 'oklch(var(--color-muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'oklch(var(--color-accent) / <alpha-value>)',
					foreground: 'oklch(var(--color-accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'oklch(var(--color-popover) / <alpha-value>)',
					foreground: 'oklch(var(--color-popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'oklch(var(--color-card) / <alpha-value>)',
					foreground: 'oklch(var(--color-card-foreground) / <alpha-value>)'
				}
			},
			fontSize: {
				'step--2': 'var(--step--2)',
				'step--1': 'var(--step--1)',
				'step-0': 'var(--step-0)',
				'step-1': 'var(--step-1)',
				'step-2': 'var(--step-2)',
				'step-3': 'var(--step-3)',
				'step-4': 'var(--step-4)',
				'step-5': 'var(--step-5)',
				'step-6': 'var(--step-6)',
			},
			spacing: {
				'fluid-3xs': 'var(--space-3xs)',
				'fluid-2xs': 'var(--space-2xs)',
				'fluid-xs': 'var(--space-xs)',
				'fluid-s': 'var(--space-s)',
				'fluid-m': 'var(--space-m)',
				'fluid-l': 'var(--space-l)',
				'fluid-xl': 'var(--space-xl)',
				'fluid-2xl': 'var(--space-2xl)',
				'fluid-3xl': 'var(--space-3xl)',
				'fluid-4xl': 'var(--space-4xl)',
				'fluid-s-l': 'var(--space-s-l)',
				'fluid-m-xl': 'var(--space-m-xl)',
				'fluid-l-3xl': 'var(--space-l-3xl)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config

export default config
