"use client";

import { z } from "zod";

export interface CardData {
    number: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    name: string;
}

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
            message: "Expiry month must be in digits",
        })
        .refine((val) => parseInt(val, 10) >= 1 && parseInt(val, 10) <= 12, {
            message: "Expiry month should be between 1 - 12",
        }),
    expiryYear: z
        .string()
        .refine((val) => val.length === 4 && /^\d+$/.test(val), {
            message: "Year must be 4 digits",
        })
        .refine((val) => parseInt(val, 10) >= new Date().getFullYear(), {
            message:
                "Expiry year must be greater than or equal to the current year",
        }),
    cvv: z.string().refine((val) => val.length === 3 && /^\d+$/.test(val), {
        message: "CVV must be 3 digits",
    }),
    name: z.string().refine((val) => /^[a-zA-Z]+$/.test(val), {
        message: "Cardholder name should only contain alphabets",
    }),
});
