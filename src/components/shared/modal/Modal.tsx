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
            <DialogContent className="z-50 flex flex-col justify-between">
                <DialogHeader>
                    <DialogTitle className="text-xl  text-gray-900">{title}</DialogTitle>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}
