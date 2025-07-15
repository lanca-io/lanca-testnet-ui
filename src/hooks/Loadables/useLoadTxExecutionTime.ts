import { useCallback, useEffect, useState } from 'react'
import { useFormStore } from '@/stores/form/useFormStore'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { getPublicClient } from '@/utils/client'
import { Hash, PublicClient } from 'viem'

const DEFAULT_ESTIMATE = '~15'

export const useLoadTxExecutionTime = () => {
	const { sourceChain, destinationChain } = useFormStore()
	const { srcHash, dstHash, setExecutionTime } = useTxExecutionStore()
	const [isLoading, setIsLoading] = useState(false)

	const fetchTransactions = async (srcClient: PublicClient, dstClient: PublicClient) => {
		try {
			const [srcTx, dstTx] = await Promise.all([
				srcClient.getTransaction({ hash: srcHash as Hash }),
				dstClient.getTransaction({ hash: dstHash as Hash }),
			])

			if (!srcTx?.blockNumber || !dstTx?.blockNumber) {
				throw new Error('Missing block numbers')
			}

			return { srcTx, dstTx }
		} catch (error) {
			console.warn('Error fetching transactions:', error)
			return null
		}
	}

	const fetchBlocks = async (
		srcClient: PublicClient,
		dstClient: PublicClient,
		srcBlockNumber: bigint,
		dstBlockNumber: bigint,
	) => {
		try {
			const [srcBlock, dstBlock] = await Promise.all([
				srcClient.getBlock({ blockNumber: srcBlockNumber }),
				dstClient.getBlock({ blockNumber: dstBlockNumber }),
			])

			if (!srcBlock?.timestamp || !dstBlock?.timestamp) {
				throw new Error('Missing block timestamps')
			}

			return { srcBlock, dstBlock }
		} catch (error) {
			console.warn('Error fetching chain blocks:', error)
			return null
		}
	}

	const calculateTimeDifference = (srcTimestamp: bigint, dstTimestamp: bigint) => {
		const srcTime = Number(srcTimestamp)
		const dstTime = Number(dstTimestamp)

		if (isNaN(srcTime) || isNaN(dstTime)) {
			throw new Error('Invalid timestamp values')
		}

		return dstTime - srcTime
	}

	const fetchTxExecutionTime = useCallback(async () => {
		if (!srcHash || !dstHash || !sourceChain?.id || !destinationChain?.id) return

		setIsLoading(true)

		try {
			const srcClient = getPublicClient(Number(sourceChain.id)) as PublicClient
			const dstClient = getPublicClient(Number(destinationChain.id)) as PublicClient

			const txData = await fetchTransactions(srcClient, dstClient)
			if (!txData) {
				setExecutionTime(DEFAULT_ESTIMATE)
				setIsLoading(false)
				return DEFAULT_ESTIMATE
			}

			const blockData = await fetchBlocks(
				srcClient,
				dstClient,
				txData.srcTx.blockNumber,
				txData.dstTx.blockNumber,
			)
			if (!blockData) {
				setExecutionTime(DEFAULT_ESTIMATE)
				setIsLoading(false)
				return DEFAULT_ESTIMATE
			}

			try {
				const timeDiff = calculateTimeDifference(blockData.srcBlock.timestamp, blockData.dstBlock.timestamp)

				const result = timeDiff.toString()
				setExecutionTime(result)
				setIsLoading(false)
				return result
			} catch (error) {
				console.warn('Error calculating time difference:', error)
				setExecutionTime(DEFAULT_ESTIMATE)
				setIsLoading(false)
				return DEFAULT_ESTIMATE
			}
		} catch (error) {
			console.error('Error estimating execution time:', error)
			setExecutionTime(DEFAULT_ESTIMATE)
			setIsLoading(false)
			return DEFAULT_ESTIMATE
		}
	}, [srcHash, dstHash, sourceChain?.id, destinationChain?.id, setExecutionTime])

	useEffect(() => {
		fetchTxExecutionTime()
	}, [fetchTxExecutionTime])

	return {
		estimateTime: fetchTxExecutionTime,
		isLoading,
	}
}
