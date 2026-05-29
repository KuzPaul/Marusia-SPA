import IconLogo from "../../assets/icons/headerIcon.svg?react";
import IconReset from "../../assets/icons/btn__reset.svg?react";
import { Button } from "../UI/Button";
import type { FC } from "react";
import type { AuthProps } from "../../types/userTypes";

export const SuccessModal: FC<AuthProps> = ({ onClose, setModal }) => {
  return (
    <div className={`auth-modal `}>
      <IconLogo className="auth-modal__logo" width={156} height={35} />
      <h2 className={`auth-modal__title `}>Регистрация завершена</h2>
      <p className="auth-modal__description">
        Используйте вашу электронную почту для входа
      </p>
      <Button
        className="button auth-modal__reset"
        onClick={() => onClose(false)}
        type="reset"
        aria-label="закрыть модальное окно"
      >
        <IconReset className="auth-modal__reset-icon" width={24} height={24} />
      </Button>
      <Button
        className="button auth-modal__active auth-modal__active--login "
        type="submit"
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
