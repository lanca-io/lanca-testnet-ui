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
    const setSourceChain = useStore(state => state.setSourceChain)
    const setDestinationChain = useStore(state => state.setDestinationChain)
    const setFromAmount = useStore(state => state.setFromAmount)
    const setLoading = useStore(state => state.setLoading)
    const swapChains = useStore(state => state.swapChains)

    return {
        sourceChain,
        destinationChain,
        fromAmount,
        isLoading,
        setSourceChain,
        setDestinationChain,
        setFromAmount,
        setLoading,
        swapChains,
    }
}