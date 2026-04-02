import { useState, type FC } from "react";
import { SuccessModal } from "./SuccessModal";
import { UserLoginModal } from "./UserLoginModal";
import { UserRegisterModal } from "./UserRegisterModal";
import "./AuthForm.scss";

interface propsAuth {
  isOpen: boolean;
  onClose: (flag: boolean) => void;
}

const AuthForm: FC<propsAuth> = ({ isOpen, onClose }) => {
  const [modalStatus, setModal] = useState<"login" | "register" | "success">(
    "login",
  );

  if (!isOpen) return null;

  switch (modalStatus) {
    case "login":
      return <UserLoginModal onClose={onClose} setModal={setModal} />;
    case "register":
      return <UserRegisterModal setModal={setModal} onClose={onClose} />;
    case "success":
      return <SuccessModal setModal={setModal} onClose={onClose} />;
    default:
      break;
  }
};

export default AuthForm;
