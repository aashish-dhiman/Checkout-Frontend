import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setPaymentMode, setStatus } from "@/redux/features/data-slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
            //Grabbing the payment status from the possibleTransaction object
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
                            <FormItem className="space-y-1 relative">
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
                                <FormMessage className="text-xs absolute -bottom-5 left-2" />
                            </FormItem>
                        </>
                    )}
                />
                <div className="flex flex-col sm:flex-row gap-10 sm:gap-5 items-start justify-between w-full">
                    <div className="flex gap-3 md:w-1/2">
                        <FormField
                            control={form.control}
                            name="expiryMonth"
                            render={({ field }) => (
                                <FormItem className="space-y-1 relative">
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
                                    <FormMessage className="text-xs absolute -bottom-9 sm:-bottom-5 left-2" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="expiryYear"
                            render={({ field }) => (
                                <FormItem className="space-y-1 relative">
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
                                    <FormMessage className="text-xs absolute -bottom-9 sm:-bottom-5 left-2" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-1 sm:w-1/3 ">
                        <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                                <FormItem className="space-y-1 relative">
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
                                    <FormMessage className="text-xs absolute -bottom-5 left-2" />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="space-y-1 relative mt-2">
                            <FormLabel>Cardholder Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter cardholder name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs absolute -bottom-5 left-2" />
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
