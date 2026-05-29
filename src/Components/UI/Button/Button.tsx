import type { ReactNode } from "react";
import "./Button.scss";

interface ButtonProps {
  children?: ReactNode;
  className: string;
  value?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (e?: any) => void;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  isLoading?: boolean | undefined;
  "aria-label": string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "btn",
  type = "button",
  onClick,
  disabled = false,
  isLoading,
  ...rest
}) => {
  return (
    <button
      className={`${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {isLoading ? <span className="btn__spinner"></span> : children}
    </button>
  );
};
