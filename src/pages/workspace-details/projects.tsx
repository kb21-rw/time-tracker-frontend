import CreateProjectForm from '@/components/shared/forms/CreateProject'
import RenameProject from '@/components/shared/forms/RenameProject'
import Modal from '@/components/shared/modal/Modal'
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

    const handleEditClick = (rowData: Project) => {
        setEditProjectModal(true)
        setSelectedRow(rowData)
    }

    const columns = ProjectTableColumns({
        onEditClick: handleEditClick,
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
            <div className="w-full flex flex-col items-center">
                <div className="w-full flex justify-start sm:justify-between px-4 py-6 sm:px-9 sm:py-12 font-bold text-xl">
                    <p>Projects</p>
                </div>
                <div className="flex justify-center w-full">
                    <div className="mx-auto w-full max-w-xs sm:max-w-full px-2 sm:px-0">
                        <DataTable
                            tableName="projects"
                            columns={columns}
                            data={projects}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
            {
                <Modal
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
                </Modal>
            }
            {
                <Modal
                    title="Create Project"
                    isModalOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <CreateProjectForm setCreateProjectModal={setIsModalOpen} />
                </Modal>
            }
        </>
    )
}
