"use client";
import { calculateTotal } from "@/lib/calculateTotal";
import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
    setProducts,
    setPaymentOptions,
    setFinalPrice,
} from "@/redux/features/data-slice";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";

interface Props {
    data: {
        products: any[];
        paymentMethods: any[];
    };
}

const TotalCard = ({ data }: Props) => {
    const products = data?.products;
    const paymentOption = data?.paymentMethods;
    const [discount, setDiscount] = useState(0);
    const [coupon, setCoupon] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const totalAmount = calculateTotal(products);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleApplyDiscount = (e: any) => {
        if (coupon.toLowerCase() === "groww") {
            setDiscount(0.1);
            setCoupon("");
            setShowWarning(false);
        } else {
            setDiscount(0);
            setShowWarning(true);
        }
    };

    const handleProceed = () => {
        dispatch(setFinalPrice((totalAmount * (1 - discount)).toFixed(2)));
        router.push("/checkout");
    };

    return (
        <div className="flex flex-col items-center text-white dark:bg-transparent justify-between bg-gray-950 w-full md:w-[40%] rounded-lg p-5 min-h-[370px] relative top-0 dark:border">
            <div className="w-full flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-bold">Cart Total</h3>
                <div className="flex items-center justify-between mt-4">
                    <span>Subtotal</span>
                    <span>${calculateTotal(products)}</span>
                </div>
                <div>
                    <div className="flex gap-2 sm:gap-4 mt-4 relative">
                        <Input
                            type="email"
                            placeholder="Try 'GROWW' to get 10% discount"
                            onChange={(e) => {
                                setCoupon(e.target.value);
                                setShowWarning(false);
                            }}
                            className="text-white bg-transparent ring-0 "
                        />

                        <Button
                            onClick={handleApplyDiscount}
                            variant="outline"
                            className="bg-transparent"
                            disabled={
                                totalAmount == 0
                                    ? true
                                    : coupon.length === 0
                                    ? true
                                    : false
                            }
                        >
                            Apply
                        </Button>
                        {showWarning && (
                            <p className="text-red-500 -bottom-5 left-1 text-xs mt-2 absolute">
                                Invalid coupon code. Please try again.
                            </p>
                        )}
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <span>Discount</span>
                        <span>${(totalAmount * discount).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <span>Delivery</span>
                        <span>$0.00</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                        <span>Total</span>
                        <span>
                            ${(totalAmount * (1 - discount)).toFixed(2)}
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full">
                    <button
                        className="bg-blue-500 transition-all ease-in-out duration-200 mx-auto disabled:cursor-not-allowed text-white px-4 py-2 mt-6 rounded-md shadow-md hover:bg-blue-600"
                        onClick={handleProceed}
                        disabled={totalAmount == 0}
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TotalCard;
