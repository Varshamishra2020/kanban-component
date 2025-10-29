import React from "react";
import { clsx } from "clsx";

interface AvatarProps {
  name?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = "md",
  className,
}) => {
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  };

  return (
    <div
      className={clsx(
        "bg-primary-500 text-white rounded-full flex items-center justify-center font-medium",
        sizeClasses[size],
        className
      )}
    >
      {name ? getInitials(name) : "?"}
    </div>
  );
};
