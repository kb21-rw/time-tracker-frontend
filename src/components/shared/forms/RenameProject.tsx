import { RootState } from '@/redux/store'
import { clientSchema } from '@/schema/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { RenameProjectProps } from '@/util/interfaces'

export default function RenameProject({ projectName }: RenameProjectProps) {
    const { loading, error } = useSelector((state: RootState) => state.workspaces)

    const {
        register,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(clientSchema),
        mode: 'all',
        defaultValues: { name: projectName || '' },
    })

    return (
        <form className="w-full flex flex-col items-center">
            <div className="w-full max-w-3xl font-inter pb-6 text-xl">
                <div className="relative md:w-1/2">
                    <select className="w-full appearance-none bg-transparent text-black text-lg font-normal pr-8 py-1 focus:outline-none cursor-pointer">
                        <option value="project">Select Client

                        </option>
                        <option value="task">Task</option>
                    </select>
                </div>
                <div className="w-full">
                    <Input
                        id="project-name"
                        type="text"
                        label="Rename Project"
                        register={register('name')}
                        placeholder={`${projectName || 'new name'}`}
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
            </div>
        </form>
    )
}
