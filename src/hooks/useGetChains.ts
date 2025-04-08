import { useChainsStore } from '@/stores/chains/useChainsStore'
import { useEffect, useState } from 'react'

export const useGetChains = () => {
	const { chains } = useChainsStore()
	const [allChains, setAllChains] = useState(Object.values(chains))
	const [ccipChains, setCCIPChains] = useState(Object.values(chains).filter(chain => chain.isCCIP))
	const [faucetChains, setFaucetChains] = useState(Object.values(chains).filter(chain => chain.hastCEROFaucet))
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		const all = Object.values(chains)
		const ccip = all.filter(chain => chain.isCCIP)
		setAllChains(all)
		setCCIPChains(ccip)
		setIsLoading(false)
	}, [chains])

	return { allChains, ccipChains, faucetChains, isLoading }
}
