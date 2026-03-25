import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

const variantClasses = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  secondary:
    "bg-muted text-foreground hover:bg-muted/80 font-medium border border-border",
  ghost:
    "text-muted-foreground hover:text-foreground hover:bg-muted",
  destructive:
    "bg-destructive/10 text-destructive hover:bg-destructive/20 font-medium",
  icon: "p-2 hover:bg-muted text-muted-foreground hover:text-foreground",
} as const;

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-2.5 text-base",
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, disabled, children, className = "", ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`inline-flex items-center justify-center rounded-md transition-colors ${variantClasses[variant]} ${variant !== "icon" ? sizeClasses[size] : ""} ${isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} ${className}`}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
