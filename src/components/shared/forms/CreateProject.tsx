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

export default function CreateProjectForm() {
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch<AppDispatch>()
    const { clients, error: clientsError } = useSelector((state: RootState) => state.clients)

    useEffect(() => {
        dispatch(getWorkspaceClients(id!))
    }, [dispatch])

    const {
        register,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(ProjectSchema),
        mode: 'all',
        defaultValues: { client: '', name: '' },
    })

    return (
        <Form className="flex flex-col">
            <div className="w-full max-w-3xl font-inter pb-6 text-xl">
                <div className="relative md:w-1/2">
                    <select
                        {...register('client')}
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
                label="Enter Project Name"
                placeholder="Enter Project Name"
                error={errors.name}
                register={register('name')}
            />

            <Button className="self-center w-1/2" disabled={!isValid}>
                Create Project
            </Button>
        </Form>
    )
}
