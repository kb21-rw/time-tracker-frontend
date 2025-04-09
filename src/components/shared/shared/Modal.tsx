import { Button } from '@/components/shadcn/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/shadcn/dialog'
import { Input } from '@/components/shadcn/input'
import { Label } from '@/components/shadcn/label'
import { Title } from '@radix-ui/react-dialog'
import { PropsWithChildren } from 'react'

interface ModalProps {
    isModalOpen: boolean
    onClose: () => void
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
