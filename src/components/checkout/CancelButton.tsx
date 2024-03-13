import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {}

const CancelButton = (props: Props) => {
    const router = useRouter();

    const handlePaymentCancel = () => {
        toast("Transaction Cancelled !");
        router.push("/");
    };

    return (
        <div>
            <Button
                variant="destructive"
                className="px-4 mb-2"
                onClick={handlePaymentCancel}
            >
                Cancel Transaction
            </Button>
        </div>
    );
};

export default CancelButton;
