import { createPublicClient } from 'viem'
import { createWalletClient } from 'viem'
import { chains, transports } from '../configuration/chains'
import type { PublicClient } from 'viem'

/**
 * Gets a public client for the specified chain ID.
 *
 * A public client is used to interact with the blockchain in a read-only manner,
 * such as fetching data from the blockchain or querying smart contracts.
 *
 * @param chainId - The ID of the chain for which the public client is required.
 * @returns The public client for the specified chain.
 * @throws Will throw an error if the chain ID is unsupported or if the transport is not configured.
 */

const clients: Record<number, PublicClient> = {}

export const getPublicClient = (chainId: number) => {
	if (clients[chainId]) {
		return clients[chainId]
	}
	const chainConfig = chains.find(chain => chain.id === chainId)
	const transport = transports[chainId as keyof typeof transports]

	if (!chainConfig || !transport) {
		throw new Error(`Unsupported chain ID: ${chainId}`)
	}

	const client = createPublicClient({
		chain: { ...chainConfig, id: Number(chainConfig.id) },
		transport,
	})
	clients[chainId] = client
	return client
}

/**
 * Gets a wallet client for the specified chain ID.
 *
 * A wallet client is used to interact with the blockchain in a write-enabled manner,
 * such as sending transactions or signing messages. It requires access to a wallet
 * and its associated private keys.
 *
 * @param chainId - The ID of the chain for which the wallet client is required.
 * @returns The wallet client for the specified chain.
 * @throws Will throw an error if the chain ID is unsupported or if the transport is not configured.
 */
export const getWalletClient = (chainId: number) => {
	const chainConfig = chains.find(chain => chain.id === chainId)
	const transport = transports[chainId as keyof typeof transports]

	if (!chainConfig || !transport) {
		throw new Error(`Unsupported chain ID: ${chainId}`)
	}

	return createWalletClient({
		chain: { ...chainConfig, id: Number(chainConfig.id) },
		transport,
	})
}
