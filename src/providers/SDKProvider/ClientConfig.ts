import type { ILancaClientConfig, IChainWithProvider } from '@lanca/sdk';
import { chains, transports } from '@/configuration/chains';
import { http } from 'viem';

export const sdkConfiguration: ILancaClientConfig = {
    chains: chains.reduce((acc, chain) => {
        const chainId = chain.id as keyof typeof transports; 
        acc[chain.id] = {
            chain,
            provider: transports[chainId] || http(chain.rpcUrls.default.http[0]),
        } as IChainWithProvider;
        return acc;
    }, {} as Record<string, IChainWithProvider>),
};
