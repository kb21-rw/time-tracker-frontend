import { RootState } from '@/redux/store'
import { clientSchema } from '@/schema/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { RenameClientProps } from '@/util/interfaces'

export default function RenameClientForm({ clientName }: RenameClientProps) {
    const { loading, error } = useSelector((state: RootState) => state.workspaces)

    const {
        register,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(clientSchema),
        mode: 'all',
        defaultValues: { name: clientName ?? '' },
    })

    return (
        <form className="w-full flex flex-col items-center">
            <div className="w-full">
                <Input
                    id="client-name"
                    type="text"
                    label="Rename Client"
                    register={register('name')}
                    placeholder={`${clientName ?? 'new name'}`}
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
