import { peerSocket } from 'messaging'
import { Weather } from './weather'

interface MessageTypes {
	weather: Weather
	setting: {
		key: string
		value: string
	}
}

/**
 * Message is a discriminated union.
 * The type property indicates the shape of the data.
 */
export interface Message<T extends keyof MessageTypes> {
	type: T
	data: MessageTypes[T]
}

const buffer: Message<any>[] = []

export function send<T extends keyof MessageTypes>(msg: Message<T>) {
	buffer.push(msg)
	if (peerSocket.readyState === peerSocket.OPEN) {
		while (buffer.length) {
			peerSocket.send(buffer.shift())
		}
	}
}

export function subscribe(handle: (msg: Message<any>) => void) {
	peerSocket.addEventListener('message', evt => {
		handle(evt.data)
	})
}

peerSocket.onopen = () => {
	while (buffer.length) {
		peerSocket.send(buffer.shift())
	}
}
