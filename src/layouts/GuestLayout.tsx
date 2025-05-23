import {Navigate, Outlet} from "react-router";
import {useAuth} from "@/hooks/useAuth.ts";

const GuestLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Outlet/>
    </div>
  );
};

export default GuestLayout;