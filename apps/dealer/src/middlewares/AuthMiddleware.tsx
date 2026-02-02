import { type FC, type PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/services/auth";
import NProgress from "nprogress";

const AuthMiddleware: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, status } = useProfile();

  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      navigate("/login", { replace: true });
    }
  }, [isError, isLoading, data, error, status, navigate]);

  if (isLoading) {
    return <div className="min-h-screen w-full bg-white" />;
  }

  if (isError || !data) {
    return null;
  }

  return <>{children}</>;
};

export { AuthMiddleware };
