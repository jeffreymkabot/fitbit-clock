import { HeartRateSensor } from 'heart-rate'

let hrm: HeartRateSensor
export function getHeartRate() {
	if (!hrm) {
		hrm = new HeartRateSensor({ frequency: 1 })
		hrm.start()
	}
	return hrm.heartRate
}
