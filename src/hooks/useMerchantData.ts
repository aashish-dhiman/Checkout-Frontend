import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMerchantData = () => {
    const URL =
        "https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata";
    return useQuery({
        queryKey: ["Merchant"],
        queryFn: async () => {
            const { data } = await axios.get(URL);
            return data;
        },
        //caching for 10 minutes
        staleTime: 10 * 1000 * 60,
    });
};
