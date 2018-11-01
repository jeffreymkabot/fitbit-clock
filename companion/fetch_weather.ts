import { Location, Weather } from '../common/weather'
import { geolocation } from 'geolocation'

export async function getLocation(): Promise<Location> {
	return new Promise<Location>((resolve, reject) => {
		geolocation.getCurrentPosition(pos => {
			const { latitude, longitude } = pos.coords
			if (latitude == null || longitude == null) {
				reject(new Error('Missing coordinates.'))
				return
			}
			resolve({ latitude, longitude })
		}, reject)
	})
}

export async function getWeather(loc: Location): Promise<Weather> {
	// TODO weather api
	const weather: Weather = {
		timestamp: String(Date.now()),
		temperature: 70,
		condition: 'clear',
		location: { ...loc }
	}
	return weather
}
