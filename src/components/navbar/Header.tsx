"use client";
import React from "react";
import { ModeToggle } from "../ToggleMode";
import { useMerchantData } from "@/hooks/useMerchantData";
import HeaderSkeleton from "../skeleton/HeaderSkeleton";
import Image from "next/image";

interface Props {}

const Header = (props: Props) => {
    const { data, isError, isLoading, error } = useMerchantData();

    if (isLoading) return <HeaderSkeleton />;

    return (
        <div className="fixed top-0 backdrop-blur w-full z-50 flex border-b-2 items-center justify-between px-3 sm:px-7 py-4 lg:px-[100px]">
            <div className="flex items-center gap-2 ">
                <Image
                    src={data?.merchantLogo || "/logo.png"}
                    alt={data?.merchantName || ""}
                    width={60}
                    height={60}
                    className="w-10 h-10 "
                />
                <h1 className="text-lg font-bold">{data?.merchantName}</h1>
            </div>
            <ModeToggle />
        </div>
    );
};

export default Header;
