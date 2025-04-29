import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shadcn/dialog'
import { CommonModalProps } from '@/util/interfaces'
import { PropsWithChildren } from 'react'

interface ModalProps extends CommonModalProps{
    title: string
}

export default function DialogDemo({
    title,
    children,
    isModalOpen,
    onClose,
}: PropsWithChildren<ModalProps>) {
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-gray-900">
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">{children}</div>
            </DialogContent>
        </Dialog>
    )
}
