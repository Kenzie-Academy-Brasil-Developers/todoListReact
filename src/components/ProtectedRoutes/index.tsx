import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

export const ProtectedRoutes = () => {
  const { loading } = useContext(AuthContext);
 
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Outlet />
  );
};
