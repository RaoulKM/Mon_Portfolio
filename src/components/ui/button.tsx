import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  [
    "group/btn relative inline-flex select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md text-sm font-medium",
    "transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100",
    "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[inset_0_1px_0_0_hsl(0_0%_100%/0.15)] hover:brightness-110 hover:shadow-[inset_0_1px_0_0_hsl(0_0%_100%/0.15),0_0_30px_-6px_var(--glow-color)]",
        terminal:
          "border border-accent/40 bg-accent/10 font-mono uppercase tracking-wider text-accent hover:bg-accent/15 hover:shadow-[0_0_30px_-6px_var(--glow-color)] before:absolute before:inset-y-0 before:-left-full before:w-1/2 before:skew-x-[-20deg] before:bg-accent/15 before:transition-[left] before:duration-500 hover:before:left-full",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-border bg-background/40 backdrop-blur hover:border-accent/60 hover:text-foreground hover:shadow-[0_0_24px_-10px_var(--glow-color)]",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline [&_svg]:group-hover/btn:translate-x-0.5",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[inset_0_1px_0_0_hsl(0_0%_100%/0.12)] hover:brightness-110",
        whatsapp:
          "bg-[#25D366] font-medium text-[#05271a] shadow-[inset_0_1px_0_0_hsl(0_0%_100%/0.25)] hover:brightness-105 hover:shadow-[0_0_30px_-8px_#25D36688]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-[13px]",
        lg: "h-12 rounded-md px-7 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
