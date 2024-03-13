"use client";
import React, { useEffect } from "react";
import { ModeToggle } from "../ToggleMode";
import { useMerchantData } from "@/hooks/useMerchantData";
import HeaderSkeleton from "../skeleton/HeaderSkeleton";
import Image from "next/image";

interface Props {}

const Header = (props: Props) => {
    const { data, isError, isLoading, error } = useMerchantData();

    if (isLoading) return <HeaderSkeleton />;

    return (
        <div className="w-full flex items-center justify-between px-7 py-4 md:px-4">
            <div className="flex items-center gap-2">
                <Image
                    src={data?.merchantLogo || "logo.png"}
                    alt={data?.merchantName}
                    width={60}
                    height={60}
                    className="w-10 h-10 "
                />
                <h1 className="text-lg font-bold text-gray-700">
                    {data?.merchantName}
                </h1>
            </div>
            <ModeToggle />
        </div>
    );
};

export default Header;
