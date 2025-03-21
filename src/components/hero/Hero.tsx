import type { FC } from 'react'
import { Button } from '@concero/ui-kit'
import { useMemo } from 'react'
import { useIsMobile, useIsTablet } from '@/hooks/useMediaQuery'
import './Hero.pcss'


const Heading: FC = (): JSX.Element => {
	return <h1 className="heading">Welcome to Concero Testnet</h1>
}

const Subheading: FC = (): JSX.Element => {
	return (
		<p className="subheading">
			Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
			industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
			scrambled
		</p>
	)
}

const HeroIllustrations: FC = (): JSX.Element | null => {
	const isTablet = useIsTablet();
	const isMobile = useIsMobile();
  
	if (isMobile) return null;
  
	if (isTablet) {
	  return <img src="/Hero/Illustration-Three.svg" alt="Illustration" className="illustration-three" />;
	}
  
	return (
	  <>
		<img src="/Hero/Illustration-One.svg" alt="Illustration" className="illustration-one" />
		<img src="/Hero/Illustration-Two.svg" alt="Illustration" className="illustration-two" />
	  </>
	);
  };

export const Hero: FC = () => {
	const heading = useMemo(() => <Heading />, [])
	const subheading = useMemo(() => <Subheading />, [])
	const illustrations = useMemo(() => <HeroIllustrations />, [])

	return (
		<div className="hero">
			<div className="hero-content">
				{heading}
				{subheading}
			</div>
			<Button size="l" variant="primary" className="action-button">
				Connect wallet
			</Button>
			{illustrations}
		</div>
	)
}
