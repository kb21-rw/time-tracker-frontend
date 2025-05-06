import { Dialog, DialogContent, DialogTitle } from '@/components/shadcn/dialog'
import { CommonModalProps } from '@/util/interfaces'
import { PropsWithChildren } from 'react'

interface EditModalProps extends CommonModalProps {
    popupPosition?: { x: number; y: number }
}

export default function EditModal({
    children,
    isModalOpen,
    onClose,
    popupPosition,
}: PropsWithChildren<EditModalProps>) {
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
                <DialogTitle className="sr-only">Edit Options</DialogTitle>
                <div className="py-2">{children}</div>
            </DialogContent>
        </Dialog>
    )
}
