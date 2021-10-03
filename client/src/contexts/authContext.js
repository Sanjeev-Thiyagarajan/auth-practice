import React, { context, createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import appService, { setToken } from "../services/appService";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [auth, setAuth] = useState({
    // token: null,
    isAuthenticated: false,
    user: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const verifyAuthStatus = async () => {
    try {
      const results = await appService.get("/users/profile");
      const { user } = results.data;

      setAuth({
        //   token,
        // expiresAt,
        user,
        isAuthenticated: true,
      });

      //   setAuth(Object.assign({}, auth, {user, isAuthenticated: true}))
    } catch (err) {
      if (err.response.status === 401) {
        setAuth({ user: null, isAuthenticated: false });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAuthStatus();
  }, []);

  const updateAuth = (user) => {
    setAuth({
      isAuthenticated: true,
      user,
    });
  };
  const isAuthenticated = () => {
    // if (!auth.user || !auth.isAuthenticated) {
    //   return false;
    // }
    return auth.isAuthenticated;
  };

  const clearAuth = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
  };

  const logout = async () => {
    try {
      const results = await appService.post("/users/logout");
      setAuth({
        isAuthenticated: false,
        user: null,
      });
      history.push("/");
    } catch (err) {}
  };

  const login = async (username, password) => {
    try {
      const res = await appService.post("/users/login", {
        username,
        password,
      });

      const { user } = res.data;
      updateAuth(user);
      history.push("/posts");
    } catch (err) {}
  };
  return (
    <authContext.Provider
      value={{
        auth,
        updateAuth,
        isAuthenticated,
        logout,
        login,
        loading,
        clearAuth,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
