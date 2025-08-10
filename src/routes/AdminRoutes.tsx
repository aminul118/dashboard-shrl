import type { IChildren } from "@/types";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const AdminRoutes = ({ children }: IChildren) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Query to check if the user is authenticated
  const { data, isLoading, isError } = useUserInfoQuery(undefined);

  useEffect(() => {
    if (!isLoading) {
      // Not logged in
      if (isError || !data?.data) {
        navigate("/login", { state: { from: location.pathname } });
        return;
      }

      // Not admin
      if (data?.data?.role !== "ADMIN") {
        toast.error("You are not Admin");
        navigate("/login", { state: { from: location.pathname } });
        return;
      }
    }
  }, [isLoading, isError, data, navigate, location.pathname]);

  // Show loading state
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Authenticated & admin
  return <>{children}</>;
};

export default AdminRoutes;
