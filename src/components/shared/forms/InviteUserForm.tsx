import Input from '../ui/Input'
import Button from '../ui/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { inviteUserSchema } from '../../../schema/modal'
import toast from 'react-hot-toast'
import { handleAxiosError } from '@/util/helpers'
import { AxiosError } from 'axios'
import { inviteUser } from '@/redux/slice/workspaceSlice'
import { ModalControlProps } from '@/util/interfaces'

type inviteUserData = z.infer<typeof inviteUserSchema>

function InviteUserForm({ id, setIsModalOpen }: Readonly<ModalControlProps>) {
    const { loading, error } = useSelector((state: RootState) => state.workspaces)
    const dispatch = useDispatch<AppDispatch>()

    async function handleInviteUser(userData: inviteUserData) {
        try {
            const { meta: responseData } = await dispatch(inviteUser({ userData, id }))

            if (responseData.requestStatus === 'fulfilled') {
                toast.success('You have successfully invited a new user to this workspace')
                setIsModalOpen(false)
            } else {
                toast.error('Failed to invite user')
            }
        } catch (error) {
            handleAxiosError(error as AxiosError)
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(inviteUserSchema),
        mode: 'all',
        defaultValues: { fullName: '', email: '' },
    })

    return (
        <form onSubmit={handleSubmit(handleInviteUser)}>
            <Input
                label="User’s full name"
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
                label="User's email"
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
                Send invite
            </Button>
        </form>
    )
}

export default InviteUserForm
