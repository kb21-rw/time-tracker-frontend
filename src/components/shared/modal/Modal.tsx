import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shadcn/dialog'
import { CommonModalProps } from '@/util/interfaces'
import { PropsWithChildren } from 'react'

interface ModalProps extends CommonModalProps {
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
            <DialogContent className="sm:max-w-[425px] z-[100]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-900">
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}
