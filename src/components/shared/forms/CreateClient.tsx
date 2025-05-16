import Button from '../ui/Button'
import Input from '../ui/Input'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { clientSchema } from '@/schema/modal'

type clientData = z.infer<typeof clientSchema>
function CreateClient() {
    const { loading } = useSelector((state: RootState) => state.workspaces)
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<clientData>({ resolver: zodResolver(clientSchema), mode: 'all' })
    const onSubmit = (data: clientData) => data
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
