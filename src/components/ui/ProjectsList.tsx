import { OutletContextType, Project, ProjectSelection, ProjectsListProps } from '@/util/interfaces'
import { Popover, PopoverAnchor, PopoverContent } from '../shadcn/popover'
import { groupProjectsByClient } from '@/util/helpers'
import { AppDispatch, RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { getProjectsByWorkspaceId } from '@/redux/slice/projectSlice'
import LoadingSpinner from '../shared/ui/LoadingSpinner'
import { useClickAway } from 'react-use'

export default function ProjectsList({
    isModalOpen,
    onClose,
    anchorRef,
    setProject,
}: Readonly<ProjectsListProps>) {
    const outletContext = useOutletContext<OutletContextType>()
    const popoverRef = useRef(null)
    const dispatch = useDispatch<AppDispatch>()
    const { projects, loading } = useSelector((state: RootState) => state.projects)
    const { workspaces } = useSelector((state: RootState) => state.workspaces)
    const [workspaceInfo, setWorkspaceInfo] = useState({ id: '', workspaceName: '' })
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const isAdmin = user.roles === 'Admin'
    const id = outletContext?.id
    const workspaceName = outletContext?.workspaceName

    useEffect(() => {
        if (isAdmin) {
            if (id && workspaceName) {
                setWorkspaceInfo({ id, workspaceName })
                dispatch(getProjectsByWorkspaceId(id))
            }
            return
        }

        if (workspaces.length === 0) {
            return
        }

        const [firstWorkspace] = workspaces
        setWorkspaceInfo({
            id: firstWorkspace.id,
            workspaceName: firstWorkspace.name,
        })

        dispatch(getProjectsByWorkspaceId(firstWorkspace.id))
    }, [dispatch, isAdmin, id, workspaceName, workspaces])

    const [selectedClient, setSelectedClient] = useState<string | null>(null)
    const [selectedProject, setSelectedProject] = useState<ProjectSelection | null>(null)

    const grouped = groupProjectsByClient(projects)

    const handleProjectSelect = (project: Omit<Project, 'client'>, clientName: string) => {
        const projectSelection: ProjectSelection = {
            id: project.id,
            name: project.name,
            clientName: clientName,
            displayName: `${project.name}/${clientName}`,
        }

        setSelectedClient(clientName)
        setSelectedProject(projectSelection)

        setProject(project.id, projectSelection.displayName)
        onClose()
    }

    useClickAway(popoverRef, e => {
        e.preventDefault?.()
        e.stopPropagation?.()
        if (isModalOpen) {
            onClose()
        }
    })
    return (
        <Popover open={isModalOpen} modal={true}>
            <PopoverAnchor
                virtualRef={anchorRef?.current ? { current: anchorRef.current } : undefined}
            />
            <PopoverContent ref={popoverRef} className="z-99 p-4 mt-2 shadow-lg">
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
                                    {clientProjects.map(project => (
                                        <li key={project.id} className="leading-7">
                                            <button
                                                className={`cursor-pointer ${
                                                    selectedClient === clientName &&
                                                    selectedProject?.id === project.id
                                                        ? 'font-bold'
                                                        : ''
                                                }`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    handleProjectSelect(project, clientName)
                                                }}
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
