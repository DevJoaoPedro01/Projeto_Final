import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica se o token está presente no localStorage
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); // Define true se o token estiver presente
  }, []);

  return isAuthenticated;
};

export default useAuth;
