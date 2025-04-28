import Button from '../shared/ui/Button'

export default function EditButtons() {
    return (
        <div className="flex flex-col px-3 py-4 gap-2">
            <Button className="w-full text-left px-2 py-2 justify-start font-normal cursor-pointer">
                Edit Client
            </Button>
            <Button className="w-full text-left px-2 py-2 justify-start font-normal cursor-pointer">
                Edit Project
            </Button>
        </div>
    )
}
