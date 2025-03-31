import { SDKContext } from '@/providers/SDKProvider/SDKProvider'
import { useContext } from 'react'

export const useSDK = () => {
	const context = useContext(SDKContext)

	if (!context) {
		throw new Error('useLancaClient must be used within an SDKProvider')
	}

	return context.client
}