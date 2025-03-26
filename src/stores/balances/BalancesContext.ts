import type { BalancesStore } from './types'
import { createContext } from 'react'

export const BalancesContext = createContext<BalancesStore | null>(null)

