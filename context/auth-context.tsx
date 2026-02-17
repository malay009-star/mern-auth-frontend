"use client";
import { createContext, useState } from "react";
import { logoutUser } from "../lib/auth-api";
import { setAccessToken } from "../lib/axios";
import { useRouter } from "next/navigation";

type AuthContextType = {
    user: unknown | null;
    setUser: React.Dispatch<React.SetStateAction<unknown | null>>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<unknown | null>(null);
    const router = useRouter();
    const logout = async () => {
        await logoutUser();
        router.push("/login");
        setUser(null);
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
