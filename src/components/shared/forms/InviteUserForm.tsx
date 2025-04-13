import Input from '../ui/Input'
import Button from '../ui/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { inviteUserSchema } from '../../../schema/modal'

type inviteUserData = z.infer<typeof inviteUserSchema>

interface InviteUserFormProps {
    workspaceId: string
    handleWorkspaceSubmit: (workspaceId: string, data: inviteUserData) => void
}
function InviteUserForm({ workspaceId, handleWorkspaceSubmit }: Readonly<InviteUserFormProps>) {
    const { loading, error } = useSelector((state: RootState) => state.workspaces)
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(inviteUserSchema),
        mode: 'all',
        defaultValues: { fullName: '', email: '' },
    })

    const handleInviteSubmit = (data: inviteUserData) => {
        handleWorkspaceSubmit(workspaceId, data)
    }

    return (
        <form onSubmit={handleSubmit(handleInviteSubmit)}>
            <Input
                label="User’s Full Name"
                id="fullName"
                register={register('fullName')}
                error={errors.fullName}
            />
            {error && (
                <p className="text-red-500 text-sm mt-2">
                    {typeof error === 'string' ? error : JSON.stringify(error)}
                </p>
            )}
            <Input
                label="User's Email"
                id="email"
                register={register('email')}
                error={errors.email}
            />
            {error && (
                <p className="text-red-500 text-sm mt-2">
                    {typeof error === 'string' ? error : JSON.stringify(error)}
                </p>
            )}
            <Button className="w-full" disabled={!isValid} isLoading={loading}>
                Send an Invite
            </Button>
        </form>
    )
}

export default InviteUserForm
