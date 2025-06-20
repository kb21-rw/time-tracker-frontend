'use client'
import * as React from 'react'
import { Button } from '../shadcn/button'
import { Calendar } from '../shadcn/calendar'
import { Input } from '../shadcn/input'
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn/popover'

export function Calendar24() {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const [startTime, setStartTime] = React.useState<string>('00:00:00')
    const [endTime, setEndTime] = React.useState<string>('00:00:00')

    function getDuration(start: string, end: string) {
        const toSec = (t: string) =>
            t.split(':').reduce((s, v, i) => s + Number(v) * [3600, 60, 1][i], 0)
        let diff = toSec(end) - toSec(start)
        if (diff < 0) diff += 86400
        return [Math.floor(diff / 3600), Math.floor(diff / 60) % 60, diff % 60]
            .map(n => n.toString().padStart(2, '0'))
            .join(':')
    }
    const displayValue = date
        ? `${getDuration(startTime, endTime)} ${date.getDate().toString().padStart(2, '0')}/${(
              date.getMonth() + 1
          )
              .toString()
              .padStart(2, '0')}`
        : '00:00:00'
    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(e.target.value)
    }
    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndTime(e.target.value)
    }

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate)
    }

    const handleDone = () => {
        setOpen(false)
    }

    return (
        <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date-time"
                        className="w-32 justify-between font-normal pr-12"
                    >
                        {displayValue}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-4 mr-4" align="start">
                    <div className="flex flex-col gap-4 items-center">
                        <div className="flex gap-4">
                            <label className="flex flex-col items-start">
                                <span className="mb-1 text-sm font-medium">Start</span>
                                <Input
                                    type="time"
                                    id="start-time"
                                    step="1"
                                    value={startTime}
                                    onChange={handleStartTimeChange}
                                    className="bg-background appearance-none pr-11 w-32"
                                />
                            </label>
                            <label className="flex flex-col items-start">
                                <span className="mb-1 text-sm font-medium">Stop</span>
                                <Input
                                    type="time"
                                    id="stop-time"
                                    step="1"
                                    value={endTime}
                                    onChange={handleEndTimeChange}
                                    className="bg-background appearance-none pr-11 w-32"
                                />
                            </label>
                        </div>
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={handleDateSelect}
                        />
                        <Button onClick={handleDone} className="self-end bg-primary-500" size="sm">
                            Done
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
