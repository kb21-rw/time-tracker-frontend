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

export const EditTimeLogSchema = z.object({
    description: z.string().optional(),
    projectId: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
})
export type EditTimeLogFormData = z.infer<typeof EditTimeLogSchema>
