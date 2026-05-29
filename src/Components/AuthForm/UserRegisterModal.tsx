import { Button } from "../UI/Button";
import IconEmail from "../../assets/icons/email-icon.svg?react";
import IconPassword from "../../assets/icons/password.svg?react";
import IconUser from "../../assets/icons/user.svg?react";
import IconLogo from "../../assets/icons/headerIcon.svg?react";
import IconReset from "../../assets/icons/btn__reset.svg?react";
import { Field } from "../UI/Field";
import type { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/Users";
import { useForm } from "react-hook-form";
import {
  SchemaRegister,
  type AuthProps,
  type UserRegister,
} from "../../types/userTypes";
import { zodResolver } from "@hookform/resolvers/zod";

export const UserRegisterModal: FC<AuthProps> = ({ onClose, setModal }) => {
  const useRegister = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setModal("success");
    },
    onError: (errors) => {
      alert("Ошибка регистрации");
      console.error(errors, "регистрация не выполнена");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
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
    <div className={`auth-modal`}>
      <IconLogo className="auth-modal__logo" width={156} height={35} />
      <h2 className={`auth-modal__title `}>Регистрация</h2>
      <Button
        className="button auth-modal__reset"
        onClick={() => onClose(false)}
        type="reset"
        aria-label="закрыть модальное окно"
      >
        <IconReset className="auth-modal__reset-icon" width={24} height={24} />
      </Button>
      <form
        className={`auth-modal__form`}
        onSubmit={handleSubmit((data) => {
          useRegister.mutate(data);
          reset();
        })}
      >
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
          className=" button auth-modal__active"
          type="submit"
          aria-label={"кнопка создания "}
        >
          Создать аккаунт
        </Button>
        <Button
          className=" button auth-modal__btn"
          aria-label={"У меня есть пароль"}
          onClick={() => setModal("login")}
        >
          {"У меня есть пароль"}
        </Button>
      </form>
    </div>
  );
};
