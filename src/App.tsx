import '@concero/ui-kit/styles/concero/index.css'
import './styles/App.css'
import { AppProviders } from './providers/AppProviders'
import { Button } from '@concero/ui-kit'
import { useAppKit } from '@reown/appkit/react'

function App() {
	const { open } = useAppKit()
	return (
		<AppProviders>
			<Button onClick={() => open()}>Click me</Button>
		</AppProviders>
	)
}

export default App
