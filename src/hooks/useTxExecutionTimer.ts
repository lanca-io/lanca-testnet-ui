import { useEffect, useRef } from 'react'
import { Status } from '@lanca/sdk'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'

export const useTxExecutionTimer = () => {
	const { steps, setExecutionTime } = useTxExecutionStore()
	const timerRef = useRef<NodeJS.Timeout | null>(null)

	const countRef = useRef<number>(0)

	useEffect(() => {
		if (steps.BRIDGE === Status.PENDING) {
			countRef.current = 0
			setExecutionTime(0)

			if (timerRef.current) {
				clearInterval(timerRef.current)
			}

			timerRef.current = setInterval(() => {
				countRef.current += 1
				setExecutionTime(countRef.current)
			}, 1000)
		} else if (
			steps.BRIDGE === Status.SUCCESS ||
			steps.BRIDGE === Status.FAILED ||
			steps.BRIDGE === Status.REJECTED
		) {
			if (timerRef.current) {
				clearInterval(timerRef.current)
				timerRef.current = null
			}
		}

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current)
				timerRef.current = null
			}
		}
	}, [steps.BRIDGE, setExecutionTime])
}
