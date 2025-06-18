import { OutletContextType, ProjectsListProps } from '@/util/interfaces'
import { Popover, PopoverAnchor, PopoverContent } from '../shadcn/popover'
import { groupProjectsByClient } from '@/util/helpers'
import { AppDispatch, RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProjectsByWorkspaceId } from '@/redux/slice/projectSlice'
import LoadingSpinner from '../shared/ui/LoadingSpinner'

// Updated interface to handle both project ID and display name
interface ProjectSelection {
    id: string
    name: string
    clientName: string
    displayName: string // This will be "projectName/clientName"
}

export default function ProjectsList({
    isModalOpen,
    onClose,
    anchorRef,
    setProject,
}: Readonly<ProjectsListProps>) {
    const { id } = useOutletContext<OutletContextType>()
    const dispatch = useDispatch<AppDispatch>()
    const { projects, loading } = useSelector((state: RootState) => state.projects)

    useEffect(() => {
        dispatch(getProjectsByWorkspaceId(id!))
    }, [dispatch, id])

    const [selectedClient, setSelectedClient] = useState<string | null>(null)
    const [selectedProject, setSelectedProject] = useState<ProjectSelection | null>(null)

    const grouped = groupProjectsByClient(projects)

    const handleProjectSelect = (project: any, clientName: string) => {
        const projectSelection: ProjectSelection = {
            id: project.id, // Use actual project ID from backend
            name: project.name,
            clientName: clientName,
            displayName: `${project.name}/${clientName}`,
        }

        setSelectedClient(clientName)
        setSelectedProject(projectSelection)

        // Pass both the actual project ID and display name to parent
        setProject(project.id, projectSelection.displayName)
        onClose()
    }

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
                        {Object.entries(grouped).map(([clientName, clientProjects]) => (
                            <div key={clientName} className="font-inter space-y-2">
                                <h2 className="font-bold mx-6 my-2">{clientName}</h2>
                                <ul className="ml-14 list-disc marker:text-primary-500 text-primary-800">
                                    {clientProjects.map((project, idx) => (
                                        <li key={project.id || idx} className="leading-7">
                                            <button
                                                className={`cursor-pointer ${
                                                    selectedClient === clientName &&
                                                    selectedProject?.id === project.id
                                                        ? 'font-bold'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    handleProjectSelect(project, clientName)
                                                }
                                            >
                                                {project.name}
                                            </button>
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
