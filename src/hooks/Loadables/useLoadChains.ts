import type { ConceroChain } from "@/stores/chains/types";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useChainsStore } from "@/stores/chains/useChainsStore";
import { fetchChainConfiguration } from "@/utils/chains";

export const useLoadChains = () => {
  const { setChains, setLoading } = useChainsStore();

  const fetchChains = async (): Promise<ConceroChain[]> => {
    const response = await fetchChainConfiguration().then((res) => res.payload.items);
    return response
      .map((item: { chain: any; deployments: any[] }) => {
        const usdc_e = item.deployments.find((d: any) => d.type === 'usdc_e')?.address;
        const bridge_lbf = item.deployments.find((d: any) => d.type === 'bridge_lbf')?.address;
        const rpcs = Array.isArray(item.chain.rpcs) ? item.chain.rpcs.filter((rpc: string) => !!rpc) : [];

        if (!usdc_e || !bridge_lbf || rpcs.length === 0) {
          return null;
        }

        return {
          id: Number(item.chain.id),
          name: item.chain.name,
          selector: item.chain.concero_selector ? BigInt(item.chain.concero_selector) : 0n,
          logo: item.chain.logo || '',
          nativeCurrency: {
            name: item.chain.native_currency_name,
            symbol: item.chain.native_currency_symbol,
            decimals: item.chain.native_currency_decimals,
          },
          rpcUrls: {
            default: {
              http: rpcs,
            },
          },
          explorer: item.chain.explorer,
          testnet: item.chain.is_testnet,
          contracts: {
            usdc_e,
            bridge_lbf,
          },
        };
      })
      .filter((chain: ConceroChain | null) => chain !== null);
  };

  const {
    data: chains,
    isLoading: chainsLoading,
    refetch: refetchChains,
  } = useQuery({
    queryKey: ["chainsConfig"],
    queryFn: fetchChains,
    staleTime: 30_000,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setChains(chains ?? []);
    setLoading(chainsLoading);
  }, [chains, chainsLoading, setChains, setLoading]);

  return { chains: chains ?? [], loading: chainsLoading, refetchChains };
};
