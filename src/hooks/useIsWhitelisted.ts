import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { isAdminAddress } from '@/utils/tests/isAdminAddress'

export const useIsWhitelisted = () => {
  const { address, isConnected } = useAccount()
  const [isWhitelisted, setIsWhitelisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const mockCheckStatus = async () => {
    setIsWhitelisted(false)
    
    if (!isConnected || !address) {
      return
    }

    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      const mockWhitelisted = isAdminAddress(address)
      
      setIsWhitelisted(mockWhitelisted)
    } catch (err) {
      setIsWhitelisted(false)
      console.warn('Whitelisted check failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    mockCheckStatus()
  }, [address, isConnected])

  return {
    isWhitelisted,
    isLoading
  }
}