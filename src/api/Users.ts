import { API } from "../constants/api";
import {
  SchemaDataUser,
  SchemaLogin,
  SchemaRegister,
  type UserInfo,
  type UserLogin,
  type UserRegister,
} from "../types/userTypes";
import { validateResponse } from "../utils/validate";

//вход пользователя
export const loginUser = async (loginInfo: UserLogin): Promise<void> => {
  const data = SchemaLogin.parse(loginInfo);
  return fetch(`${API}/auth/login`, {
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
  const data = SchemaRegister.parse(registerInfo);
  return fetch(`${API}/user`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  })
    .then(validateResponse)
    .then(() => undefined);
};

//выход пользователя
export const logoutUser = async (): Promise<void> => {
  return fetch(`${API}/auth/logout`, {
    credentials: "include",
  })
    .then(validateResponse)
    .then(() => undefined);
};

//получение данных о текущем пользователе
export const getUser = async (): Promise<UserInfo> => {
  return fetch(`${API}/profile`, {
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => SchemaDataUser.parse(data));
};
