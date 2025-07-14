import type { ReactElement } from "react";

//type variant = {variant:"primary"|"secondary"}
interface ButtonProps {
  variant: "primary" | "secondary";
  title: string;
  // size: "sm" | "md" | "lg";
  startIcon?: ReactElement;
  onClick?: () => void;
  fullwidth?: boolean;
  loading?: boolean;
  
}

const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

// const sizeStyles = {
//   sm: "px-2 py-1 text-sm rounded-sm",
//   md: "px-4 py-2 text-md rounded-md",
//   lg: "px-7 py-3 text-xl rounded-lg",
// };

const defaultStyles = "flex items-center px-5 py-2 font-light rounded-md";

export function Button({
  title,
  variant,
  startIcon,
  onClick,
  fullwidth,
  loading
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        variantStyles[variant] +
        " " +
        defaultStyles +
        " " +
        `${fullwidth ? "w-full flex justify-center items-center" : " "}` +
        " " +
        `${loading ? "opacity-50" : ""}`
      }
      disabled={loading}
    >
      {startIcon}
      <div className="pl-2 pr-2">{title}</div>
    </button>
  );
}
