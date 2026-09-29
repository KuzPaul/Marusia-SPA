import type { InputHTMLAttributes, ReactNode } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { cn } from "@/shared/lib/cn";
import styles from "./Field.module.scss";

interface FieldProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
}

export const Field = <T extends FieldValues>({
  error,
  label,
  icon,
  name,
  register,
  ...rest
}: FieldProps<T>) => {
  return (
    <div className={styles.field}>
      {label ? <label className="visually-hidden">{label}</label> : null}
      <div className={cn(styles.field__wrapper, error ? styles.error : undefined)}>
        {icon ? (
          <span
            className={cn(
              styles.field__icon,
              error ? styles["field__icon--error"] : undefined,
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
        ) : null}
        <input
          className={cn(
            styles.field__input,
            error && styles["field__input--error"],
            icon ? styles["field__input--icon"] : undefined,
          )}
          {...register(name)}
          {...rest}
        />
        {error ? <div className={styles.field__error}>{error}</div> : null}
      </div>
    </div>
  );
};
