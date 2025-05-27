import StartTimer from '@/assets/icons/StartTmer'
import TimerSwitch from '@/components/ui/TimerSwitch'
import TrackerInput from '@/components/ui/TrackerInput'
import { OutletContextType } from '@/util/interfaces'
import { Download } from 'lucide-react'

import { useOutletContext } from 'react-router-dom'

export default function TimeTracker() {
    const { workspaceName } = useOutletContext<OutletContextType>()
    return (
        <div>
            <div className="w-full shadow-md py-7 px-9 flex justify-between items-center bg-white">
                <p className="text-xl font-bold flex gap-x-4 items-center justify-center">
                    {workspaceName}
                    <Download className="text-primary-500 w-5 h-5" />
                </p>
                <div className="w-1/3 flex items-center gap-x-2">
                    <TrackerInput
                        id="description"
                        placeholder="Add a description"
                        variant="md"
                        hasIcon={true}
                    />
                    <StartTimer className="text-primary-500 w-12 h-12" />
                    <TimerSwitch
                        defaultMode="play"
                        onToggle={mode => console.log(`Switched to ${mode} mode`)}
                    />
                </div>
            </div>
        </div>
    )
}
