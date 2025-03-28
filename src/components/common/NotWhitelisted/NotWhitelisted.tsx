import type { FC } from 'react'
import { memo } from 'react'
import { Button } from '@concero/ui-kit'
import './NotWhitelisted.pcss'

export const NotWhitelisted: FC = memo(() => {
	const link =
		'https://docs.google.com/forms/d/e/1FAIpQLSdxDzz9-7cdxHsNFubyTAIl29dbpqzJhm0vHOsYmKmg5DSxeQ/viewform?usp=header'
	const handleClick = () => {
		window.open(link, '_blank', 'noopener,noreferrer')
	}

	return (
		<div className="not-whitelisted">
			<div className="not-whitelisted__content">
				<h3 className="not-whitelisted__title">Apply for Whitelist</h3>
				<img src="/Swap/NotWhitelisted.svg" alt="Tokens" />
				<p className="not-whitelisted__subtitle">
					You are not currently on the whitelist. To gain access, please fill out the application form. Our
					team will review your submission, and you'll be notified once your access is approved.
				</p>
			</div>
			<Button size="l" onClick={handleClick}>
				Get Invite
			</Button>
		</div>
	)
})
