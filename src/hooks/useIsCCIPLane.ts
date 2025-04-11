import { useMemo, useState, useEffect, useCallback } from 'react'
import { Address } from 'viem'
import { useFormStore } from "@/stores/form/useFormStore"
import { getPublicClient } from '@/utils/client'
import { chainCCIP } from '@/stores/chains/ChainInfo'
import { CCIPRouter } from '@/assets/abi/CCIPRouter'
import { ccipRouters } from '@/configuration/ccip'

export const useIsCCIPLane = () => {
    const { sourceChain, destinationChain } = useFormStore()
    const [isLaneSupported, setIsLaneSupported] = useState<boolean | null>(null)
    
    const checkCCIPLaneSupport = useCallback(async () => {
        setIsLaneSupported(null)
        
        if (!sourceChain?.id || !destinationChain?.id || !destinationChain.selector) {
            return
        }

        const sourceChainId = Number(sourceChain.id)
        const destChainId = Number(destinationChain.id)
        
        if (!chainCCIP[sourceChainId]?.isCCIP || !chainCCIP[destChainId]?.isCCIP) {
            return
        }
        
        try {
            const client = getPublicClient(Number(sourceChainId))
            const routerAddress = ccipRouters[sourceChainId.toString()]
            
            if (!client || !routerAddress) {
                return
            }
            
            const supported = await client.readContract({
                address: routerAddress as Address,
                abi: CCIPRouter,
                functionName: 'isChainSupported',
                args: [destinationChain.selector]
            })
            
            setIsLaneSupported(!!supported)
        } catch (error) {
            console.error('Error checking CCIP lane:', error)
            setIsLaneSupported(false)
        }
    }, [sourceChain, destinationChain])
    
    useEffect(() => {
        checkCCIPLaneSupport()
    }, [checkCCIPLaneSupport])
    
    const isCCIPLane = useMemo(() => {
        if (!sourceChain?.id || !destinationChain?.id) {
            return false
        }
        
        return isLaneSupported === true
    }, [sourceChain, destinationChain, isLaneSupported])
    
    return { isCCIPLane }
}