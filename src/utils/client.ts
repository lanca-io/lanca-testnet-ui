import { createPublicClient } from 'viem'
import { chains, transports } from '../configuration/chains'

/**
 * Gets a public client for the specified chain ID.
 * @param chainId - The ID of the chain.
 * @returns The public client for the specified chain.
 * @throws Will throw an error if the chain ID is unsupported.
 */
export const getPublicClient = (chainId: number) => {
    const chainConfig = chains.find(chain => chain.id === chainId)
    const transport = transports[chainId as keyof typeof transports]

    if (!chainConfig || !transport) {
        throw new Error(`Unsupported chain ID: ${chainId}`)
    }

    return createPublicClient({
        // @ts-ignore
        chain: chainConfig,
        transport,
    })
}