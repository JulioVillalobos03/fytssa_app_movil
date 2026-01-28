import { createContext, useContext, useEffect, useState } from "react";
import { getToken, getUser, clearSession } from "../services/storage.service";


type AuthContextType = {
    loading: boolean;
    authenticated: boolean;
    refreshSession: () => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    async function refreshSession() {
        try {
            const token = await getToken();
            const user = await getUser();

            setAuthenticated(!!token && !!user);

        } catch (err) {
            setAuthenticated(false);
        }
    }


    async function logout() {
        await clearSession();
        setAuthenticated(false);
    }

    useEffect(() => {
        (async () => {
            await refreshSession();
            setLoading(false);
        })();
    }, []);

    return (
        <AuthContext.Provider
            value={{ loading, authenticated, refreshSession, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
