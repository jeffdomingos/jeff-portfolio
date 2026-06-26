import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground hover:font-bold",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-background hover:text-destructive border border-destructive hover:font-bold",
        outline:
          "border border-foreground bg-transparent hover:bg-foreground hover:text-background hover:font-bold",
        secondary:
          "bg-transparent text-foreground hover:font-bold",
        ghost: "hover:font-bold hover:bg-foreground/5",
        link: "text-foreground underline-offset-4 hover:underline hover:font-bold",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 px-5 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
