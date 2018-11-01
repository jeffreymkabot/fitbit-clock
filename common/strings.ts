export function leftPad(s: any, length: number, padChar?: string) {
	const char = (padChar || ' ').charAt(0)
	let out = String(s)
	while (out.length < length) {
		out = char + out
	}
	return out
}
