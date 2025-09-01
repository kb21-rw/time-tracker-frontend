import { DateTimePicker } from '@/components/ui/DateTimePicker'
import { submitManualEntry, getUserTimeLogs } from '@/redux/slice/timeLogsSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { getUserCurrentTime, handleAxiosError } from '@/util/helpers'
import { TimeLogEntryValues, ManualTimeLogProps } from '@/util/interfaces'
import { AxiosError } from 'axios'
import { CirclePlus } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

function ManualTimeLog({ description, projectId, workspaceId: id, onSuccess }: ManualTimeLogProps) {
    const [startTime, setStartTime] = useState<Date>(new Date())
    const [endTime, setEndTime] = useState<Date>(new Date())
    const [resetKey, setResetKey] = useState(0) // Add key to force DateTimePicker reset
    const dispatch = useDispatch<AppDispatch>()
    const { loading } = useSelector((state: RootState) => state.timeLog)
    const { user } = useSelector((state: RootState) => state.auth)

    const handleSubmit = async () => {
        if (!startTime || !endTime) {
            toast.error('Please select both start and end times.')
            return
        }
        if (startTime >= endTime) {
            toast.error('End time must be after start time.')
            return
        }
        const payload: TimeLogEntryValues = {
            description,
            projectId,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
        }

        try {
            const { meta: response } = await dispatch(
                submitManualEntry({
                    id,
                    data: payload,
                }),
            )
            if (response.requestStatus === 'fulfilled') {
                toast.success('Manual time log created successfully!')
                // Clear the form after successful submission
                if (user) {
                    getUserCurrentTime(user)
                }

                dispatch(getUserTimeLogs(id))

                // Reset the DateTimePicker by changing the key
                setResetKey(prev => prev + 1)
                setStartTime(new Date())
                setEndTime(new Date())

                // Notify parent component to clear its form
                onSuccess?.()
            } else {
                toast.error('Failed to create manual time log.')
            }
        } catch (error) {
            handleAxiosError(error as AxiosError)
        }
    }

    return (
        <div className="flex items-center justify-center gap-4 p-4">
            <DateTimePicker
                key={resetKey} // Force reset when key changes
                setStartTime={setStartTime}
                setEndTime={setEndTime}
            />
            <CirclePlus
                className={`w-12 h-12 fill-primary-500 stroke-white cursor-grab ${loading ? 'animate-spin' : ''}`}
                onClick={handleSubmit}
            />
        </div>
    )
}

export default ManualTimeLog
