import { Dialog, DialogContent } from '@/components/shadcn/dialog'
import { PropsWithChildren } from 'react'

interface ModalProps {
    isModalOpen: boolean
    onClose: () => void
    popupPosition?: { x: number; y: number }
}

export default function EditPopUpModal({
    children,
    isModalOpen,
    onClose,
    popupPosition,
}: PropsWithChildren<ModalProps>) {
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} modal={false}>
            <DialogContent
                className="p-0 rounded-lg shadow-lg border border-gray-200 bg-white [&>button]:top-1 [&>button]:right-3  [&>button]:cursor-pointer"
                style={{
                    position: 'fixed',
                    top: popupPosition?.y || 0,
                    left: popupPosition?.x || 0,
                    width: '300px',
                    maxHeight: '90vh',
                    zIndex: 50,
                }}
            >
                <div className="py-2">{children}</div>
            </DialogContent>
        </Dialog>
    )
}
