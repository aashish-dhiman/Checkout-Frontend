"use client";
import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import TabbedList from "@/components/checkout/TabbedList";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {}

export default function Home() {
    const { products, paymentOptions, finalPrice } = useSelector(
        (state: RootState) => state.order
    );

    const [secondsRemaining, setSecondsRemaining] = useState(180);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (secondsRemaining > 0) {
                setSecondsRemaining(secondsRemaining - 1);
            } else {
                router.push("/");
                toast("Payment session expired", {
                    description: "Please try again",
                });
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [secondsRemaining, router]);

    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    return (
        <div className=" mx-auto sm:px-5 md:px-16 lg:px-40 w-full sm:pt-5 pb-8">
            <div className="sm:border-2 p-5 sm:p-8 min-h-[500px] rounded-lg flex flex-col">
                <h1 className="text-3xl font-bold mb-4 w-full ">Payment</h1>
                <div className="flex-1">
                    <TabbedList />
                </div>
                <div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between font-bold">
                        <span>Total</span>
                        <span>${finalPrice}</span>
                    </div>
                </div>
                <div className="flex items-center text-sm text-center justify-center font-medium mt-4 text-gray-500">
                    <span>
                        Complete payment in{" "}
                        <span className="text-gray-700 font-medium">
                            {minutes}
                        </span>{" "}
                        minutes{" "}
                        <span className="text-gray-700 font-medium">
                            {seconds}
                        </span>{" "}
                        seconds
                    </span>
                </div>
            </div>
        </div>
    );
}
