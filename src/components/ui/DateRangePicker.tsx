'use client'
import * as React from 'react'
import { Button } from '../shadcn/button'
import { Calendar } from '../shadcn/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn/popover'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

export function DateRangePicker({
    start,
    end,
    onChange,
}: {
    start?: Date
    end?: Date
    onChange?: (range: { start: Date; end: Date }) => void
}) {
    const [open, setOpen] = React.useState(false)
    const [startDate, setStartDate] = React.useState<Date | undefined>(start)
    const [endDate, setEndDate] = React.useState<Date | undefined>(end)

    const handleStartSelect = (d: Date | undefined) => {
        if (!d) return
        setStartDate(d)
        // if end already chosen and it's before start, reset it
        if (endDate && d > endDate) setEndDate(undefined)
    }

    const handleEndSelect = (d: Date | undefined) => {
        if (!d) return
        setEndDate(d)
    }

    const applyRange = () => {
        if (startDate && endDate && onChange) {
            onChange({ start: startDate, end: endDate })
        }
        setOpen(false)
    }

    const display =
        startDate && endDate
            ? `${format(startDate, 'dd/MM/yyyy')} → ${format(endDate, 'dd/MM/yyyy')}`
            : 'Select range'

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        'w-60 justify-between font-normal hover:border-primary-500',
                        !(startDate && endDate) && 'text-muted-foreground',
                    )}
                >
                    {display}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="flex gap-6 p-4 w-auto">
                <div className="flex flex-col items-center">
                    <span className="mb-2 font-medium">Start Date</span>
                    <Calendar mode="single" selected={startDate} onSelect={handleStartSelect} />
                </div>
                <div className="flex flex-col items-center">
                    <span className="mb-2 font-medium">End Date</span>
                    <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={handleEndSelect}
                        disabled={
                            date => !!startDate && date < startDate // block dates before start
                        }
                    />
                </div>
                <Button className="self-end bg-primary-500 mt-2" size="sm" onClick={applyRange}>
                    Done
                </Button>
            </PopoverContent>
        </Popover>
    )
}
