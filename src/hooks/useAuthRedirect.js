import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Custom hook for automatic redirection based on authentication
export const useAuthRedirect = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        // User is authenticated, redirect to dashboard
        navigate("/overview", { replace: true });
      } else {
        // User is not authenticated, redirect to login
        navigate("/login", { replace: true });
      }
    }
  }, [isAuthenticated, loading, navigate]);

  return { isAuthenticated, loading };
};

// Hook to redirect authenticated users to dashboard
export const useRedirectIfAuthenticated = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/overview", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  return { isAuthenticated, loading };
};

// Hook to redirect unauthenticated users to login
export const useRedirectIfNotAuthenticated = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  return { isAuthenticated, loading };
};
