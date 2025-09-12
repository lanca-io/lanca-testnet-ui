import { useChainsStore } from '@/stores/chains/useChainsStore'
import { useFormStore } from '@/stores/form/useFormStore'
import { useEffect, useState, useMemo } from 'react'

export const useGetChains = () => {
  const { chains } = useChainsStore()
  const { sourceChain } = useFormStore()

  const [isLoading, setIsLoading] = useState(true)

  const { allChains, faucetChains } = useMemo(() => {
    const all = Object.values(chains)
    const faucet = all.filter(chain => chain.hasUSDCFaucet)

    return {
      allChains: all,
      faucetChains: faucet,
    }
  }, [chains])

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 0)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  useEffect(() => {
    setIsLoading(true)
  }, [chains, sourceChain])

  return { allChains, faucetChains, isLoading }
}
