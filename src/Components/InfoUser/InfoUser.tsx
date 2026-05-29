import { useMutation } from "@tanstack/react-query";
import IconEmail from "../../assets/icons/email-icon.svg?react";
import { Button } from "../UI/Button";
import { logoutUser } from "../../api/Users";
import { queryKeys } from "../../api/queryKeys";
import { queryClient } from "../../utils/queryClient";
import { useNavigate } from "react-router-dom";
import "./InfoUser.scss";
import type { UserInfo } from "../../types/userTypes";
import { type FC } from "react";

interface UserProps {
  user: UserInfo | undefined;
}

export const InfoUser: FC<UserProps> = ({ user }) => {
  const navigate = useNavigate();
  //выход пользователя
  const useLogout = useMutation({
    mutationFn: logoutUser,
    onError: (err) => {
      console.error("ошибка выхода", err);
    },
  });

  const handleLogout = async () => {
    await useLogout.mutateAsync();
    queryClient.setQueryData(queryKeys.profile, null);
    queryClient.setQueryData(queryKeys.favorite, null);
    navigate("/");
  };

  return (
    <div className="user-info">
      <div className="user-info__block-name">
        <div className="user-info__logo-name">
          <span className="user-info__firstNameSurname">{`${user?.name[0]}${user?.surname[0]}`}</span>
        </div>
        <div className="user-info__current">
          <span className="user-info__text">Имя Фамилия</span>
          <span className="user-info__currentNameSurname">{`${user?.name} ${user?.surname}`}</span>
        </div>
      </div>
      <div className="user-info__block-email">
        <div className="user-info__logo-email">
          <IconEmail className="user-info__email-icon" width={24} height={24} />
        </div>
        <div className="user-info__current">
          <span className="user-info__text">Электронная почта</span>
          <span className="user-info__currentEmail">{user?.email}</span>
        </div>
      </div>
      <Button
        className="user-info__logout button"
        onClick={handleLogout}
        aria-label="выйти из профиля"
        isLoading={useLogout.isPending}
      >
        Выйти из аккаунта
      </Button>
    </div>
  );
};
