import type { NativeBalance } from "@/stores/balances/types";
import { useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useBalancesStore } from "@/stores/balances/useBalancesStore";
import { useAccount } from "wagmi";
import { useChainsStore } from "@/stores/chains/useChainsStore";
import { getPublicClient } from "@/utils/client";

export const useLoadNativeBalances = () => {
    const { address } = useAccount();
    const { chains } = useChainsStore();
    const { setNativeBalances, setLoading } = useBalancesStore();

    const handleFetchNativeBalances = useCallback(async () => {
        if (!address) return [];

        const chainArray = Object.values(chains);

        const nativeBalances = await Promise.all(
            chainArray.map(async (chain) => {
                const client = getPublicClient(Number(chain.id));
                try {
                    const balance = await client.getBalance({
                        address,
                    });
                    return {
                        chainId: Number(chain.id),
                        balance: balance.toString(),
                        symbol: chain.nativeToken,
                        decimals: chain.decimals,
                    };
                } catch (error) {
                    console.error(`Error fetching native balance for chain ${chain.id}:`, error);
                    return {
                        chainId: Number(chain.id),
                        balance: "0",
                        symbol: chain.nativeToken,
                        decimals: chain.decimals,
                    };
                }
            })
        );

        return nativeBalances;
    }, [address, chains]);

    const { data: nativeBalances, isLoading } = useQuery({
        queryKey: ["nativeBalances", address],
        queryFn: handleFetchNativeBalances,
        enabled: !!address,
        refetchInterval: 300_000,
    });

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading, setLoading]);

    useEffect(() => {
        if (nativeBalances) {
            const nativeBalancesRecord = nativeBalances.reduce((acc, { chainId, balance, symbol, decimals }) => {
                acc[chainId] = { balance, symbol, decimals };
                return acc;
            }, {} as Record<number, NativeBalance>);
            setNativeBalances(nativeBalancesRecord);
        }
    }, [nativeBalances, setNativeBalances]);
};