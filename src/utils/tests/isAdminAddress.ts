import { Address } from 'viem'
const ADMIN_ADDRESSES: string[] = Array.from(new Set(['0x5B694fF6592F77958621595F94bFFa05aC0724A1'])).map(addr =>
	addr.toLowerCase().trim(),
)

export const isAdminAddress = (address?: string | Address): boolean => {
	if (!address) return false
	const normalizedAddress = address?.toLowerCase().trim() ?? ''
	return ADMIN_ADDRESSES.includes(normalizedAddress)
}
