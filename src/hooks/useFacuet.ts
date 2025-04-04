import { useState, useCallback } from 'react'
import { Address } from 'viem'
import { useAccount } from 'wagmi'

type FaucetResponse = {
	success: boolean
	message?: string
	txHash?: string
}

const requestTokens = async (address: Address, chainId: number): Promise<FaucetResponse> => {
	try {
		const res = await fetch(`http://localhost:4000/api/faucet`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				address,
				chainId,
			}),
		})

		if (!res.ok) {
			const errorData = await res.json()
			return {
				success: false,
				message: errorData.message || `Error: ${res.status} ${res.statusText}`,
			}
		}

		const data = await res.json()
		return {
			success: true,
			...data,
		}
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : 'Unknown error occurred',
		}
	}
}

export const useFaucet = () => {
	const { address } = useAccount()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [txHash, setTxHash] = useState<string | null>(null)

	const getTestTokens = useCallback(
		async (chainId: number) => {
			if (!address) return false

			setIsLoading(true)

			try {
				const response = await requestTokens(address, chainId)

				if (!response.success) {
					return false
				}

				if (response.txHash) {
					setTxHash(response.txHash)
				}

				return true
			} catch (err) {
				return false
			} finally {
				setIsLoading(false)
			}
		},
		[address],
	)

	return {
		getTestTokens,
		isLoading,
		txHash,
	}
}
