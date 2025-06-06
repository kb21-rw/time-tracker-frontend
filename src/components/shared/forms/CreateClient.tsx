import Button from '../ui/Button'
import Input from '../ui/Input'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { clientSchema } from '@/schema/modal'
import { createClient, getWorkspaceClients } from '@/redux/slice/clientSlice'
import toast from 'react-hot-toast'
import { handleAxiosError } from '@/util/helpers'
import { AxiosError } from 'axios'
import { CreateClientProps, OutletContextType } from '@/util/interfaces'
import { useOutletContext } from 'react-router-dom'
type clientData = z.infer<typeof clientSchema>
function CreateClient({ setIsModalOpen }: CreateClientProps) {
    const { id } = useOutletContext<OutletContextType>()
    const dispatch = useDispatch<AppDispatch>()
    const { loading } = useSelector((state: RootState) => state.clients)
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<clientData>({ resolver: zodResolver(clientSchema), mode: 'all' })

    const handleCreateClient = async (data: clientData) => {
        try {
            const { meta: responseData } = await dispatch(
                createClient({
                    workspaceId: id!,
                    name: data.name,
                }),
            )

            if (responseData.requestStatus === 'fulfilled') {
                dispatch(getWorkspaceClients(id!))
                toast.success('You have successfully created a new client')
                setIsModalOpen(false)
            } else {
                toast.error('Failed to create a new client')
            }
        } catch (error) {
            handleAxiosError(error as AxiosError)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreateClient)}>
            <Input
                label="Enter Client Name"
                placeholder="Enter Client Name"
                id="clientname"
                register={register('name')}
                error={errors.name}
            />

            <div className="flex justify-center w-full mt-4">
                <Button className="w-1/2" disabled={!isValid} isLoading={loading}>
                    Create Client
                </Button>
            </div>
        </form>
    )
}

export default CreateClient
