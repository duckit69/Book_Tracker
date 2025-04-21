import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

interface AuthContextType {
  accessToken: string | null;
  isInitializing: boolean;
  setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log("Attempting refresh...");
        const response = await fetch("https://localhost:3000/refresh", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Refresh response:", response);
        const data = await response.json();
        setAccessToken(data.accessToken);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Refresh failed:", error);
          setAccessToken(null);
        }
      } finally {
        setIsInitializing(false);
        // if (!abortController.signal.aborted) {
        //   setIsInitializing(false);
        // }
      }
    };

    initializeAuth();

    // return () => {
    //   abortController.abort(); // Cancel request on unmount
    // };
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, isInitializing }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
