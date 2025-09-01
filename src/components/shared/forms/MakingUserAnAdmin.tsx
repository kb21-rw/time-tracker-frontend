import Button from '../ui/Button'

function MakingUserAnAdmin() {
    return (
        <div className="flex justify-between items-center mr-4">
            <Button className="w-2/5">Confirm</Button>
            <Button className="w-2/5 bg-red-600">Cancel</Button>
        </div>
    )
}

export default MakingUserAnAdmin
