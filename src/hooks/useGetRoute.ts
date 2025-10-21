import { IRouteType, StepType } from '@lanca/sdk'
import { useFormStore } from '@/stores/form/useFormStore'
import { Address } from 'viem'
import { useGetFees } from './useGetFees'

export const useGetRoute = (): IRouteType | null => {
	const { sourceChain, destinationChain, fromTokenAddress, toTokenAddress, fromAmount } = useFormStore()
	const { fee, isLoading } = useGetFees()

	if (isLoading || fee === undefined) {
		return null
	}

	const fromChainId = sourceChain?.id
	const toChainId = destinationChain?.id

	if (!fromTokenAddress || !toTokenAddress || !fromChainId || !toChainId || !fromAmount) {
		return null
	}

	const createTokenData = (
		address: Address,
		chainId: string,
		logoURL: string,
		name: string,
		symbol: string,
		priceUsd: number = 1,
	) => ({
		address,
		chainId,
		decimals: 6,
		logoURL,
		name,
		symbol,
		priceUsd,
	})

	const createChainData = (id: string, explorerURL: string, logoURL: string, name: string) => ({
		id,
		explorerURI: explorerURL,
		logoURI: logoURL,
		name,
	})

	const fromToken = createTokenData(fromTokenAddress, String(fromChainId), '/Token/USDC.png', 'USDC', 'USDC')
	const toToken = createTokenData(toTokenAddress, String(toChainId), '/Token/USDC.png', 'USDC', 'USDC')

	const fromChain = createChainData(String(fromChainId), sourceChain.explorer || '', sourceChain.logo, sourceChain.name)
	const toChain = createChainData(
		String(toChainId),
		destinationChain.explorer || '',
		destinationChain.logo,
		destinationChain.name,
	)

	const rawAmount = BigInt(Number(fromAmount))

	const route: IRouteType = {
		from: {
			token: fromToken,
			chain: fromChain,
			amount: rawAmount.toString(),
		},
		to: {
			token: toToken,
			chain: toChain,
			amount: rawAmount.toString(),
		},
		steps: [
			{
				type: StepType.BRIDGE,
				from: {
					token: fromToken,
					chain: fromChain,
					amount: rawAmount.toString(),
				},
				to: {
					token: toToken,
					chain: toChain,
					amount: rawAmount.toString(),
				},
			},
		],
	}

	return route
}
