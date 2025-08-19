import Button from '../ui/Button'

function MakingUserAnAdmin() {
    return (
        <div className="flex items-center gap-10 ">
            <Button className="w-2/5">Confirm</Button>
            <Button className="w-2/5 bg-red-600">Cancel</Button>
        </div>
    )
}

export default MakingUserAnAdmin
