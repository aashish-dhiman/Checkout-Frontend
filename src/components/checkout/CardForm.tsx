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
import { possibleTransaction } from "@/lib/constants";

interface Props {
    setLoading: (loading: boolean) => void;
}

const CardForm = ({ setLoading }: Props) => {
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof CardDataSchema>>({
        resolver: zodResolver(CardDataSchema),
        defaultValues: {
            number: "",
            expiryMonth: "",
            expiryYear: "",
            cvv: "",
            name: "",
        },
    });
    const router = useRouter();

    const randomValue: number = Math.floor(Math.random() * 3) + 1;

    function onSubmit(values: z.infer<typeof CardDataSchema>) {
        if (!validateCardData(values)) {
            return;
        }
        setLoading(true);

        setTimeout(() => {
            dispatch(setPaymentMode("CARDS"));
            const status = possibleTransaction[randomValue];
            dispatch(setStatus(status));
            router.push(status);
        }, 3000);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                        <>
                            <FormItem className="space-y-1">
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter card number"
                                        maxLength={16}
                                        minLength={16}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        </>
                    )}
                />
                <div className="flex flex-col sm:flex-row gap-5 items-start justify-between w-full">
                    <div className="flex gap-3 md:w-1/3">
                        <FormField
                            control={form.control}
                            name="expiryMonth"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-sm">
                                        Expiry Month
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="MM"
                                            maxLength={2}
                                            minLength={1}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="expiryYear"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Expiry Year</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="YYYY"
                                            maxLength={4}
                                            minLength={4}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-1 sm:w-1/4">
                        <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>CVV</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter CVV"
                                            maxLength={3}
                                            minLength={3}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Cardholder Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter cardholder name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-center gap-5">
                    <Button className="px-10 mb-2" type="submit">
                        Pay Securely
                    </Button>
                    <CancelButton />
                </div>
            </form>
        </Form>
    );
};

export default CardForm;
