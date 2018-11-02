import clock from 'clock'
import document from 'document'
import { dateString, timeString } from '../common/dates'
import { getHeartRate } from './heartrate'
import { getActivity } from './activity'
import { messageBus } from '../common/message_bus'
import { Weather } from '../common/weather'
import { HeartRateSensorReading } from 'heart-rate'
import { Activity } from 'user-activity'

const timeEl = document.getElementById('clock')
const dateEl = document.getElementById('date')
const heartrateEl = document.getElementById('heartrate')

const state: State = {
	date: new Date()
}
render(state)

clock.granularity = 'seconds'
clock.ontick = evt => {
	state.date = evt.date
	state.activity = getActivity()

	const { heartRate, timestamp } = getHeartRate()
	state.heartRate = heartRate
	state.heartRateTimestamp = timestamp

	render(state)
}

messageBus.subscribe(msg => {
	console.log('received message from companion', JSON.stringify(msg))
	if (msg.type === 'weather') {
		state.weather = msg.data
	}
})

interface State {
	date: Date

	heartRate?: HeartRateSensorReading['heartRate']
	heartRateTimestamp?: HeartRateSensorReading['timestamp']
	lastHeartRateTimestamp?: HeartRateSensorReading['timestamp']

	activity?: Activity
	weather?: Weather
}

function render(state: State) {
	timeEl.text = timeString(state.date)
	dateEl.text = dateString(state.date)

	// only display the heartrate sample if it is newer than the last reading
	const cur = state.heartRateTimestamp || 0
	const prev = state.lastHeartRateTimestamp || 0
	let hrText = '--'
	if (cur > prev && state.heartRate) {
		hrText = String(state.heartRate)
		state.lastHeartRateTimestamp = state.heartRateTimestamp
	}
	heartrateEl.text = hrText

	if (state.weather) {
		// TODO indication when the weather reading is old
	}
}
