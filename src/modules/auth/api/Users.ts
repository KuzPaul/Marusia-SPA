import { apiUrl } from "@/shared/constants/api";
import {
  SchemaDataUser,
  SchemaLogin,
  SchemaRegister,
  type UserInfo,
  type UserLogin,
  type UserRegister,
} from "@/shared/types/userTypes";
import { validateResponse } from "@/shared/lib/validate";

//вход пользователя
export const loginUser = async (loginInfo: UserLogin): Promise<void> => {
  const data = SchemaLogin.parse(loginInfo);
  return fetch(apiUrl("/auth/login"), {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })
    .then(validateResponse)
    .then(() => undefined);
};

//регистрация пользователя
export const registerUser = async (
  registerInfo: UserRegister,
): Promise<void> => {
  const parsed = SchemaRegister.parse(registerInfo);
  const payload = {
    email: parsed.email,
    password: parsed.password,
    name: parsed.name,
    surname: parsed.surname,
  };
  return fetch(apiUrl("/user"), {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  })
    .then(validateResponse)
    .then(() => undefined);
};

//выход пользователя
export const logoutUser = async (): Promise<void> => {
  return fetch(apiUrl("/auth/logout"), {
    credentials: "include",
  })
    .then(validateResponse)
    .then(() => undefined);
};

//получение данных о текущем пользователе
export const getUser = async (): Promise<UserInfo> => {
  return fetch(apiUrl("/profile"), {
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => SchemaDataUser.parse(data));
};
