import type { ChainsStore } from './types'
import { createContext } from 'react'

export const ChainsContext = createContext<ChainsStore | null>(null)
