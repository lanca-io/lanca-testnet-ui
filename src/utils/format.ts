/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
export const capitalizeFirstLetter = (str: string): string => {
	if (!str) {
		return ''
	}
	return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Formats a number to a specified number of decimal places.
 * If the value is less than the threshold defined by the decimal places,
 * it returns a string representation of the threshold value.
 * Otherwise, it formats the number to the specified number of decimal places,
 * removing any trailing zeros.
 * @param value - The number to format.
 * @param decimalPlaces - The number of decimal places to include.
 * @returns The formatted number as a string.
 */
export function format(value: number, decimalPlaces: number = 2, symbol?: string): string {
	if (value === 0) return '0'

	const absValue = Math.abs(value)
	const formattedValue =
		absValue < Number(`0.${'0'.repeat(decimalPlaces - 1)}1`)
			? `<${symbol || ''}0.${'0'.repeat(decimalPlaces - 1)}1`
			: `${symbol || ''}${absValue.toFixed(decimalPlaces).replace(/\.?0+$/, '')}`

	return value < 0 ? `-${formattedValue}` : formattedValue
}

/**
 * Truncates a text to a specified length and adds an ellipsis if it exceeds that length.
 * @param text - The text to truncate.
 * @param maxLength - The maximum length of the text before truncation.
 * @returns The truncated text with an ellipsis if it exceeds the specified length.
 */
export const truncateText = (text: string, maxLength: number): string => {
	return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
}
