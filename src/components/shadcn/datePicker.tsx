import * as React from 'react'
import { Button } from '../shadcn/button'
import { Calendar } from '../shadcn/calendar'
import { Input } from '../shadcn/input'
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn/popover'
import { ManualEntryValues } from '@/util/interfaces'

interface Calendar24Props {
    manualEntry: ManualEntryValues
    setManualEntry: React.Dispatch<React.SetStateAction<ManualEntryValues>>
}

export function Calendar24({ manualEntry, setManualEntry }: Calendar24Props) {
    const [open, setOpen] = React.useState(false)

    function getDuration(start: string, end: string) {
        const toSec = (t: string) =>
            t.split(':').reduce((s, v, i) => s + Number(v) * [3600, 60, 1][i], 0)
        let diff = toSec(end) - toSec(start)
        if (diff < 0) diff += 86400
        return [Math.floor(diff / 3600), Math.floor(diff / 60) % 60, diff % 60]
            .map(n => n.toString().padStart(2, '0'))
            .join(':')
    }

    const displayValue = manualEntry.date
        ? `${getDuration(manualEntry.startTime, manualEntry.endTime)} ${manualEntry.date ?? ''}`
        : '00:00:00'

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setManualEntry(prev => ({ ...prev, startTime: e.target.value }))
    }
    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setManualEntry(prev => ({ ...prev, endTime: e.target.value }))
    }

    // Fix: Update only the date property
    const handleDateChange = (selectedDate: Date | undefined) => {
        if (!selectedDate) return
        // Format date as YYYY-MM-DD
        const formattedDate = selectedDate.toISOString().split('T')[0]
        setManualEntry(prev => ({ ...prev, date: formattedDate }))
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
                                    value={manualEntry.startTime}
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
                                    value={manualEntry.endTime}
                                    onChange={handleEndTimeChange}
                                    className="bg-background appearance-none pr-11 w-32"
                                />
                            </label>
                        </div>
                        <Calendar
                            mode="single"
                            selected={manualEntry.date ? new Date(manualEntry.date) : undefined}
                            captionLayout="dropdown"
                            onSelect={handleDateChange} // <-- Fixed here
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
