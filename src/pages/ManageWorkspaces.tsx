import Sidebar from '../components/shared/Sidebar'
import { FaPlus } from 'react-icons/fa6'
import WorkspaceCard from '../components/card/WorkspaceCard'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { useEffect, useState } from 'react'
import { createWorkspace, getWorkspacesByUser } from '../redux/slice/workspaceSlice'
import DialogDemo from '@/components/shared/shared/Modal'
import WorkspaceForm from '@/components/shared/forms/WorkspaceForm'
import { z } from 'zod'
import { workspaceShema } from '@/schema/modal'
import toast from 'react-hot-toast'
import { handleAxiosError } from '@/util/helpers'
import { AxiosError } from 'axios'
import { selectSidebarOpen } from '@/redux/features/sidebarSlice'

export type workspaceData = z.infer<typeof workspaceShema>

export default function ManageWorkspacesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const isOpen = useSelector(selectSidebarOpen)
    const dispatch = useDispatch<AppDispatch>()
    const { workspaces } = useSelector((state: RootState) => state.workspaces)

    useEffect(() => {
        dispatch(getWorkspacesByUser())
    }, [dispatch])

    const handleWorkspaceSubmit = async (data: workspaceData) => {
        try {
            const { meta: responseData } = await dispatch(createWorkspace({ ...data }))
            if (responseData.requestStatus === 'fulfilled') {
                toast.success('You have successfully created a workspace!')
                dispatch(getWorkspacesByUser())
                setIsModalOpen(false)
            } else {
                toast.error('Creating workspace failed')
            }
        } catch (error) {
            handleAxiosError(error as AxiosError)
        }
    }
    return (
        <div>
            <div className="flex w-full">
                <Sidebar />
                <div
                    className={`w-full bg-white flex-1 transition-all duration-300 ${isOpen ? 'ml-84' : 'ml-20'}`}
                >
                    <div className="w-full shadow-md  py-7 px-5 flex justify-between items-center">
                        <p className="text-xl font-bold">Workspaces</p>
                        <button
                            className="flex items-center gap-x-2 bg-primary-500 rounded-lg text-white px-3 py-2 md:px-5 md:py-3 cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <FaPlus />
                            <span className="hidden sm:inline">New Work Space</span>
                            <span className="sm:hidden">New</span>
                        </button>
                    </div>
                    <div className="pt-15">
                        <div className="flex items-center justify-between mx-4 md:mx-16  text-base md:text-xl font-bold">
                            <p>Workspace</p>
                            <p>Creation date</p>
                        </div>
                        <div className="mt-7 flex flex-col gap-y-2 mx-8">
                            {workspaces.length > 0 ? (
                                workspaces
                                    .filter(workspace => workspace != null)
                                    .map(workspace => {
                                        if (!workspace) return null
                                        const { id, name, created_at: creationDate } = workspace
                                        return (
                                            <WorkspaceCard
                                                key={id}
                                                id={id}
                                                name={name}
                                                creationDate={creationDate}
                                            ></WorkspaceCard>
                                        )
                                    })
                            ) : (
                                <p className="mx-auto mt-8 text-xl">You don't have any workspace</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {
                <DialogDemo
                    title="Create workspace"
                    isModalOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <WorkspaceForm handleWorkspaceSubmit={handleWorkspaceSubmit} />
                </DialogDemo>
            }
        </div>
    )
}
