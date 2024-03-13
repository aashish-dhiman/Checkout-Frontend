import { Skeleton } from "@/components/ui/skeleton";

interface Props {}

const CartSkeleton = (props: Props) => {
    return (
        <div className="container mx-auto p-2 w-full">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start w-full ">
                <div className="flex-1 w-full md:w-[60%] flex flex-col gap-5">
                    <Skeleton className="w-full h-[70px] rounded-xl" />
                    <Skeleton className="w-full h-[70px] rounded-xl" />
                    <Skeleton className="w-full h-[70px] rounded-xl" />
                </div>
                {/* Order Total  */}
                <div className="w-full md:w-[40%] px-2 mt-5">
                    <Skeleton className="w-full h-[350px] rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default CartSkeleton;
