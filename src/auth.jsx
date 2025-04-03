import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import app from "./firebase";

const AuthContext = createContext();
const auth = getAuth(app);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Überwacht den Auth-Status (auch nach einem Reload)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    setUser(auth.currentUser);
  };

  const register = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    setUser(auth.currentUser);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {!loading && children} {/* Verhindert das Rendern der App, bis Firebase geladen hat */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
