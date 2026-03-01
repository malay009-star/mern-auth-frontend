"use client";
import { createContext, useEffect, useState } from "react";
import { getProfile, logoutUser } from "../lib/auth-api";
import { setAccessToken } from "../lib/axios";
import { useRouter } from "next/navigation";
import { IUserProfile } from "@/types/user.types";

export const AuthContext = createContext<unknown | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUserProfile | null>(null);
    const [profile, setProfile] = useState<IUserProfile | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await getProfile();
                if (data.success) {
                    setProfile(data.user);
                } else {
                    setProfile(null);
                }
            } catch {
                setProfile(null);
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
        setProfile(null);
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{ profile, setProfile, user, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
