import { TimerRunnerProps } from '@/util/interfaces'
import React, { useEffect, useState } from 'react'

export default function TimerRunner({ isRunning, startTimestamp }: TimerRunnerProps) {
    const [key, setKey] = useState(0)

    useEffect(() => {
        if (isRunning && startTimestamp) {
            setKey(prev => prev + 1)
        }
    }, [startTimestamp])

    return <StopwatchInner key={key} isRunning={isRunning} startTimestamp={startTimestamp} />
}

const StopwatchInner: React.FC<TimerRunnerProps> = ({ isRunning, startTimestamp }) => {
    const [currentTime, setCurrentTime] = useState(Date.now())

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setCurrentTime(Date.now())
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [isRunning])

    const elapsedTime = startTimestamp ? Math.floor((currentTime - startTimestamp) / 1000) : 0

    const hours = Math.floor(elapsedTime / 3600)
    const minutes = Math.floor((elapsedTime % 3600) / 60)
    const seconds = elapsedTime % 60

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
