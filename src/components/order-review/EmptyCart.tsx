import React from "react";
import cart from "@/assets/cart.png";
import Image from "next/image";
interface Props {}

const EmptyCart = (props: Props) => {
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-[400px] w-full">
            <div>
                <Image
                    src={cart}
                    alt="empty cart"
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px] "
                />
            </div>
            <div className="flex flex-col items-center justify-center text-center mt-2">
                <span className="text-lg font-medium">Your cart is empty</span>
                <p>Looks like you haven&apos;t made your choice yet...</p>
            </div>
        </div>
    );
};

export default EmptyCart;
