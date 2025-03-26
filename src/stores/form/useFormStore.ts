import { useContext } from 'react'
import { FormContext } from './FormContext'

export const useFormStore = () => {
    const useStore = useContext(FormContext)
    if (!useStore) {
        throw new Error(`You forgot to wrap your component in <FormStoreProvider>.`)
    }

    const sourceChain = useStore(state => state.sourceChain)
    const destinationChain = useStore(state => state.destinationChain)
    const fromAmount = useStore(state => state.fromAmount)
    const isLoading = useStore(state => state.isLoading)
    const fromTokenAddress = useStore(state => state.fromTokenAddress)
    const toTokenAddress = useStore(state => state.toTokenAddress)
    const setSourceChain = useStore(state => state.setSourceChain)
    const setDestinationChain = useStore(state => state.setDestinationChain)
    const setFromAmount = useStore(state => state.setFromAmount)
    const setLoading = useStore(state => state.setLoading)
    const setFromTokenAddress = useStore(state => state.setFromTokenAddress)
    const setToTokenAddress = useStore(state => state.setToTokenAddress)
    const swapTokensAndChains = useStore(state => state.swapTokensAndChains)

    return {
        sourceChain,
        destinationChain,
        fromAmount,
        isLoading,
        fromTokenAddress,
        toTokenAddress,
        setSourceChain,
        setDestinationChain,
        setFromAmount,
        setLoading,
        setFromTokenAddress,
        setToTokenAddress,
        swapTokensAndChains,
    }
}