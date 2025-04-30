import Button from '../shared/ui/Button'
import { GroupTable } from '../../util/interfaces'

interface EditButtonsProps {
    setClientModal?: React.Dispatch<React.SetStateAction<boolean>>
    rowData?: GroupTable
    setSelectedRow?: React.Dispatch<React.SetStateAction<GroupTable | null>>
}

export default function EditButtons({ setClientModal, rowData, setSelectedRow }: EditButtonsProps) {
    return (
        <div className="flex px-3 py-4 gap-2">
            <Button
                className="w-full text-center px-2 py-2 justify-start font-normal cursor-pointer"
                onClick={() => {
                    if (rowData && setSelectedRow) {
                        setSelectedRow(rowData)
                    }
                    if (setClientModal) {
                        setClientModal(true)
                    }
                }}
            >
                Edit client
            </Button>
            <Button className="w-full text-center px-2 py-2 justify-start font-normal cursor-pointer">
                Edit project
            </Button>
        </div>
    )
}
