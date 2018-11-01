import { leftPad } from './strings'

export function dateString(d: Date) {
	const day = d.getDay()
	const date = d.getDate()
	const month = d.getMonth()
	return `${days[day]} ${months[month]} ${leftPad(date, 2, '0')}`.toUpperCase()
}

export function timeString(d: Date) {
	const hours = d.getHours()
	const minutes = d.getMinutes()
	return `${hours % 12}:${leftPad(minutes, 2, '0')}`
}

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'Nov',
	'December'
]
