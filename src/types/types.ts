export interface CardData {
    number: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    name: string;
}

export interface UPIData {
    id: string;
}

export interface OrderDetail {
    products: any[];
    paymentOptions: any[];
    finalPrice: number;
    status: "success" | "failed" | "pending" | "";
    paymentMode: "CARD" | "UPI" | "";
}

export interface ThemeState {
    theme: {
        "--background": string;
        "--foreground": string;
        "--primary": string;
        "--primary-foreground": string;
    };
}
