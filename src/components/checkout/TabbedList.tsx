import React, { useState } from "react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setPaymentMode, setStatus } from "@/redux/features/data-slice";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { validateCard, validateUPI } from "@/lib/validator";
import Loading from "../states/Loading";

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
    const dispatch = useDispatch();
    const router = useRouter();
    const randomValue: number = Math.floor(Math.random() * 3) + 1;
    const [upi, setUpi] = useState<string>("");
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

    /**
     * An object representing possible transaction paths.
     * The keys represent the transaction status codes, and the values represent the corresponding paths.
     */
    const possibleTransaction: { [key: number]: string } = {
        1: "/success",
        2: "/pending",
        3: "/failed",
    };

    /**
     * Handles the selection of a payment option.
     *
     * @param option - The selected payment option.
     */
    const handlePaymentOptionSelect = (option: string) => {
        let isValid = false;

        if (option === "UPI") {
            isValid = validateUPI(upi);
        } else if (option === "CARDS") {
            isValid = validateCard(cardData);
        }

        if (isValid) {
            setLoading(true);

            setTimeout(() => {
                dispatch(setPaymentMode(option));
                const status = possibleTransaction[randomValue];
                dispatch(setStatus(status));
                router.push(status);
            }, 3000);
        }
    };

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
                                <div className="flex items-center w-full">
                                    <Input
                                        id="upi"
                                        placeholder="Enter UPI id - xyz@paytm"
                                        onChange={(e) => {
                                            setUpi(e.target.value);
                                        }}
                                    />
                                </div>
                                <Button
                                    className="px-10 mb-2"
                                    onClick={() =>
                                        handlePaymentOptionSelect("UPI")
                                    }
                                >
                                    Pay Securely
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="CARDS">
                        <Card>
                            <CardContent className="space-y-2 mt-4">
                                <div className="space-y-1">
                                    <Label htmlFor="number">Card Number</Label>
                                    <Input
                                        id="number"
                                        type="text"
                                        placeholder="Enter card number"
                                        maxLength={16}
                                        minLength={16}
                                        onChange={(e) => {
                                            setCardData({
                                                ...cardData,
                                                number: parseInt(
                                                    e.target.value
                                                ),
                                            });
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-5 items-start justify-between w-full">
                                    <div className="flex gap-3 md:w-1/3">
                                        <div className="space-y-1">
                                            <Label htmlFor="expiry">
                                                Expiry Month
                                            </Label>
                                            <Input
                                                id="expiry"
                                                type="text"
                                                placeholder="MM"
                                                maxLength={2}
                                                minLength={2}
                                                onChange={(e) => {
                                                    setCardData({
                                                        ...cardData,
                                                        expiryMonth: parseInt(
                                                            e.target.value
                                                        ),
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="expiry">
                                                Expiry Year
                                            </Label>
                                            <Input
                                                id="expiry"
                                                type="text"
                                                placeholder="YYYY"
                                                maxLength={4}
                                                minLength={4}
                                                onChange={(e) => {
                                                    setCardData({
                                                        ...cardData,
                                                        expiryYear: parseInt(
                                                            e.target.value
                                                        ),
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1 sm:w-1/4">
                                        <Label htmlFor="cvv">CVV</Label>
                                        <Input
                                            id="cvv"
                                            type="password"
                                            placeholder="Enter CVV"
                                            maxLength={3}
                                            minLength={3}
                                            onChange={(e) => {
                                                setCardData({
                                                    ...cardData,
                                                    cvv: parseInt(
                                                        e.target.value
                                                    ),
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="name">
                                        Cardholder Name
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter cardholder name"
                                        onChange={(e) => {
                                            setCardData({
                                                ...cardData,
                                                name: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-center pt-5">
                                    <Button
                                        className="px-10 mb-2"
                                        onClick={() =>
                                            handlePaymentOptionSelect("CARDS")
                                        }
                                    >
                                        Pay Securely
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
};

export default TabbedList;
