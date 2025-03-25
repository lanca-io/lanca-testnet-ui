import type { FormStore } from './types'
import { createContext } from 'react'

export const FormContext = createContext<FormStore | null>(null)
