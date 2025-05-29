import { ArrowRight } from 'lucide-react'
import { Input } from '../shadcn/input'

export default function ManualTimeForm() {
    return (
        <>
            <Input
                type="time"
                className="w-30 border border-black/70 text-black/70 focus:outline-none focus:ring-1"
                defaultValue={new Date().toISOString().substring(11, 16)}
            />
            <ArrowRight className="text-primary-500 w-8 h-6" />
            <Input
                type="time"
                className="w-30 border border-black/70  text-black/70 focus:outline-none focus:ring-1"
                defaultValue={new Date().toISOString().substring(11, 16)}
            />
        </>
    )
}
