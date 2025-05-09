import Input from '../ui/Input'
import Button from '../ui/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { workspaceShema } from '../../../schema/modal'
import { workspaceData } from '@/pages/ManageWorkspaces'

interface WorkspaceFormProps {
    handleWorkspaceSubmit: (data: workspaceData) => void
}
function WorkspaceForm({ handleWorkspaceSubmit }: Readonly<WorkspaceFormProps>) {
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
        <form onSubmit={handleSubmit(handleWorkspaceSubmit)}>
            <Input
                label="Enter workSpace name"
                placeholder="Enter workSpace name"
                id="fullName"
                register={register('name')}
                error={errors.name}
            />
            {error && (
                <p className="text-red-500 text-sm mt-2">
                    {typeof error === 'string' ? error : JSON.stringify(error)}
                </p>
            )}
            <Button className="w-full" disabled={!isValid} isLoading={loading}>
                Create WorkSpace
            </Button>
        </form>
    )
}

export default WorkspaceForm
