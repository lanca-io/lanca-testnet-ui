import type { QueryClientConfig } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'

const queryOptions: QueryClientConfig = {
	defaultOptions: {
		queries: {
			enabled: true,
			refetchInterval: false,
			refetchIntervalInBackground: false,
			refetchOnReconnect: true,
			refetchOnMount: true,
			retryOnMount: true,
		},
	},
}

export const QueryConfiguration = new QueryClient(queryOptions)
