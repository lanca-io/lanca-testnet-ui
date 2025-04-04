import type { FC } from 'react'
import { memo, useCallback } from 'react'
import { Button } from '@concero/ui-kit'
import { useFaucet } from '@/hooks/useFacuet'
import './GetTokens.pcss'

export const GetTokens: FC = memo(() => {
    const { getTestTokens, isLoading } = useFaucet()

    const handleGetTokens = useCallback(() => {
        getTestTokens(84532) 
    }, [getTestTokens])
    
    return (
        <div className="get-tokens">
            <div className="get-tokens__content">
                <h3 className="get-tokens__title">Let's start</h3>
                <img 
                    src="/Swap/GetTokens.svg" 
                    alt="Tokens"
                />
                <p className="get-tokens__subtitle">Claim test tokens to start testing</p>
            </div>
            <Button 
                size="l" 
                onClick={handleGetTokens} 
                isLoading={isLoading}
            >
                Get Test Tokens
            </Button>
        </div>
    )
})