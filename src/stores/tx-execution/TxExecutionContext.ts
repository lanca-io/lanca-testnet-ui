import type { TxExecutionStore } from './types'
import { createContext } from 'react'

export const TxExecutionContext = createContext<TxExecutionStore | null>(null)
