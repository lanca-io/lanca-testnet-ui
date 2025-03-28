import type { FC } from 'react'
import { memo } from 'react'
import { Button } from '@concero/ui-kit'
import './GetTokens.pcss'

type TProps = {
	onGetTokens?: () => void
}
export const GetTokens: FC<TProps> = memo(({ onGetTokens }) => {
	return (
		<div className="get-tokens">
			<div className="get-tokens__content">
				<h3 className="get-tokens__title">Let's start</h3>
				<img src="/Swap/GetTokens.svg" alt="Tokens" />
				<p className="get-tokens__subtitle">Claim test tokens to start testing</p>
			</div>
			<Button size="l" onClick={onGetTokens}>
				Get Test Tokens
			</Button>
		</div>
	)
})
