import { clientSchema } from '@/schema/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { OutletContextType, RenameClientProps } from '@/util/interfaces'
import { useOutletContext } from 'react-router-dom'
import { z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { getWorkspaceClients, renameClient } from '@/redux/slice/clientSlice'
import toast from 'react-hot-toast'
import { handleAxiosError } from '@/util/helpers'
import { AxiosError } from 'axios'

type createClientData = z.infer<typeof clientSchema>
export default function RenameClientForm({ client, setEditClientModal }: RenameClientProps) {
    const { id: workspaceId } = useOutletContext<OutletContextType>()
    const dispatch = useDispatch<AppDispatch>()
    const { loading, error } = useSelector((state: RootState) => state.clients)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(clientSchema),
        mode: 'all',
        defaultValues: { name: client.name ?? '' },
    })

    async function handleClientRename({ name }: createClientData) {
        try {
            const { meta: responseData } = await dispatch(
                renameClient({ workspaceId, clientId: client.id, name }),
            )
            if (responseData.requestStatus === 'fulfilled') {
                toast.success('You have successfully renamed your client!')
                setEditClientModal(false)
                dispatch(getWorkspaceClients(workspaceId))
            } else {
                toast.error('Renaming client failed')
            }
        } catch (error) {
            handleAxiosError(error as AxiosError)
        }
    }

    return (
        <form
            className="w-full flex flex-col items-center"
            onSubmit={handleSubmit(handleClientRename)}
        >
            <div className="w-full">
                <Input
                    id="client-name"
                    type="text"
                    label="Rename Client"
                    register={register('name')}
                    placeholder={`${client.name ?? 'new name'}`}
                    error={errors.name}
                    tabIndex={-1}
                    className="no-select-on-focus"
                />
            </div>
            {error && (
                <p className="text-red-500 text-sm mt-2">
                    {typeof error === 'string' ? error : JSON.stringify(error)}
                </p>
            )}
            <Button className="w-1/2" disabled={!isValid} isLoading={loading}>
                Save
            </Button>
        </form>
    )
}
