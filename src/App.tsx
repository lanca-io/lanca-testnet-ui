import '@concero/ui-kit/styles/concero/index.css'
import './styles/App.css'
import { AppProviders } from './providers/AppProviders'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './configuration/routes'
import { Home } from './pages/Home'
import { Swap } from './pages/Swap'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'

function App() {
	return (
		<AppProviders>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path={routes.home} element={<Home />} />
					<Route path={routes.swap} element={<Swap />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</AppProviders>
	)
}

export default App