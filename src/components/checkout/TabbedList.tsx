import React, { useState } from "react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setPaymentMode, setStatus } from "@/redux/features/data-slice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { validateCardData, validateUPI } from "@/lib/validator";
import Loading from "../states/Loading";
import CancelButton from "./CancelButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CardDataSchema } from "@/schema/card";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import CardForm from "./CardForm";
import UpiForm from "./UpiForm";

interface Props {}

/**
 * Renders a tabbed list component for checkout.
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const TabbedList = (props: Props) => {
    const { products, paymentOptions, finalPrice } = useSelector(
        (state: RootState) => state.dataReducer
    );

    const [cardData, setCardData] = useState<{
        number: number;
        expiryMonth: number;
        expiryYear: number;
        cvv: number;
        name: string;
    }>({
        number: 0,
        expiryMonth: 0,
        expiryYear: 0,
        cvv: 0,
        name: "",
    });
    const [loading, setLoading] = useState<boolean>(false);   

 
    return (
        <div className="flex flex-col gap-4 justify-between items-start w-full pt-4">
            {loading ? (
                <Loading />
            ) : (
                <Tabs defaultValue="UPI" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="UPI">UPI</TabsTrigger>
                        <TabsTrigger value="CARDS">CARDS</TabsTrigger>
                    </TabsList>
                    <TabsContent value="UPI">
                        <Card className="flex items-center justify-center">
                            <CardContent className="space-y-2 flex flex-col w-full items-center gap-5 justify-between mt-4">
                                <UpiForm setLoading={setLoading} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="CARDS">
                        <Card>
                            <CardContent className="space-y-2 mt-4">
                                <CardForm setLoading={setLoading} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
};

export default TabbedList;
