import clock from 'clock'
import document from 'document'
import { dateString, timeString } from '../common/dates'
import { getHeartRate } from './heartrate'
import { getActivity } from './activity'
import { subscribe } from '../common/message_bus'
import { Weather } from '../common/weather'

const clockEl = document.getElementById('clock')
const dateEl = document.getElementById('date')
const heartrateEl = document.getElementById('heartrate')

clock.granularity = 'seconds'
clock.ontick = evt => {
	tick(evt.date)
	updateMetrics()
}

tick(new Date())
updateMetrics()

subscribe(msg => {
	if (msg.type === 'weather') {
		const data: Weather = msg.data
		console.log('message from companion', JSON.stringify(data))
	}
})

function tick(d: Date) {
	clockEl.text = timeString(d)
	dateEl.text = dateString(d)
}

function updateMetrics() {
	const hr = getHeartRate()
	const activity = getActivity()
	heartrateEl.text = String(hr || '--')
	activity // TODO
}
