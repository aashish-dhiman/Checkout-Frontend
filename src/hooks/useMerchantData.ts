import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCompanyInfo = (symbol: string) => {
    const URL =
        "https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata";
    return useQuery({
        queryKey: ["Order", symbol],
        queryFn: async () => {
            const { data } = await axios.get(URL);
            return data;
        },
    });
};
