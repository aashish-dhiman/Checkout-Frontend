"use client";
import { z } from "zod";


export const CardDataSchema = z.object({
    number: z
        .string()
        .refine((val) => val.length === 16, {
            message: "Card number must be 16 digits",
        })
        .refine((val) => /^\d+$/.test(val), {
            message: "Card number must contain only digits",
        }),
    expiryMonth: z
        .string()
        .refine((val) => /^\d+$/.test(val), {
            message: "Only digits are allowed",
        })
        .refine((val) => parseInt(val) >= 1 && parseInt(val) <= 12, {
            message: "Please choose (1-12)",
        }),
    expiryYear: z
        .string()
        .refine((val) => val.length === 4 && /^\d+$/.test(val), {
            message: "Year must be 4 digits",
        })
        .refine((val) => parseInt(val) >= new Date().getFullYear(), {
            message: "Card is expired",
        }),
    cvv: z.string().refine((val) => val.length === 3 && /^\d+$/.test(val), {
        message: "CVV must be 3 digits",
    }),
    name: z.string().refine((val) => /^[a-zA-Z\s]+$/.test(val), {
        message: "Only alphabets are allowed",
    }),
});
