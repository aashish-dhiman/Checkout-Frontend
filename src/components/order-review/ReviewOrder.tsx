"use client";
import React, { useEffect } from "react";
import { useOrderDetails } from "@/hooks/useOrderDetail";
import CartSkeleton from "../skeleton/CartSkeleton";
import ProductCard from "./ProductCard";
import TotalCard from "./TotalCard";
import EmptyCart from "./EmptyCart";
import { setPaymentOptions, setProducts } from "@/redux/features/data-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Error from "../states/Error";

interface Props {}
interface product {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

const ReviewOrder = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, isError, isLoading, error } = useOrderDetails();
    // console.log(data);

    useEffect(() => {
        const updateStoreData = (data: {
            products: product[];
            paymentMethods: any[];
        }) => {
            dispatch(setProducts(data.products));
            dispatch(setPaymentOptions(data.paymentMethods));
        };
        if (data) {
            updateStoreData(data);
        }
    }, [data, dispatch]);

    if (isError) return <>{<Error />}</>;
    if (isLoading) return <>{<CartSkeleton />}</>;

    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start w-full">
            <div className="flex-1 w-full md:w-[60%]">
                {data && data?.products?.length > 0 ? (
                    <div className="flex flex-col items-center justify-start gap-2 sm:gap-4 w-full">
                        {data.products.map((product: product) => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full">
                        <EmptyCart />
                    </div>
                )}
            </div>
            {/* Order Total  */}
            <TotalCard data={data || {}} />
        </div>
    );
};

export default ReviewOrder;
