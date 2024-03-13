"use client";

import { z } from "zod";

export interface UPIData {
    id: string;
}

export const UPISchema = z.object({
    id: z.string().refine((val) => /^[a-zA-Z0-9]+@[a-zA-Z]+$/.test(val), {
        message: "Invalid UPI ID!",
    }),
});
