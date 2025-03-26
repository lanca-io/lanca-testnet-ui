import { useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFormStore } from "@/stores/form/useFormStore";
import { getPublicClient } from "@/utils/client";
import { formatEther } from "viem";
import { format } from "@/utils/format";

const ESTIMATED_GAS_COST = 510_000n;

const fetchGasEstimate = async (sourceChainId: number) => {
    const client = getPublicClient(sourceChainId);
    const price = await client.getGasPrice();
    const cost = BigInt(price) * ESTIMATED_GAS_COST;
    const formattedCost = formatEther(cost);
    return format(Number(formattedCost), 4);
};

export const useEstimateGas = () => {
    const { sourceChain } = useFormStore();

    const handleFetchGasEstimate = useCallback(async () => {
        if (!sourceChain) {
            return '0';
        }
        return await fetchGasEstimate(Number(sourceChain.id));
    }, [sourceChain]);

    const { data: gas, isLoading, refetch } = useQuery({
        queryKey: ["gasEstimate", sourceChain?.id],
        queryFn: handleFetchGasEstimate,
        enabled: !!sourceChain,
        refetchInterval: 60000,
    });

    useEffect(() => {
        if (sourceChain) {
            refetch();
        }
    }, [sourceChain, refetch]);

    return { gas, isLoading };
};