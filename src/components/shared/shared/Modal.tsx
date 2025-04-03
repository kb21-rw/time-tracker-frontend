import { PropsWithChildren } from 'react'
interface ModalProps {
    isOpen: boolean
    title: string
    onClose: () => void
}
function Modal({ title, children, isOpen, onClose }: PropsWithChildren<ModalProps>) {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto ">
        <div className="flex min-h-screen items-center justify-center p-4 transparent-bg ">
          <div
            className="fixed inset-0"
            onClick={onClose}
          ></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                X
              </button>
            </div>
            <div className="p-6">{children}</div>
          </div>
        </div>
      </div>
    )
}

export default Modal
