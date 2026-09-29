import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@/modules/auth/hooks/useUser";
import { Loader } from "@/shared/ui/Loader";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
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
