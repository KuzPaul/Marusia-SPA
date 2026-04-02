import { Button } from "../UI/Button";
import IconLogo from "../../assets/icons/headerIcon.svg?react";
import IconReset from "../../assets/icons/btn__reset.svg?react";
import IconEmail from "../../assets/icons/email-icon.svg?react";
import IconPassword from "../../assets/icons/password.svg?react";
import { Field } from "../UI/Field";
import { useState, type FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "../../api/queryKeys";
import { loginUser } from "../../api/Users";
import { useForm } from "react-hook-form";
import {
  SchemaLogin,
  type AuthProps,
  type UserLogin,
} from "../../types/userTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryClient } from "../../utils/queryClient";

export const UserLoginModal: FC<AuthProps> = ({ onClose, setModal }) => {
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLogin>({
    resolver: zodResolver(SchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const useLogin = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      setLoginError(null);
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
      onClose(false);
    },
    onError: () => {
      setLoginError("Неверный email или пароль");
      reset();
    },
  });

  return (
    <div className={`auth-modal`}>
      <IconLogo className="auth-modal__logo" width={156} height={35} />
      <Button
        className="button auth-modal__reset"
        onClick={() => onClose(false)}
        type="reset"
        aria-label="закрыть модальное окно"
      >
        <IconReset className="auth-modal__reset-icon" width={24} height={24} />
      </Button>
      <form
        className={`auth-modal__form `}
        onSubmit={handleSubmit((data) => {
          setLoginError(null);
          useLogin.mutate(data);
        })}
      >
        {loginError ? (
          <p className="auth-modal__error" role="alert">
            {loginError}
          </p>
        ) : null}
        <fieldset className="auth-modal__form-group">
          <Field
            name="email"
            error={errors.email?.message}
            placeholder="Электронная почта"
            register={register}
            icon={<IconEmail width="24" height="24" />}
            aria-label="поля для почты"
            required={true}
          />
          <Field
            name="password"
            type="password"
            error={errors.password?.message}
            placeholder="Пароль"
            register={register}
            icon={<IconPassword width="24" height="24" />}
            aria-label="введите Пароль"
            required={true}
          />
        </fieldset>
        <Button
          className=" button auth-modal__active"
          type="submit"
          aria-label="кнопка входа"
        >
          Войти
        </Button>
        <Button
          className=" button auth-modal__btn"
          aria-label={"Регистрация"}
          onClick={() => setModal("register")}
        >
          Регистрация
        </Button>
      </form>
    </div>
  );
};
