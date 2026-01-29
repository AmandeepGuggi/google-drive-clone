import { FaSpinner } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProtectedRoute = ({ children }) => {
  const { user, getUser, loading } = useAuth();
  useEffect( () => {
    if (!user) {
       getUser()
    }
  }, [user]);
   if (loading) return <div>Loading...</div>;

  if (loading) return <FaSpinner />;
  if (!user) return <Navigate to="/" />;
  // if (user) return <Navigate to="/app" />;

  return children;
};
