import { useContext } from 'react'
import { ChainsContext } from './ChainsContext'

export const useChainsStore = () => {
	const useStore = useContext(ChainsContext)
	if (!useStore) {
		throw new Error(`You forgot to wrap your component in <ChainsStoreProvider>.`)
	}

	const chains = useStore(state => state.chains)

	return {
		chains,
	}
}
