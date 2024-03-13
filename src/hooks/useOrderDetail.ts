import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useOrderDetails = () => {
    const URL =
        "https://groww-intern-assignment.vercel.app/v1/api/order-details";
    return useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const { data } = await axios.get(URL);
            return data;
        },
        //caching for 5 seconds
        staleTime: 5 * 1000,
    });
};
