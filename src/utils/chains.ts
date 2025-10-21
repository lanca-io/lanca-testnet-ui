export const fetchChainConfiguration = async (isTestnet = true): Promise<any> => {
	try {
		const url = new URL('http://localhost:3000/api/v1/chains/configuration')
		url.searchParams.append('is_testnet', String(isTestnet))

		const response = await fetch(url.toString())

		if (!response.ok) {
			throw new Error(`Failed to fetch chain configuration: ${response.status} ${response.statusText}`)
		}

		const data = await response.json()
		return data
	} catch (e) {
		throw new Error('[Concero Testnet]Fetching chain configuration')
	}
}
