import Button from '../shared/ui/Button'

export default function EditButtons() {
    return (
        <div className="flex  px-3 py-4 gap-2">
            <Button className="w-full text-center  px-2 py-2 justify-start font-normal cursor-pointer">
                Edit client
            </Button>
            <Button className="w-full text-center  px-2 py-2 justify-start font-normal cursor-pointer">
                Edit project
            </Button>
        </div>
    )
}
