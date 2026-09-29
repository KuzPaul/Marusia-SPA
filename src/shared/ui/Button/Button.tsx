import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  isLoading?: boolean;
  size?: "small" | "medium" | "large";
  "aria-label": string;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  type = "button",
  onClick,
  disabled = false,
  isLoading,
  ...rest
}) => {
  return (
    <button
      className={cn("button", className)}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {isLoading ? <span className={styles.spinner}></span> : children}
    </button>
  );
};
