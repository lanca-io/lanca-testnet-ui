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
		priceUsd: number = 0,
	) => ({
		address,
		chainId,
		decimals: 18,
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

	const fromToken = createTokenData(fromTokenAddress, fromChainId, '/Token/tCERO.svg', 'tCERO', 'tCERO')
	const toToken = createTokenData(toTokenAddress, toChainId, '/Token/tCERO.svg', 'tCERO', 'tCERO')

	const fromChain = createChainData(fromChainId, sourceChain.explorerURL, sourceChain.logoURL, sourceChain.name)
	const toChain = createChainData(
		toChainId,
		destinationChain.explorerURL,
		destinationChain.logoURL,
		destinationChain.name,
	)

	const rawFromAmount = BigInt(Number(fromAmount) * 10 ** fromToken.decimals)
	const rawToAmount = BigInt(Number(rawFromAmount) - Number(fee))

	const route: IRouteType = {
		from: {
			token: fromToken,
			chain: fromChain,
			amount: rawFromAmount.toString(),
		},
		to: {
			token: toToken,
			chain: toChain,
			amount: rawToAmount.toString(),
		},
		steps: [
			{
				type: StepType.BRIDGE,
				from: {
					token: fromToken,
					chain: fromChain,
					amount: rawFromAmount.toString(),
				},
				to: {
					token: toToken,
					chain: toChain,
					amount: rawToAmount.toString(),
				},
			},
		],
	}

	return route
}
