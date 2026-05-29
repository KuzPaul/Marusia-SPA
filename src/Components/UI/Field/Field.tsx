import type { ReactNode, InputHTMLAttributes } from "react";
import "./Field.scss";
interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
  name: string;
  register: any;
}

export const Field = ({
  error,
  label,
  icon,
  name,
  register,
  ...rest
}: FieldProps) => {
  return (
    <div className="field">
      <div className={`field__wrapper ${error ? "error" : ""}`}>
        {icon ? (
          <span
            className={`field__icon ${error ? "field__icon--error" : ""}`}
            aria-hidden="true"
          >
            {icon}
          </span>
        ) : (
          ""
        )}
        <input
          className={`field__input ${error ? "field__input--error" : ""} ${icon ? "field__input--icon" : ""}`}
          {...register(name)}
          {...rest}
        />
        {error ? (
          <div style={{ marginTop: "5px", color: "red" }}>{error}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
