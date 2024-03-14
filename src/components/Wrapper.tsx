"use client";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "@/redux/features/theme-slice";
import { AppDispatch } from "@/redux/store";
import { GetThemeFromStore } from "@/lib/getStoreTheme";
import { useMerchantData } from "@/hooks/useMerchantData";

interface Props {}

const Wrapper = ({ children }: { children: ReactNode }) => {
    const { data, isError, isLoading, error } = useMerchantData();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (data) {
            dispatch(setTheme(data.theme));
        }
    }, [data, dispatch]);

    const theme = GetThemeFromStore();

    const themeColor =
        typeof window !== "undefined"
            ? localStorage.getItem("theme") || "light"
            : "light";
    return (
        <div
            style={{
                backgroundColor:
                    themeColor === "dark" && theme
                        ? theme["--background"]
                        : undefined,
                color:
                    themeColor === "dark" && theme
                        ? theme["--primary-foreground"]
                        : undefined,
            }}
        >
            {children}
        </div>
    );
};

export default Wrapper;
