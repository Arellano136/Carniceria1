import { useEffect, useReducer } from "react";
import { authManager } from "./config/context/auth-manager";
import "./output.css";
import "animate.css";
import AuthContext from "./config/context/auth-context";
import AppRouter from "./router/AppRouter";
import React from 'react';
import './index.css';
const init = () => {
  return JSON.parse(localStorage.getItem("user")) || { signed: true }; // Cambiamos el valor de signed a true
};

function App() {
  const [user, dispatch] = useReducer(authManager, {}, init);
  
  useEffect(() => {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  
  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
