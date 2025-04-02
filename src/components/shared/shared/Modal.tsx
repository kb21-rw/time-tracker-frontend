import { PropsWithChildren } from 'react'
interface ModalProps {
    isOpen: boolean
    title: string
    onClose: () => void
}
function Modal({ title, children, isOpen, onClose }: PropsWithChildren<ModalProps>) {
    if (!isOpen) return null
    return (
        <section className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div
                    className="fixed inset-0 bg-black opacity-50 transition-opacity"
                    onClick={onClose}
                ></div>
                <div className=" lg:w-1/2 mt-20 p-10 flex flex-col gap-14 ">
                    <div className="flex justify-between">
                        <p className="text-2xl font-inter font-bold">{title}</p>
                        <button className="text-2xl font-sem-bold" onClick={onClose}>
                            X
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default Modal
