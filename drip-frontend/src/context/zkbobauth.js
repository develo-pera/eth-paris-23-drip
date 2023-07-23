import { createContext, useState, useContext } from "react";

const AuthZKBobContext = createContext();

function AuthZKBobProvider({ children }) {
  const [authZKBob, setAuthZKBob] = useState(null);
  const value = { authZKBob, setAuthZKBob };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthZKBob() {
  const context = useContext(AuthZKBobContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthZKBobProvider, useAuthZKBob };
