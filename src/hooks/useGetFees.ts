import type { Address } from "viem";
import { useAccount } from "wagmi";
import { zeroAddress } from "viem";
import { useFormStore } from "@/stores/form/useFormStore";
import { getPublicClient } from "@/utils/client";
import { useQuery } from "@tanstack/react-query";
import { ConceroABI } from "@/assets/abi/ConceroABI";
import { ContractAddresses } from "@/configuration/addresses";

export const useGetFees = () => {
    const { address } = useAccount();
    const { sourceChain, destinationChain, fromAmount } = useFormStore();

    const fetchFee = async () => {
        if (!sourceChain || !destinationChain || !fromAmount) {
            return BigInt(0);
        }

        const client = getPublicClient(Number(sourceChain.id));
        const contractAddress = ContractAddresses[sourceChain.id];

        const dstChainSelector = destinationChain.selector;
        const rawAmount = Number(fromAmount) * 10 ** 18;

        const fee = await client.readContract({
            address: contractAddress as Address,
            abi: ConceroABI,
            functionName: "getFee",
            args: [dstChainSelector, BigInt(rawAmount), zeroAddress, 1000000],
        });

        return fee;
    };

    const { data: fee, isLoading, error } = useQuery({
        queryKey: ["getFee", sourceChain?.id, destinationChain?.id, fromAmount],
        queryFn: fetchFee,
        enabled: !!sourceChain && !!destinationChain && !!fromAmount && !!address,
    });

    return { fee, isLoading, error };
};