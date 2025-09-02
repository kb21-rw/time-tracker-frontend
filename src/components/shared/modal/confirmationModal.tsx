import Button from '@/components/shared/ui/Button'

interface ConfirmationModalProps {
    confirm: () => void
    cancel: () => void
}
export default function ConfirmationModal({ confirm, cancel }: ConfirmationModalProps) {
    return (
        <div className="flex justify-center gap-4 mt-6">
            <Button
                onClick={confirm}
                className="bg-primary text-white  px-6 py-2 font-semibold shadow hover:bg-blue-700 transition"
            >
                Confirm
            </Button>
            <Button
                onClick={cancel}
                className="bg-red-600 text-white px-6 py-2 font-semibold shadow hover:bg-red-700 transition"
            >
                Cancel
            </Button>
        </div>
    )
}
