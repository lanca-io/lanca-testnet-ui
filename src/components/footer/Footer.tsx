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
	link: string | undefined
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
				<a href={item.link} target="_blank" rel="noopener noreferrer" key={`${heading}-link-${index}`}>
					<IconButton key={`${heading}-icon-${index}`} variant="secondary" className={item.className}>
						{item.icon}
					</IconButton>
				</a>
			))}
		</div>
	</div>
)

export const Footer: FC = () => {
	const { pathname } = useLocation()


    const icons = useMemo(
        () => ({
            x: { 
                icon: <XIcon />, 
                className: 'x-icon-button',
                link: 'https://x.com/concero_io'
            },
            discord: { 
                icon: <DiscordIcon />, 
                className: 'discord-icon-button',
                link: 'https://discord.gg/lanca'
            },
            medium: { 
                icon: <MediumIcon />, 
                className: 'medium-icon-button',
                link: 'https://medium.com/@concero'
            },
            youtube: { 
                icon: <YouTubeIcon />, 
                className: 'youtube-icon-button',
                link: 'https://www.youtube.com/@concero_io'
            },
            file: { 
                icon: <FileIcon />,
                link: 'https://concero.io/whitepaper.pdf'
            },
            docs: { 
                icon: <DocsIcon />,
                link: 'https://docs.concero.io/'
            },
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
