import Input from '../ui/Input'
import Button from '../ui/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { workspaceShema } from '../../../schema/modal'
import { getWorkspacesByUser, renameWorkspace } from '@/redux/slice/workspaceSlice'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { handleAxiosError } from '@/util/helpers'
import { workspaceData } from '@/pages/ManageWorkspaces'
import { WorkspaceModalSharedProps } from '@/util/interfaces'

export function RenameWorkspaceForm({ id, setIsModalOpen }: WorkspaceModalSharedProps) {
    const dispatch = useDispatch<AppDispatch>()
    const handleWorkspaceRenaming = async (data: workspaceData) => {
        try {
            const { meta: responseData } = await dispatch(renameWorkspace({ ...data, id }))
            if (responseData.requestStatus === 'fulfilled') {
                toast.success('You have successfully renamed your workspace!')
                setIsModalOpen(false)
                dispatch(getWorkspacesByUser())
            } else {
                toast.error('Renaming workspace failed')
            }
        } catch (error) {
            handleAxiosError(error as AxiosError)
        }
    }

    const { loading, error } = useSelector((state: RootState) => state.workspaces)
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(workspaceShema),
        mode: 'all',
        defaultValues: { name: '' },
    })

    return (
        <form onSubmit={handleSubmit(handleWorkspaceRenaming)}>
            <Input
                label="Rename workspace"
                placeholder="New workspace name"
                id="new Name"
                register={register('name')}
                error={errors.name}
            />
            {error && (
                <p className="text-red-500 text-sm mt-2">
                    {typeof error === 'string' ? error : JSON.stringify(error)}
                </p>
            )}
            <Button className="w-full" disabled={!isValid} isLoading={loading}>
                Save
            </Button>
        </form>
    )
}
