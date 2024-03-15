import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setPaymentMode, setStatus } from "@/redux/features/data-slice";
import { Input } from "@/components/ui/input";
import { validateUPI } from "@/lib/validator";
import CancelButton from "./CancelButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { UPISchema } from "@/schema/upi";
import SubmitButton from "./SubmitButton";

interface Props {
    setLoading: (loading: boolean) => void;
}

const UpiForm = ({ setLoading }: Props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const randomValue: number = Math.floor(Math.random() * 3) + 1;
    const [upi, setUpi] = useState<string>("");

    const form = useForm<z.infer<typeof UPISchema>>({
        resolver: zodResolver(UPISchema),
        defaultValues: {
            id: "",
        },
    });

    function onSubmit(values: z.infer<typeof UPISchema>) {
        if (!validateUPI(values)) {
            return;
        }
        setLoading(true);

        setTimeout(() => {
            dispatch(setPaymentMode("UPI"));
            //Grabbing the payment status from the possibleTransaction object
            const status = possibleTransaction[randomValue];
            dispatch(setStatus(status));
            router.push("/confirmation");
        }, 3000);
    }

    return (
        <div className="flex items-center w-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                            <>
                                <FormItem className="space-y-1 relative">
                                    <FormLabel>UPI ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="upi"
                                            placeholder="Enter UPI id - xyz@paytm"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs absolute -bottom-5 left-2" />
                                </FormItem>
                            </>
                        )}
                    />
                    <div className="flex items-center justify-center gap-5 w-full">
                        <SubmitButton />
                        <CancelButton />
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default UpiForm;
