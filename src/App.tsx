import '@concero/ui-kit/styles/concero/index.css'
import './styles/App.css'
import { AppProviders } from './providers/AppProviders'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './configuration/routes'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { ScreenLoader } from './components/common/ScreenLoader/ScreenLoader'
import { lazy, Suspense } from 'react'

const HomePage = lazy(() =>
	import('./pages/Home').then(module => ({
		default: module.HomePage,
	})),
)

const SwapPage = lazy(() =>
	import('./pages/Swap').then(module => ({
		default: module.SwapPage,
	})),
)

function App() {
	return (
		<AppProviders>
			<BrowserRouter>
				<Header />
				<Suspense fallback={<ScreenLoader />}>
					<Routes>
						<Route path={routes.home} element={<HomePage />} />
						<Route path={routes.swap} element={<SwapPage />} />
					</Routes>
				</Suspense>
				<Footer />
			</BrowserRouter>
		</AppProviders>
	)
}

export default App
