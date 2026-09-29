import { Button } from "@/shared/ui/Button";
import IconLogo from "@/assets/icons/headerIcon.svg?react";
import IconReset from "@/assets/icons/btn__reset.svg?react";
import IconEmail from "@/assets/icons/email-icon.svg?react";
import IconPassword from "@/assets/icons/password.svg?react";
import { Field } from "@/shared/ui/Field";
import { useState, type FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/shared/api/queryKeys";
import { loginUser } from "../api/Users";
import { useForm } from "react-hook-form";
import {
  SchemaLogin,
  type AuthProps,
  type UserLogin,
} from "@/shared/types/userTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryClient } from "@/shared/lib/queryClient";
import { cn } from "@/shared/lib/cn";
import styles from "./AuthForm.module.scss";

export const UserLoginModal: FC<AuthProps> = ({ onClose, setModal }) => {
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
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
    },
  });

  return (
    <div className={styles["auth-modal"]}>
      <IconLogo className={styles["auth-modal__logo"]} width={156} height={35} />
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
      <form
        className={styles["auth-modal__form"]}
        onSubmit={handleSubmit((data) => {
          setLoginError(null);
          useLogin.mutate(data);
        })}
      >
        {loginError ? (
          <p className={styles["auth-modal__error"]} role="alert">
            {loginError}
          </p>
        ) : null}
        <fieldset className={styles["auth-modal__form-group"]}>
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
          className={cn("button", styles["auth-modal__active"])}
          type="submit"
          aria-label="кнопка входа"
          isLoading={useLogin.isPending}
          disabled={useLogin.isPending}
        >
          Войти
        </Button>
        <Button
          className={cn("button", styles["auth-modal__btn"])}
          type="button"
          aria-label={"Регистрация"}
          onClick={() => setModal("register")}
        >
          Регистрация
        </Button>
      </form>
    </div>
  );
};
