import { me, LaunchReasons } from 'companion'
import { getLocation, getWeather } from './fetch_weather'
import { send } from '../common/message_bus'

me.wakeInterval = 5 * 60 * 1000
me.monitorSignificantLocationChanges = true

if (me.launchReasons.settingsChanged) {
	console.log('settings changed')
	send({
		type: 'setting',
		data: {
			key: 'placeholder',
			value: 'placeholder'
		}
	})
} else {
	updateWeather()
}

async function updateWeather() {
	try {
		const loc = await getLocation()
		const weather = await getWeather(loc)
		send({
			type: 'weather',
			data: weather
		})
	} catch (exc) {
		console.error('failed to poll weather', exc)
		if (exc instanceof Error && exc.stack) {
			console.error(exc.stack)
		}
	}
}
