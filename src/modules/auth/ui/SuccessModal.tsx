import IconLogo from "@/assets/icons/headerIcon.svg?react";
import IconReset from "@/assets/icons/btn__reset.svg?react";
import { Button } from "@/shared/ui/Button";
import type { FC } from "react";
import type { AuthProps } from "@/shared/types/userTypes";
import { cn } from "@/shared/lib/cn";
import styles from "./AuthForm.module.scss";

export const SuccessModal: FC<AuthProps> = ({ onClose, setModal }) => {
  return (
    <div className={styles["auth-modal"]}>
      <IconLogo className={styles["auth-modal__logo"]} width={156} height={35} />
      <h2 className={styles["auth-modal__title"]}>Регистрация завершена</h2>
      <p className={styles["auth-modal__description"]}>
        Используйте вашу электронную почту для входа
      </p>
      <Button
        className={cn("button", styles["auth-modal__reset"])}
        onClick={() => onClose(false)}
        type="reset"
        aria-label="закрыть модальное окно"
      >
        <IconReset
          className={styles["auth-modal__reset-icon"]}
          width={24}
          height={24}
        />
      </Button>
      <Button
        className={cn(
          "button",
          styles["auth-modal__active"],
          styles["auth-modal__active--login"],
        )}
        type="button"
        aria-label={"кнопка входа"}
        onClick={() => {
          setModal("login");
        }}
      >
        Войти
      </Button>
    </div>
  );
};
