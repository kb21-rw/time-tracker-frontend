import Button from '../shared/ui/Button'
import { EditButtonsProps } from '../../util/interfaces'

export default function EditButtons({
    setProjectModal,
    setClientModal,
    rowData,
    setSelectedRow,
}: EditButtonsProps) {
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
            <Button
                className="w-full text-center px-2 py-2 justify-start font-normal cursor-pointer"
                onClick={() => {
                    if (rowData && setSelectedRow) {
                        setSelectedRow(rowData)
                    }
                    if (setProjectModal) {
                        setProjectModal(true)
                    }
                }}
            >
                Edit project
            </Button>
        </div>
    )
}
