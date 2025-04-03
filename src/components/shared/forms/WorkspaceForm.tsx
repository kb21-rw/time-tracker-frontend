import Input from '../ui/Input'
import Button from '../ui/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { createWorkspace } from '../../../redux/slice/workspaceSlice'
import toast from 'react-hot-toast'
import { handleAxiosError } from '../../../util/helpers'
import { AxiosError } from 'axios'
import { workspaceShema } from '../../../schema/workspace'
import { User } from '../../../util/interfaces'

type workspaceData = z.infer<typeof workspaceShema>
function WorkspaceForm() {
    const dispatch = useDispatch<AppDispatch>()
    const { error } = useSelector((state: RootState) => state.workspace)
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(workspaceShema),
        mode: 'all',
        defaultValues: { name: '' },
    })
    const onSubmit = async (data: workspaceData) => {
        try {
            const user = localStorage.getItem('user') as unknown as User

            if (user) {
                const { meta: responseData } = await dispatch(createWorkspace({ ...data, user }))
                if (responseData.requestStatus === 'fulfilled') {
                    toast.success('You have successfully created a workspace!')
                } else {
                    toast.error('creating workspace failed')
                }
            }
        } catch (error) {
            handleAxiosError(error as AxiosError)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button className="w-full" disabled={!isValid}>
                Create WorkSpace
            </Button>
        </form>
    )
}

export default WorkspaceForm
