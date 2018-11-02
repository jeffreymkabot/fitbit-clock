import { me } from 'companion'
import { getLocation, getWeather } from './fetch_weather'
import { messageBus } from '../common/message_bus'
import { settingsStorage } from 'settings'

me.wakeInterval = 5 * 60 * 1000
me.monitorSignificantLocationChanges = true

settingsStorage.onchange = evt => {
	messageBus.send({
		type: 'setting',
		data: {
			key: evt.key,
			newValue: evt.newValue,
			oldValue: evt.oldValue
		}
	})
}

if (me.launchReasons.settingsChanged) {
	console.log('settings changed')
	// TODO what setting was changed???
} else {
	updateWeather()
}

async function updateWeather() {
	try {
		const loc = await getLocation()
		const weather = await getWeather(loc)
		messageBus.send({
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
