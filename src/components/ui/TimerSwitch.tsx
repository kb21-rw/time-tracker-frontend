import { useState } from 'react'
import { Play, Plus } from 'lucide-react'
import clsx from 'clsx'
import { VerticalToggleSwitchProps } from '@/util/interfaces'

export default function TimerSwitch({
    defaultMode = 'play',
    onToggle,
    className = '',
}: VerticalToggleSwitchProps) {
    const [mode, setMode] = useState<'play' | 'plus'>(defaultMode)

    const toggle = (newMode: 'play' | 'plus') => {
        setMode(newMode)
        onToggle?.(newMode)
    }

    return (
        <div
            className={clsx(
                'flex flex-col items-center space-y-1 bg-black/15 p-1 rounded-full',
                className,
            )}
        >
            <button
                onClick={() => toggle('play')}
                className={clsx(
                    'rounded-full flex justify-center items-center p-1 w-5 h-5 transition-colors cursor-grab',
                    mode === 'play'
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 text-primary-500 hover:bg-gray-300',
                )}
            >
                <Play strokeWidth={3} />
            </button>
            <button
                onClick={() => toggle('plus')}
                className={clsx(
                    'rounded-full flex items-center p-1 w-5 h-5 transition-colors cursor-grab',
                    mode === 'plus'
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 text-primary-500 hover:bg-gray-300',
                )}
            >
                <Plus strokeWidth={3} />
            </button>
        </div>
    )
}
