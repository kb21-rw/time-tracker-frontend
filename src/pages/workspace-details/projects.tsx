import CreateProjectForm from '@/components/shared/forms/CreateProject'
import RenameProject from '@/components/shared/forms/RenameProject'
import DialogDemo from '@/components/shared/modal/Modal'
import WorkspaceHeader from '@/components/shared/ui/WorkspaceHeader'
import DataTable from '@/components/tables/DataTable'
import { ProjectTableColumns } from '@/components/tables/ProjectsTableColumns'
import { getProjectsByWorkspaceId } from '@/redux/slice/projectSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { OutletContextType, Project } from '@/util/interfaces'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'

export default function ProjectPage() {
    const { workspaceName, id } = useOutletContext<OutletContextType>()
    const dispatch = useDispatch<AppDispatch>()
    const { projects, loading } = useSelector((state: RootState) => state.projects)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editProjectModal, setEditProjectModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState<Project | null>(null)

    const columns = ProjectTableColumns({
        setEditProjectModal,
        setSelectedRow,
    })

    useEffect(() => {
        dispatch(getProjectsByWorkspaceId(id!))
    }, [dispatch])

    return (
        <>
            <WorkspaceHeader
                workspaceName={workspaceName}
                buttonText="Project"
                setIsModalOpen={setIsModalOpen}
            />
            <div className="w-full">
                <div className="w-full flex justify-between px-9 py-12 font-bold text-xl">
                    <p>Projects</p>
                </div>
                <DataTable
                    tableName="projects"
                    columns={columns}
                    data={projects}
                    loading={loading}
                />
            </div>
            {
                <DialogDemo
                    title="Edit Project"
                    isModalOpen={editProjectModal}
                    onClose={() => setEditProjectModal(false)}
                >
                    <RenameProject
                        projectName={selectedRow?.name}
                        projectId={selectedRow?.id}
                        clientId={selectedRow?.client.id}
                        setEditProjectModal={setEditProjectModal}
                    />
                </DialogDemo>
            }
            {
                <DialogDemo
                    title="Create Project"
                    isModalOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <CreateProjectForm setCreateProjectModal={setIsModalOpen} />
                </DialogDemo>
            }
        </>
    )
}
