import { ReactNode, useState, type FC } from 'react'
import { NotWhitelisted } from '../common/NotWhitelisted/NotWhitelisted'
import { SwapWidget } from '../common/SwapWidget/SwapWidget'
import { GetTokens } from '../common/GetTokens/GetTokens'
import { useAccount } from 'wagmi'
import { isAdminAddress } from '@/utils/tests/isAdminAddress'
import './Swap.pcss'

type TSteps = 'ready_to_start' | 'need_to_whitelist' | 'swap'

export const Swap: FC = () => {
	const { address } = useAccount()
	const isWhitelisted = isAdminAddress(address)
	const hasTokens = true
	const [currentStepView, setCurrentStepView] = useState<TSteps>(() =>
		isWhitelisted ? (hasTokens ? 'swap' : 'ready_to_start') : 'need_to_whitelist',
	)

	const stepMap: Record<TSteps, ReactNode> = {
		need_to_whitelist: <NotWhitelisted />,
		ready_to_start: (
			<GetTokens
				onGetTokens={() => {
					setCurrentStepView('swap')
				}}
			/>
		),
		swap: <SwapWidget />,
	}
	return <div className="swap">{stepMap[currentStepView]}</div>
}
