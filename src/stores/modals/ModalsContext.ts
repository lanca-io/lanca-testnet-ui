import type { ModalsStore } from './types'
import { createContext } from 'react'

export const ModalsContext = createContext<ModalsStore | null>(null)
