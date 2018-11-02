import { HeartRateSensor, HeartRateSensorReading } from 'heart-rate'

// TODO turn off sensor when display is off / watch is off-wrist to save battery
let hrm: HeartRateSensor
export function getHeartRate(): HeartRateSensorReading {
	if (!hrm) {
		hrm = new HeartRateSensor({ frequency: 1 })
		hrm.start()
	}
	return { heartRate: hrm.heartRate, timestamp: hrm.timestamp }
}
