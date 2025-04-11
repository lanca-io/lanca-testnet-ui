import { FC, useMemo, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { IconButton } from '@concero/ui-kit'
import { XIcon } from '@/assets/icons/socials/x'
import { DiscordIcon } from '@/assets/icons/socials/discord'
import { MediumIcon } from '@/assets/icons/socials/medium'
import { DocsIcon } from '@/assets/icons/docs'
import { FileIcon } from '@/assets/icons/file'
import { YouTubeIcon } from '@/assets/icons/socials/youtube'
import { routes } from '../../configuration/routes'
import { GuideEvents } from '@/events/events'
import { useTrackEvent } from '@/hooks/useTrackEvent'
import './Footer.pcss'

type FooterIcon = {
    icon: React.ReactNode
    className?: string
    link?: string
    trackingEvent?: {
        category: string
        action: string
        label?: string
    }
}

type FooterSection = {
    heading: string
    icons: FooterIcon[]
}

const FooterItem: FC<FooterSection> = ({ heading, icons }) => {
    const { trackEvent } = useTrackEvent()

    const handleIconClick = useCallback((icon: FooterIcon) => {
        if (icon.trackingEvent) {
            trackEvent(icon.trackingEvent)
        }
    }, [trackEvent])

    return (
        <div className="footer-item">
            <h5 className="footer-item__heading">{heading}</h5>
            <div className="footer-item__actions">
                {icons.map((item, index) => (
                    <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        key={`${heading}-link-${index}`}
                        onClick={() => handleIconClick(item)}
                    >
                        <IconButton key={`${heading}-icon-${index}`} variant="secondary" className={item.className}>
                            {item.icon}
                        </IconButton>
                    </a>
                ))}
            </div>
        </div>
    )
}

export const Footer: FC = () => {
    const { pathname } = useLocation()

    const iconBase = useMemo(
        () => ({
            x: {
                icon: <XIcon />,
                className: 'x-icon-button',
                link: 'https://x.com/concero_io',
            },
            discord: {
                icon: <DiscordIcon />,
                className: 'discord-icon-button',
                link: 'https://discord.gg/lanca',
            },
            file: {
                icon: <FileIcon />,
                link: 'https://concero.io/whitepaper.pdf',
            },
            docs: {
                icon: <DocsIcon />,
                link: 'https://docs.concero.io/',
            },
			mediumSocial: {
                icon: <MediumIcon />,
                className: 'medium-icon-button',
                link: 'https://medium.com/@concero',
            },
        }),
        [],
    )

    const specialIcons = useMemo(() => {
        return {
            mediumGuide: {
                icon: <MediumIcon />,
                className: 'medium-icon-button',
                link: 'https://medium.com/@concero/guides',
                trackingEvent: {
                    ...GuideEvents.MEDIUM_OPENED
                }
            },

            youtube: {
                icon: <YouTubeIcon />,
                className: 'youtube-icon-button',
                link: 'https://www.youtube.com/@concero_io',
                trackingEvent: {
                    ...GuideEvents.YOUTUBE_OPENED
                }
            },
        }
    }, [])

    const icons = useMemo(() => ({
        ...iconBase,
        ...specialIcons
    }), [iconBase, specialIcons])

    const sections = useMemo(
        () => ({
            docs: {
                heading: 'Docs',
                icons: [icons.file, icons.docs],
            },
            socials: {
                heading: 'Socials',
                icons: [icons.x, icons.discord, icons.mediumSocial]
            },
            connect: {
                heading: 'Socials',
                icons: [icons.x, icons.discord, icons.mediumSocial]
            },
            howToUse: {
                heading: 'How to use',
                icons: [icons.youtube, icons.mediumGuide]
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