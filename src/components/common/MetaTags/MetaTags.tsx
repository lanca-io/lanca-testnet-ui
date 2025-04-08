import { Helmet } from 'react-helmet-async'

const DEFAULT_DESCRIPTION =
    'Welcome to Concero Testnet – a risk-free, developer-focused blockchain sandbox for testing our fully decentralized cross-chain messaging solution featuring secure token swaps and seamless inter-chain communications.'

const DEFAULT_TITLE = 'Concero | Testnet'

const DEFAULT_KEYWORDS =
    'concero testnet, blockchain testing, decentralized applications, blockchain integration, testnet environment, ethereum, arbitrum, optimism, sepolia, megaeth, monad, berachain, chainlink, ccip, concero'

const IMAGE = '/Cover.png'

type MetaTagsProps = {
    title?: string
    description?: string
    prefetchUrl?: string
}

export const MetaTags = ({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION, prefetchUrl }: MetaTagsProps) => (
    <Helmet>
        {/* Title */}
        <title>{title}</title>

        {/* Meta Tags */}
        <meta name="description" content={description} />
        <meta name="keywords" content={DEFAULT_KEYWORDS} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@concero_io" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={IMAGE} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={IMAGE} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://testnet.concero.io/" />

        {/* Preloading - Only if prefetchUrl is provided */}
        {prefetchUrl && (
            <>
                <link rel="dns-prefetch" href={prefetchUrl} />
                <link rel="preconnect" href={prefetchUrl} crossOrigin="" />
            </>
        )}

        {/* Favicons */}
        <link rel="shortcut icon" href="/Favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/Favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/Favicons/favicon-16x16.png" />
    </Helmet>
)