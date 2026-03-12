import z from "zod";

//схема входа
export const SchemaLogin = z.object({
  email: z.email("Введите корректную почту"),
  password: z.string().min(3, "пароль должен быть больше 3 символов"),
});

//схема регистрации
export const SchemaRegister = z
  .object({
    email: z.email("Введите корректную почту"),
    password: z.string().min(3, "пароль должен быть больше 3 символов"),
    name: z.string().min(2, "Имя пользователя должно быть больше 2 символов"),
    surname: z.string().min(2, "фамилия должна быть больше 2 символов"),
    confirmPassword: z.string().min(3, "пароль должен быть больше 3 символов"),
  })
  .refine((data) => data.confirmPassword === data.password, {
    error: "пароли не совпадают",
    path: ["confirmPassword"],
  });

//информация о пользователи его данные
export const SchemaDataUser = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.email(),
  favorites: z.array(z.string()),
});

export interface AuthProps {
  onClose: (b: boolean) => void;
  setModal: (status: "login" | "register" | "success") => void;
}

export type UserLogin = z.infer<typeof SchemaLogin>;
export type UserRegister = z.infer<typeof SchemaRegister>;
export type UserInfo = z.infer<typeof SchemaDataUser>;
