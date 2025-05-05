import Button from '../ui/Button'
import Input from '../ui/Input'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export const clientSchema = z.object({
    clientname: z.string().min(3, { message: 'client name must be at least 3 characters' }),
})
type clientData = z.infer<typeof clientSchema>
function CreateClient() {
    const { loading, error } = useSelector((state: RootState) => state.workspaces)
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<clientData>({ resolver: zodResolver(clientSchema), mode: 'all' })
    const onSubmit = (data: clientData) => console.log(data)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Enter Client Name"
                placeholder="Enter Client Name"
                id="clientname"
                register={register('clientname')}
                error={errors.clientname}
            />

            <Button className="w-full" disabled={!isValid} isLoading={loading}>
                Create Client
            </Button>
        </form>
    )
}

export default CreateClient
