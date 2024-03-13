import React from "react";

interface Props {}

const Error = (props: Props) => {
    return (
        <div className="text-center">
            <h1 className="mb-4 text-4xl font-semibold text-red-500">
                No Data Available
            </h1>
            <p className="mb-4 text-lg text-gray-600">
                Oops! There&apos;s some error in fetching data.
            </p>
            <div className="animate-bounce">
                <svg
                    className="mx-auto h-16 w-16 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                </svg>
            </div>
        </div>
    );
};

export default Error;
