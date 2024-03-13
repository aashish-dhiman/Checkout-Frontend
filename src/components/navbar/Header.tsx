"use client";
import React from "react";
import { ModeToggle } from "../ToggleMode";
import { useMerchantData } from "@/hooks/useMerchantData";
import HeaderSkeleton from "../skeleton/HeaderSkeleton";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setTheme } from "@/redux/features/theme-slice";
import { AppDispatch } from "@/redux/store";
import { GetThemeFromStore } from "@/lib/getStoreTheme";

interface Props {}

const Header = (props: Props) => {
    const { data, isError, isLoading, error } = useMerchantData();
    const dispatch = useDispatch<AppDispatch>();
    dispatch(setTheme(data?.theme));

    const theme = GetThemeFromStore();

    if (isLoading) return <HeaderSkeleton />;

    return (
        <div
            style={{
                backgroundColor: theme["--background"],
                color: theme["--primary-foreground"],
            }}
            className="w-full flex items-center justify-between px-7 py-4 lg:px-[100px]"
        >
            <div className="flex items-center gap-2 ">
                <Image
                    src={data?.merchantLogo || "/logo.png"}
                    alt={data?.merchantName || ""}
                    width={60}
                    height={60}
                    className="w-10 h-10 "
                />
                <h1
                    style={{
                        color: theme["--primary-foreground"],
                    }}
                    className="text-lg font-bold"
                >
                    {data?.merchantName}
                </h1>
            </div>
            <ModeToggle />
        </div>
    );
};

export default Header;
