import { PropsWithChildren } from 'react'
interface ModalProps {
    title: string
}
function Modal({ title, children }: PropsWithChildren<ModalProps>) {
    return (
        <section className="w-full flex flex-col items-center justify-center h-full ">
            <div className=" lg:w-1/2 mt-20 p-10 flex flex-col gap-14 ">
                <div className="flex justify-between">
                    <p className="text-2xl font-inter font-bold">{title}</p>
                    <button className="text-2xl font-sem-bold">X</button>
                </div>
                {children}
            </div>
        </section>
    )
}

export default Modal
