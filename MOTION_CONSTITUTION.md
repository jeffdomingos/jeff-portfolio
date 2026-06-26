# Animation & Motion Performance Constitution (2026)

## Purpose

This document defines mandatory motion and animation rules for all generated interfaces.

Goals:

* Maintain 60 FPS minimum on all devices.
* Prefer 120 FPS when hardware supports it.
* Guarantee smooth performance on Safari iOS.
* Follow Progressive Enhancement principles.
* Preserve accessibility.
* Prioritize perceived performance over visual complexity.
* Protect Core Web Vitals (Zero CLS impact, minimum INP impact).

---

# Core Principle

Motion must never compromise usability or main thread performance.

When there is a tradeoff between visual sophistication and performance, performance wins.

Motion exists to:

* clarify hierarchy
* communicate state changes
* guide attention
* improve perceived responsiveness

Motion should never exist purely for decoration if it costs frames.

---

# Performance Priority Order

Always prefer:

1. Transform (`translate`, `scale`, `rotate`)
2. Opacity
3. CSS Animations & Transitions
4. Web Animations API
5. Framer Motion
6. GSAP
7. Canvas
8. WebGL / WebGPU

Use the simplest solution capable of achieving the desired effect.

---

# Safe Animation Properties

**Preferred (Hardware Accelerated & GPU Composited):**

```css
transform
opacity
```

**Allowed with caution (Triggers Paint):**

```css
filter /* e.g., blur, drop-shadow */
background-color
border-radius
color
```

**Avoid completely (Triggers Layout/Reflow):**

```css
width
height
left
top
right
bottom
margin
padding
flex-basis
grid-template-columns
```

Never animate layout properties unless explicitly required. If you must, use CSS `clip-path` or scale transforms instead of animating physical dimensions like `width`/`height`.

---

# Progressive Enhancement Strategy

## Mobile First

Motion should be designed for the weakest device first.

Assume:

* Safari iPhone
* Mid-range Android
* Battery saving mode
* Thermal throttling

If motion performs well there, desktop will naturally perform well.

## Mobile Motion Budget

Mobile experiences should use:

* fewer simultaneous animations
* shorter distances
* fewer parallax layers
* no dynamic blurs (`backdrop-filter: blur` is extremely expensive on mobile)
* no `background-attachment: fixed` (broken/laggy on iOS Safari)

Maximum recommendation:

* 1 hero animation
* 1 scroll reveal system
* minimal background motion

## Desktop Enhancement

Desktop may add:

* richer parallax
* larger transitions
* additional decorative motion
* enhanced hover states
* complex layout transitions

Motion must degrade gracefully.

---

# Accessibility

Always support:

```css
@media (prefers-reduced-motion: reduce) { ... }
```

Never completely break the experience when reduced motion is enabled.

Replace:

* slides
* parallax
* large transforms

with:

* fades
* instant transitions
* subtle opacity changes

*In Framer Motion, use the `useReducedMotion()` hook to conditionally disable physics/springs.*

---

# Advanced Browser Optimizations

### The `contain` Property
Use CSS containment on heavily animated containers to isolate reflows and repaints from the rest of the DOM:
```css
contain: paint layout;
```

### The `will-change` Property
Use `will-change: transform, opacity;` ONLY when necessary, and applied just before the animation starts. Leaving `will-change` on elements permanently consumes excessive GPU RAM and degrades overall device performance.

### Force GPU Promotion
Modern browsers usually auto-promote transforms. If encountering jank on legacy devices, use `transform: translateZ(0)` or `translate3d(0,0,0)` to force hardware acceleration.

---

# CSS Animation Guidelines

Preferred for:

* hover states
* micro interactions
* buttons
* navigation
* cards
* small reveals

Use:

```css
transition
animation
@keyframes
```

Avoid JavaScript when CSS can solve the problem.

---

# Framer Motion Guidelines

Use Framer Motion for:

* page transitions
* reveal animations
* orchestrated sequences
* interaction states
* scroll-linked effects

Preferred APIs:

```tsx
animate
variants
whileHover
whileTap
whileInView /* always use `once: true` if possible to avoid infinite recalculations */
useScroll
useTransform
useSpring
```

Avoid excessive usage of:

```tsx
layout
layoutId
LayoutGroup
```

### Layout Animation Rules
If you must use `<motion.div layout>`, prefer `layout="position"`. Animating size triggers repaints of children. Never apply layout animations to large grids, long lists, or text-heavy blocks.

---

# Motion Value Rules (React State Safety)

Prefer:

```tsx
useMotionValue
useTransform
useSpring
```

Avoid:

```tsx
setState()
```

during animation frames. Tying a rapid scroll or drag event to React state forces full component re-renders at 60fps, killing the main thread (horrible INP). 
**Motion updates must bypass the React render cycle.**

---

# GSAP Guidelines

Use GSAP only when:

* timeline orchestration is incredibly complex
* SVG animation is highly advanced (morphing)
* advanced ScrollTrigger pinning/scrubbing is required and Framer Motion's `useScroll` is insufficient.

Do not use GSAP for simple fade or slide effects. GSAP should solve problems CSS and Framer Motion cannot.

---

# Scroll Animation Strategy

Preferred hierarchy:

1. Native browser scroll
2. CSS Scroll Timeline (Native API)
3. Framer Motion `useScroll`
4. GSAP ScrollTrigger

Use the lightest solution possible.

---

# Smooth Scroll Strategy

Default recommendation:

Use native browser scrolling.

Do not install smooth-scroll libraries (Lenis, Locomotive) by default.

Only use custom smooth scroll when building:

* storytelling experiences
* premium Awwwards-style marketing sites
* immersive product launches

**Avoid smooth scrolling in:**

* dashboards
* SaaS products
* CRUD systems
* admin interfaces

---

# Lenis Guidelines

If Lenis is used, use it **only** as a scroll engine.

Do not combine excessive:

* blur
* backdrop-filter
* video
* heavy parallax
* layout animation

in the same viewport. The scroll engine already claims a slice of CPU time; respect the budget.

---

# Scroll Performance Rules

Never attach direct listeners without throttling/debouncing:

```javascript
/* AVOID */
window.addEventListener("scroll", expensiveFunction)
```

Prefer:

```javascript
IntersectionObserver
```

or:

```javascript
useScroll()
```

or CSS Native:

```css
scroll-timeline
```

---

# Parallax Guidelines

Use sparingly. 

Recommended: 1–3 layers maximum.

Avoid:

* deep multi-layer systems
* large blur values on parallax layers
* dozens of individual moving elements

The best parallax is subtle. If the user notices the parallax before the content, the easing is wrong.

---

# Blur & Filters Guidelines

Blur is computationally expensive because it multiplies pixels iteratively.

Use:

```css
blur(4px)
blur(8px)
```

Prefer static blur. 

**Never animate:**

```css
blur(20px) -> blur(80px)
backdrop-filter: blur(...)
```
especially on mobile Safari. If you need a fading blur effect, cross-fade (opacity) two static elements (one sharp, one blurred).

---

# Video & Asset Guidelines

Videos should never autoplay if they block the main rendering thread.

Use:

```html
<video playsinline muted loop preload="metadata">
```

Avoid combining:

* video
* parallax
* blur
* scroll-linked animation

within the same section.

For complex vector animations (e.g., drawing 100 paths), **avoid animating SVGs directly with GSAP/Framer**. Prefer converting to **Lottie** or **Rive**, or pre-render as a WebM/MP4 video.

---

# Safari First Rule

Safari is the ultimate performance benchmark.

If Safari (WebKit) performs well:

* Chrome (Blink) will perform flawlessly.
* Firefox (Gecko) will perform well.

Test first on:

* iPhone Safari (Low Power Mode)
* MacBook Safari

---

# Animation Density Rules

Every page has a strict motion budget.

Maximum recommendation per screen:

* **Hero:** one primary animation system
* **Content:** one reveal system
* **Interactions:** one interaction system

Avoid stacking multiple animation paradigms.

**Bad:**
Framer Motion + GSAP + Lenis + ScrollTrigger + Dynamic Blur + WebGL all at once.

**Good:**
Framer Motion + `useScroll` + Hardware Accelerated Transforms + Opacity + Native Scroll.

---

# AI Generation Rules

When generating code:

**Always prefer:**
`transform` + `opacity`

**Prefer:**
GPU compositing
Motion values over React state (`useMotionValue` instead of `useState`)
Native browser capabilities (CSS transitions) before third-party libraries

**Avoid:**
Layout animations (`width`, `height`, `margin`)
Continuous React re-renders
JavaScript-driven animations when CSS can solve them

**The simplest performant solution is the only correct solution.**
