import { TimerRunnerProps } from '@/util/interfaces'
import React, { useEffect, useState } from 'react'
import { useStopwatch } from 'react-timer-hook'

export default function TimerRunner({ isRunning, startTimestamp }: TimerRunnerProps) {
    const [key, setKey] = useState(0)

    useEffect(() => {
        setKey(prev => prev + 1)
    }, [startTimestamp])

    return <StopwatchInner key={key} isRunning={isRunning} startTimestamp={startTimestamp} />
}

const StopwatchInner: React.FC<TimerRunnerProps> = ({ isRunning, startTimestamp }) => {
    const { seconds, minutes, hours, start, pause } = useStopwatch({
        autoStart: false,
        offsetTimestamp: startTimestamp ? new Date(startTimestamp) : undefined,
    })

    useEffect(() => {
        if (isRunning && startTimestamp) start()
        else pause()
    }, [isRunning, startTimestamp, start, pause])

    const format = (n: number) => n.toString().padStart(2, '0')

    return (
        <div>
            <p
                className={`text-2xl font-medium text-center ${isRunning ? 'text-black/70' : 'text-black/30'}`}
            >
                {format(hours)}:{format(minutes)}:{format(seconds)}
            </p>
        </div>
    )
}
