import React from "react";
import { Button } from "../ui/button";
import { Lock } from "lucide-react";

interface Props {}

const SubmitButton = (props: Props) => {
    return (
        <Button
            className="px-6 mb-2 bg-blue-500 transition-all ease-in-out duration-200 hover:bg-blue-600"
            type="submit"
        >
            <Lock className="scale-[0.7] mr-2" />
            Pay Securely
        </Button>
    );
};

export default SubmitButton;
