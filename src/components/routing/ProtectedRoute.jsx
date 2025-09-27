import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const ok = isAuthenticated();
  if (!ok) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
