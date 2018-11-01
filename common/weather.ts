export interface Weather {
	timestamp: string
	temperature: number
	condition: Condition
	location: Location
}

export type Condition = 'clear' | 'clouds' | 'rain' | 'snow'

export interface Location {
	latitude: number
	longitude: number
}
