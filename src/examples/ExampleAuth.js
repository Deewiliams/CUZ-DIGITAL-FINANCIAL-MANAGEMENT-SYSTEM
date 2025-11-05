// Example of how to use the useAuth hook in any component
import React from "react";
import { useAuth } from "../contexts/AuthContext";

export const ExampleComponent = () => {
  const {
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    getToken,
    checkAuth,
  } = useAuth();

  // Example usage:

  // Check if user is authenticated
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  // Get the current token
  const currentToken = getToken();

  // Example login (you would typically get this token from your API)
  const handleExampleLogin = () => {
    const exampleToken = "your-jwt-token-here";
    login(exampleToken);
  };

  // Example logout
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h2>Authentication Status</h2>
      <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
      <p>Token: {token ? "Present" : "None"}</p>
      <p>Current Token: {currentToken}</p>

      <button onClick={handleExampleLogin}>Login (Example)</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
