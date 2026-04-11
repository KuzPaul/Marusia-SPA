import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Loader } from "../Components/UI/Loader";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { userInfo, isPending } = useUser();
  const location = useLocation();

  if (isPending) {
    return <Loader />;
  }

  if (!userInfo) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return children;
};
