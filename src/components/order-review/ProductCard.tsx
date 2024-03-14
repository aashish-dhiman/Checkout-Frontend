import Image from "next/image";
import React from "react";

interface Props {
    product: {
        id: number;
        title: string;
        price: number;
        image: string;
        quantity: number;
    };
}

const ProductCard = ({ product }: Props) => {
    return (
        <div className="border p-2 lg:p-4 flex flex-col sm:flex-row gap-4 rounded-md shadow-md w-full ">
            <div className="flex flex-1 gap-5">
                <div className="flex items-center">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={60}
                        height={60}
                        className="w-10 h-10 "
                    />
                </div>
                <div className="flex-1 flex items-center">
                    <p className="text-sm font-medium ">{product.title}</p>
                </div>
            </div>
            <div className="flex flex-row justify-between gap-4 text-sm items-start w-full sm:w-[150px]">
                <p className="text-gray-600 gap-2 sm:gap-1 flex sm:flex-col items-center">
                    <span>Price</span> <span>${product.price}</span>
                </p>
                <p className="text-gray-600 gap-2 sm:gap-1 flex sm:flex-col items-center">
                    <span>Quantity</span> <span>{product.quantity}</span>
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
