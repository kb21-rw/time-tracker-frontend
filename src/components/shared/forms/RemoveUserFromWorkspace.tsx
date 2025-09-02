import Button from '@/components/shared/ui/Button'

function RemoveUser() {
    return (
        <div className="flex justify-between items-center mr-6">
            <Button className="w-2/5">Confirm</Button>
            <Button className="w-2/5 bg-red-600">Cancel</Button>
        </div>
    )
}

export default RemoveUser
