import { today, Activity } from 'user-activity'

export function getActivity(): Activity {
	return { ...today.adjusted }
}
