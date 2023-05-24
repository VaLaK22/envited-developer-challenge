import { useRouter, useSegments } from "expo-router";
import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  authToken: string | null;
  updateAuthToken: (value: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  authToken: null,
  updateAuthToken: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState<string | null>("");
  const segments = useSegments();

  useEffect(() => {
    const isAuthGroup = segments[0] === "(auth)";

    if (!isAuthGroup && !authToken) {
      router.replace("/signin");
    } else if (isAuthGroup && authToken) {
      router.replace("/home");
    }
  }, [segments, authToken]);

  useEffect(() => {
    const getAuthToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        setAuthToken(token);
      }
    };
    getAuthToken();
  }, []);

  const updateAuthToken = async (token: string) => {
    await SecureStore.setItemAsync("token", token);
    setAuthToken(token);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        updateAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
