import { toast } from "sonner";

export const validateUPI = (upi: string) => {
    const upiPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+$/;
    if (!upi || upi.length === 0 || !upiPattern.test(upi)) {
        toast("Please enter a valid UPI ID!");
        return false;
    }
    return true;
};

export const validateCard = (cardData: {
    number: number;
    expiryMonth: number;
    expiryYear: number;
    cvv: number;
    name: string;
}) => {
    if (cardData.number.toString().length !== 16) {
        toast("Please Check Card Number!");
        return false;
    } else if (
        !cardData.expiryMonth ||
        isNaN(cardData.expiryMonth) ||
        cardData.expiryMonth < 1 ||
        cardData.expiryMonth > 12
    ) {
        toast("Please Check Card Expiry Month!");
        return false;
    } else if (
        !cardData.expiryYear ||
        isNaN(cardData.expiryYear) ||
        cardData.expiryYear < new Date().getFullYear()
    ) {
        toast("Please Check Card Expiry Year!");
        return false;
    } else if (cardData.cvv.toString().length !== 3 || isNaN(cardData.cvv)) {
        toast("Please Check CVV!");
        return false;
    } else if (
        cardData.name.length === 0 ||
        !cardData.name.match(/^[a-zA-Z ]*$/)
    ) {
        toast("Please check Card Holder's Name!");
        return false;
    }
    return true;
};
