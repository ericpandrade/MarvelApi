import React, { createContext, useContext, useEffect, useState } from "react";
import { firebase, auth } from "../services/firebase";
import usePersistedState from "../utils/persistedState";

interface AuthContextProps {
  user: AuthDataProps;
  signInWithGoogle: () => void;
  routeState: boolean;
  setRouteState: (bool: boolean) => void;
  username: string;
  setUsername: (string: string) => void;
}

interface Props {
  children: React.ReactNode;
}

interface AuthDataProps {
  name: string;
  id: string;
  avatar: string;
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState({} as AuthDataProps);
  const [routeState, setRouteState] = useState(false);
  const [username, setUsername] = usePersistedState("@username/Context", "");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({ id: uid, name: displayName, avatar: photoURL });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({ id: uid, name: displayName, avatar: photoURL });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        routeState,
        setRouteState,
        username,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuthContext() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuthContext };
