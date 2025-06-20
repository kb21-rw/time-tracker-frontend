import { z } from 'zod'

export const TimeLogSchema = z.object({
    description: z.string().optional(),
    startTime: z.string().min(1, { message: 'Start time is required' }),
    endTime: z.string(),
    projectId: z.string().optional(),
})

export const TimerStartSchema = z.object({
    description: z.string().optional(),
    projectId: z.string().optional(),
})

export type TimerStartFormData = z.infer<typeof TimerStartSchema>
