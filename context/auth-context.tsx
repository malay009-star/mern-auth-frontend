"use client";
import { createContext, useEffect, useState } from "react";
import { getProfile, logoutUser } from "../lib/auth-api";
import { setAccessToken } from "../lib/axios";
import { useRouter } from "next/navigation";

type AuthContextType = {
    user: unknown | null;
    setUser: React.Dispatch<React.SetStateAction<unknown | null>>;
    logout: () => Promise<void>;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<unknown | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await getProfile();
                if (data.success) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        await logoutUser();
        router.push("/");
        setUser(null);
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
