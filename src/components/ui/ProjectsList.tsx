import { OutletContextType, ProjectsListProps } from '@/util/interfaces'
import { Popover, PopoverAnchor, PopoverContent } from '../shadcn/popover'
import { groupProjectsByClient } from '@/util/helpers'
import { AppDispatch, RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'
import { getProjectsByWorkspaceId } from '@/redux/slice/projectSlice'
import LoadingSpinner from '../shared/ui/LoadingSpinner'

export default function ProjectsList({ isModalOpen, onClose, anchorRef }: ProjectsListProps) {
    const { id } = useOutletContext<OutletContextType>()
    const dispatch = useDispatch<AppDispatch>()
    const { projects, loading } = useSelector((state: RootState) => state.projects)

    useEffect(() => {
        dispatch(getProjectsByWorkspaceId(id!))
    }, [dispatch])

    const grouped = groupProjectsByClient(projects)
    return (
        <Popover open={isModalOpen} onOpenChange={onClose}>
            {anchorRef?.current && <PopoverAnchor virtualRef={{ current: anchorRef.current }} />}
            <PopoverContent className="p-4 mt-2 shadow-lg">
                <h1 className="font-bold ml-2">Select Project</h1>
                {loading ? (
                    <LoadingSpinner />
                ) : projects.length === 0 ? (
                    <p className="text-center text-primary-500">No projects found</p>
                ) : (
                    <>
                        {Object.entries(grouped).map(([clientName, projectNames]) => (
                            <div key={clientName} className="font-inter space-y-2">
                                <h2 className="font-bold mx-6 my-2">{clientName}</h2>
                                <ul className="ml-14 list-disc marker:text-primary-500 text-primary-800">
                                    {projectNames.map((name, idx) => (
                                        <li key={idx} className="leading-7">
                                            {name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>
                )}
            </PopoverContent>
        </Popover>
    )
}
