import { Form, useParams } from 'react-router-dom'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { ProjectSchema } from '@/schema/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RootState, AppDispatch } from '@/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { getWorkspaceClients } from '@/redux/slice/clientSlice'
import { useEffect } from 'react'
import DownArrow from '@/assets/icons/DownArrow'
import { RenameProjectProps } from '@/util/interfaces'
import { getProjectsByWorkspaceId, renameProject } from '@/redux/slice/projectSlice'
import toast from 'react-hot-toast'
import { handleAxiosError } from '@/util/helpers'
import { AxiosError } from 'axios'
import { z } from 'zod'
type renameProject = z.infer<typeof ProjectSchema>
export default function RenameProject({
    projectName,
    projectId,
    clientId: oldClientId,
    setEditProjectModal,
}: Readonly<RenameProjectProps>) {
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch<AppDispatch>()
    const { clients, error: clientsError } = useSelector((state: RootState) => state.clients)
    const { loading: isLoading } = useSelector((state: RootState) => state.projects)

    useEffect(() => {
        dispatch(getWorkspaceClients(id!))
    }, [dispatch])
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(ProjectSchema),
        mode: 'all',
        defaultValues: { clientId: oldClientId || '', name: projectName || '' },
    })

    async function handleProjectRename({ name, clientId }: renameProject) {
        try {
            const { meta: responseData } = await dispatch(
                renameProject({
                    workspaceId: id!,
                    clientId: oldClientId!,
                    name,
                    projectId: projectId!,
                    newClientId: clientId,
                }),
            )
            if (responseData.requestStatus === 'fulfilled') {
                toast.success('You have successfully renamed your project!')
                setEditProjectModal(false)
                dispatch(getProjectsByWorkspaceId(id!))
            } else {
                toast.error('Renaming project failed')
            }
        } catch (error) {
            handleAxiosError(error as AxiosError)
        }
    }

    return (
        <Form className="flex flex-col" onSubmit={handleSubmit(handleProjectRename)}>
            <div className="w-full max-w-3xl font-inter pb-6 text-xl">
                <div className="relative md:w-1/2">
                    <select
                        {...register('clientId')}
                        className="w-full appearance-none bg-transparent text-black text-lg font-normal pr-8 py-1 focus:outline-none cursor-pointer"
                    >
                        <option value="" disabled hidden>
                            Select Client
                        </option>
                        {clients.length > 0 ? (
                            clients.map(client => (
                                <option className="mx-6" key={client.id} value={client.id}>
                                    &nbsp;{client.name}
                                </option>
                            ))
                        ) : (
                            <option>No clients</option>
                        )}
                    </select>

                    <DownArrow className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
                </div>
                {clientsError && (
                    <p className="text-red-500 text-sm mt-2">
                        {typeof clientsError === 'string'
                            ? clientsError
                            : JSON.stringify(clientsError)}
                    </p>
                )}
            </div>
            <Input
                id="name"
                label="Rename Project"
                placeholder={`${projectName || 'new name'}`}
                error={errors.name}
                register={register('name')}
            />
            <Button
                className="self-center w-1/2"
                disabled={!isValid || isLoading}
                isLoading={isLoading}
                type="submit"
            >
                Save
            </Button>
        </Form>
    )
}
