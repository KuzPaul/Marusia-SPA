import { Button } from "@/shared/ui/Button";
import IconEmail from "@/assets/icons/email-icon.svg?react";
import IconPassword from "@/assets/icons/password.svg?react";
import IconUser from "@/assets/icons/user.svg?react";
import IconLogo from "@/assets/icons/headerIcon.svg?react";
import IconReset from "@/assets/icons/btn__reset.svg?react";
import { Field } from "@/shared/ui/Field";
import { useState, type FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/Users";
import { useForm } from "react-hook-form";
import {
  SchemaRegister,
  type AuthProps,
  type UserRegister,
} from "@/shared/types/userTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/shared/lib/cn";
import styles from "./AuthForm.module.scss";

export const UserRegisterModal: FC<AuthProps> = ({ onClose, setModal }) => {
  const [registerError, setRegisterError] = useState<string | null>(null);

  const useRegister = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setRegisterError(null);
      setModal("success");
    },
    onError: (error) => {
      const raw = error instanceof Error ? error.message : "";
      setRegisterError(
        raw.includes("already exists")
          ? "Пользователь с такой почтой уже существует"
          : "Не удалось зарегистрироваться. Попробуйте ещё раз",
      );
      console.error(error, "регистрация не выполнена");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>({
    resolver: zodResolver(SchemaRegister),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      surname: "",
      confirmPassword: "",
    },
  });

  return (
    <div className={styles["auth-modal"]}>
      <IconLogo className={styles["auth-modal__logo"]} width={156} height={35} />
      <h2 className={styles["auth-modal__title"]}>Регистрация</h2>
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
          setRegisterError(null);
          useRegister.mutate(data);
        })}
      >
        {registerError ? (
          <p className={styles["auth-modal__error"]} role="alert">
            {registerError}
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
            name="name"
            error={errors.name?.message}
            placeholder="Имя"
            register={register}
            icon={<IconUser width="24" height="24" />}
            aria-label="введите имя"
            required={true}
          />

          <Field
            name="surname"
            error={errors.surname?.message}
            placeholder="Фамилия"
            register={register}
            icon={<IconUser width="24" height="24" />}
            aria-label="введите фамилию"
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

          <Field
            name="confirmPassword"
            type="password"
            error={errors.confirmPassword?.message}
            placeholder="Подтвердите пароль"
            register={register}
            icon={<IconPassword width="24" height="24" />}
            aria-label="подтвердите Пароль"
            required={true}
          />
        </fieldset>

        <Button
          className={cn("button", styles["auth-modal__active"])}
          type="submit"
          aria-label={"кнопка создания "}
          isLoading={useRegister.isPending}
          disabled={useRegister.isPending}
        >
          Создать аккаунт
        </Button>
        <Button
          className={cn("button", styles["auth-modal__btn"])}
          type="button"
          aria-label={"У меня есть пароль"}
          onClick={() => setModal("login")}
        >
          {"У меня есть пароль"}
        </Button>
      </form>
    </div>
  );
};
