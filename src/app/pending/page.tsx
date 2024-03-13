"use client";
import React, { useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import pending from "@/assets/pending.png";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface Props {}

export default function Home() {
    const { products, paymentOptions, finalPrice, status, paymentMode } =
        useSelector((state: RootState) => state.order);
    return (
        <div className="px-2 mx-auto w-full flex items-center justify-center py-6">
            <div className="rounded-lg w-[420px] sm:border-2 px-4 py-6 overflow-hidden ">
                <div className="flex items-center justify-center">
                    <Image src={pending} alt="failed" />
                </div>
                <div className="text-lg font-semibold flex items-center justify-center ">
                    <h3>Transaction Pending !</h3>
                    <p></p>
                </div>
                <div className=" px-1">
                    <div className="flex items-center justify-between mt-6">
                        <span>Payment Mode</span>
                        <span>{paymentMode}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                        <span>Amount</span>
                        <span>${finalPrice}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                        <span>Status</span>
                        <span>{status.replace("/", "")}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-around mt-5 gap-4">
                    <Link
                        href="/"
                        className="bg-blue-500 text-sm transition-all ease-in-out duration-200 mx-auto disabled:cursor-not-allowed text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
