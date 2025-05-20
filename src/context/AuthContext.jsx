// // src/context/AuthContext.jsx
// import React, { createContext, useState, useEffect } from "react";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(   null);
//   const [loading, setLoading] = useState(true);
//   const auth = getAuth();

//   useEffect(() => {
//     // Listen for auth state changes, remember user
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     return unsubscribe; // cleanup subscription
//   }, [auth]);

//   const logout = () => signOut(auth);

//   return (
//     <AuthContext.Provider value={{ currentUser, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export  const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

