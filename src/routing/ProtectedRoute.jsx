import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

  const isLoggedIn = localStorage.getItem("userToken");
  // check if user is logged in by checking token which is stored in localStorage
  if (isLoggedIn!==null) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
  
};

export default ProtectedRoute;
