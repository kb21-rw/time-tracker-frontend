import { ArrowRight } from 'lucide-react'
// import { Input } from '../shadcn/input'
import { Calendar24 } from '../shadcn/datePicker'

export default function ManualTimeForm() {
    return (
        <>
            <Calendar24 />
            {/* <Input
                type="time"
                className="w-30 border border-black/70 text-black/70 focus:outline-none focus:ring-1"
                defaultValue={new Date().toISOString().substring(11, 16)}
            /> */}
        </>
    )
}
