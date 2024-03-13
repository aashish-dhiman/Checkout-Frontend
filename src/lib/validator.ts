import { CardData, CardDataSchema } from "@/schema/card";
import { UPIData, UPISchema } from "@/schema/upi";
import { toast } from "sonner";

export const validateUPI = (upi: UPIData) => {
    try {
        UPISchema.parse(upi);
        return true;
    } catch (error) {
        toast("Validation Error!", {
            description: "Please enter valid UPI ID!",
        });
        console.error("Validation error:", error);
        return false;
    }
};

export const validateCardData = (data: CardData) => {
    try {
        CardDataSchema.parse(data);
        return true;
    } catch (error) {
        toast("Validation Error!", {
            description: "Please enter valid card details!",
        });
        console.error("Validation error:", error);
        return false;
    }
};
