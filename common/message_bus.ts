import { peerSocket } from 'messaging'
import { Weather } from './weather'

/**
 * Message is a discriminated union that describes the values that can be sent over the peerSocket.
 */
export type Message = Msg<'weather', Weather> | Msg<'setting', SettingChange>

export type Msg<Type extends string, Value> = {
	type: Type
	data: Value
}

export type SettingChange = Pick<
	StorageChangeEvent,
	'key' | 'newValue' | 'oldValue'
>

/**
 * MessageBus is a wrapper around the peerSocket.
 *
 * messageBus is an exported singleton instance of this class.
 *
 * This didn't need to be a class but I felt the send and subscribe messages needed to be better
 * separated from the other members of this module.
 */
class MessageBus {
	buffer: Message[] = []

	constructor() {
		peerSocket.onopen = () => {
			while (this.buffer.length) {
				peerSocket.send(this.buffer.shift())
			}
		}
	}

	send(msg: Message) {
		this.buffer.push(msg)
		if (peerSocket.readyState === peerSocket.OPEN) {
			while (this.buffer.length) {
				peerSocket.send(this.buffer.shift())
			}
		}
	}

	subscribe(handle: (msg: Message) => void) {
		peerSocket.addEventListener('message', evt => {
			handle(evt.data)
		})
	}
}

/**
 * messageBus provides a unified interface to the peerSocket.
 */
export const messageBus = new MessageBus()
