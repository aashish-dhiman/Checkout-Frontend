import React from "react";
import { Skeleton } from "../ui/skeleton";

interface Props {}

const HeaderSkeleton = (props: Props) => {
    return (
        <div className="w-full flex items-center justify-between px-7 sm:px-4 py-4">
            <div className="flex items-center gap-3">
                <Skeleton className="w-[40px] h-[40px] rounded-full" />
                <Skeleton className="w-[80px] h-[30px] rounded-xl" />
            </div>
            <Skeleton className="w-[40px] h-[40px] rounded-xl" />
        </div>
    );
};

export default HeaderSkeleton;
