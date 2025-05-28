import { WorkspaceHeaderProps } from '@/util/interfaces'
import { Download, Plus } from 'lucide-react'

export default function WorkspaceHeader({
    workspaceName,
    buttonText,
    setIsModalOpen,
}: WorkspaceHeaderProps) {
    return (
        <div className="w-full shadow-md py-7 px-9 flex justify-between items-center bg-white">
            <p className="text-xl font-bold flex gap-x-4 items-center">
                {workspaceName}
                <Download className="text-primary-500 w-5 h-5" />
            </p>
            <button
                className="flex items-center gap-x-2 bg-primary-500 rounded-lg text-white px-3 py-2 md:px-5 md:py-3 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">New {buttonText}</span>
                <span className="sm:hidden">New</span>
            </button>
        </div>
    )
}
