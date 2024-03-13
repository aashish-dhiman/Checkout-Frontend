import React from "react";

interface Props {}

const Loading = (props: Props) => {
    return (
        <div className="flex items-center justify-center flex-col gap-4 w-full h-full mt-[120px]">
            <div className="flex space-x-2 justify-center items-center bg-white dark:invert">
                <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-4 w-4 bg-black rounded-full animate-bounce"></div>
            </div>
            <div className="text-base ">Initiating Payment...</div>
        </div>
    );
};

export default Loading;
