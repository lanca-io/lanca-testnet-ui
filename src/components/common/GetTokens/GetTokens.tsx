import type { FC } from 'react'
import { memo, useCallback } from 'react'
import { Button } from '@concero/ui-kit'
import { useFaucet } from '@/hooks/useFacuet'
import './GetTokens.pcss'

export const GetTokens: FC = memo(() => {
	const { getTestTokens, isLoading } = useFaucet()

	const handleGetTokens = useCallback(() => {
		getTestTokens(11155111)
	}, [getTestTokens])

	return (
		<div className="get_tokens">
			<div className="get_tokens_content">
				<h3 className="get_tokens_title">Let's start</h3>
				<img src="/Swap/GetTokens.svg" alt="Tokens" />
				<p className="get_tokens_subtitle">Claim tCER0 (test tokens) on ETH sepolia to start testing</p>
			</div>
			<Button size="l" onClick={handleGetTokens} isLoading={isLoading} data-testid="get-tokens-button">
				Get tCERO
			</Button>
		</div>
	)
})
