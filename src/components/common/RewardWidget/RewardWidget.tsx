import { useMemo, type FC } from 'react'
import { RewardIcon } from '@/assets/icons/reward'
import { Button } from '@concero/ui-kit'
import './RewardWidget.pcss'

export const RewardWidget: FC = (): JSX.Element => {
	const content = useMemo(
		() => (
			<div className="reward_widget">
				<div className="reward_widget_content">
					<div className="reward_widget_icon">
						<RewardIcon />
					</div>
					<p className="reward_widget_text">
						Claim your<span> CERs reward</span>
					</p>
				</div>
				<Button variant="secondary_color" size="m">
					Claim
				</Button>
			</div>
		),
		[],
	)

	return content
}
