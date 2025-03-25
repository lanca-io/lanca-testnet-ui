import { FC, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { IconButton } from '@concero/ui-kit'
import { XIcon } from '@/assets/icons/socials/x'
import { DiscordIcon } from '@/assets/icons/socials/discord'
import { MediumIcon } from '@/assets/icons/socials/medium'
import { DocsIcon } from '@/assets/icons/docs'
import { FileIcon } from '@/assets/icons/file'
import { YouTubeIcon } from '@/assets/icons/socials/youtube'
import { routes } from '../../configuration/routes'
import './Footer.pcss'

type FooterIcon = {
	icon: React.ReactNode
	className?: string
}

type FooterSection = {
	heading: string
	icons: FooterIcon[]
}

const FooterItem: FC<FooterSection> = ({ heading, icons }) => (
	<div className="footer-item">
		<h5 className="footer-item__heading">{heading}</h5>
		<div className="footer-item__actions">
			{icons.map((item, index) => (
				<IconButton key={`${heading}-icon-${index}`} variant="secondary" className={item.className}>
					{item.icon}
				</IconButton>
			))}
		</div>
	</div>
)

export const Footer: FC = () => {
	const { pathname } = useLocation()

	const icons = useMemo(
		() => ({
			x: { icon: <XIcon />, className: 'x-icon-button' },
			discord: { icon: <DiscordIcon />, className: 'discord-icon-button' },
			medium: { icon: <MediumIcon />, className: 'medium-icon-button' },
			youtube: { icon: <YouTubeIcon />, className: 'youtube-icon-button' },
			file: { icon: <FileIcon /> },
			docs: { icon: <DocsIcon /> },
		}),
		[],
	)

	const sections = useMemo(
		() => ({
			docs: {
				heading: 'Docs',
				icons: [icons.file, icons.docs],
			},
			socials: {
				heading: 'Socials',
				icons: [icons.x, icons.discord, icons.medium],
			},
			connect: {
				heading: 'Socials',
				icons: [icons.x, icons.discord, icons.medium],
			},
			howToUse: {
				heading: 'How to use',
				icons: [icons.youtube, icons.medium],
			},
		}),
		[icons],
	)

	const footerMap = useMemo(
		() => ({
			[routes.home]: (
				<div className="footer">
					<FooterItem {...sections.docs} />
					<FooterItem {...sections.socials} />
				</div>
			),
			[routes.swap]: (
				<div className="footer swap-footer">
					<FooterItem {...sections.howToUse} />
					<FooterItem {...sections.docs} />
					<FooterItem {...sections.connect} />
				</div>
			),
		}),
		[sections],
	)

	return footerMap[pathname] || null
}
