import { Hero } from '@/components/hero/Hero'
import type { FC } from 'react'

export const Home: FC = (): JSX.Element => {
	return (
		<main className="main">
			<Hero />
		</main>
	)
}
