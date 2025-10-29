import React from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    secondary: "bg-neutral-200 text-neutral-900 hover:bg-neutral-300",
    ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
