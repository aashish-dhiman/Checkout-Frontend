"use client";
import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/order-review/ProductCard";
import Link from "next/link";
import Image from "next/image";
import failed from "@/assets/failed.png";
import success from "@/assets/success.png";
import pending from "@/assets/pending.png";

interface Props {}

export default function Home() {
    const { products, paymentOptions, finalPrice, status, paymentMode } =
        useSelector((state: RootState) => state.order);

    const confirmationMessages: any = {
        success: {
            title: "Payment Successful",
            message:
                "Thank you for your purchase! Your order has been successfully placed.",
        },
        failed: {
            title: "Payment Failed",
            message:
                "Oops! It seems there was an issue processing your payment. Please try again or contact support for assistance.",
        },
        pending: {
            title: "Payment Pending",
            message:
                "Your payment is being processed. Please wait for confirmation or contact support if you have any questions.",
        },
    };

    const { title, message } = confirmationMessages[status] || {};
    const [randomNumber, setRandomNumber] = useState<number>(0);

    useEffect(() => {
        setRandomNumber(Math.round(Math.random() * 1000) + 10801);
    }, []);

    return (
        <section className="py-4 sm:py-8 px-2 md:px-16 relative">
            <div className="w-full px-4 md:px-5 lg:px-6 mx-auto ">
                {title && message && (
                    <div className="dark:invert flex items-center flex-col">
                        <h2 className="font-bold text-3xl sm:text-4xl leading-10 text-black text-center">
                            {title}
                        </h2>
                        <p className="my-4 font-normal text-base sm:leading-8 text-gray-600 text-center">
                            {message}
                        </p>
                    </div>
                )}
                <div className="flex items-center justify-center gap-5 mt-3 mb-6">
                    {status === "failed" && (
                        <Link
                            href="/checkout"
                            className="bg-blue-500 transition-all text-sm ease-in-out duration-200 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                        >
                            Retry Payment
                        </Link>
                    )}

                    <Link
                        href="/"
                        className="bg-blue-500 text-sm transition-all ease-in-out duration-200 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                    >
                        Home
                    </Link>
                </div>

                <div className=" sm:border-2 rounded-lg py-5 max-w-xl mx-auto lg:max-w-full">
                    <div className="flex items-start justify-between sm:px-6">
                        <div className=" w-full">
                            <div className="text-xl font-bold w-full flex gap-3 items-center">
                                <span>Order Summary</span>
                                <Image
                                    src={
                                        status === "success"
                                            ? success
                                            : status === "failed"
                                            ? failed
                                            : pending
                                    }
                                    alt={status}
                                    width={100}
                                    height={100}
                                    className="w-16 h-fit "
                                />
                            </div>
                            <Separator className="my-4" />
                            <div className="flex flex-col justify-center gap-3">
                                <div className="flex items-center justify-between">
                                    <span>Order ID</span>
                                    <span>#{randomNumber}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Payment Mode</span>
                                    <span>{paymentMode}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Amount</span>
                                    <span>${finalPrice}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Status</span>
                                    <span>{status.replace("/", "")}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full sm:px-6">
                        <Separator className="my-4" />
                        <div className="flex flex-col gap-2">
                            {products?.map((product, i) => (
                                <ProductCard product={product} key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
