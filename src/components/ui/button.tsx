import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
        variant === "primary" &&
          "bg-signal-cyan text-white hover:bg-signal-cyan/90 shadow-glow",
        variant === "secondary" &&
          "border border-border bg-white/[0.02] text-ink-primary hover:bg-white/[0.05]",
        variant === "ghost" && "text-ink-secondary hover:text-ink-primary",
        className
      )}
      {...props}
    />
  );
}
