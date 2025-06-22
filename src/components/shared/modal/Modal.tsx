import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shadcn/dialog'
import { CommonModalProps } from '@/util/interfaces'
import { PropsWithChildren } from 'react'

interface ModalProps extends CommonModalProps {
    title: string
}

export default function Modal({
    title,
    children,
    isModalOpen,
    onClose,
}: PropsWithChildren<ModalProps>) {
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} aria-describedby={undefined}>
            <DialogContent className="sm:max-w-[425px] z-50">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-900">{title}</DialogTitle>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}
