

import { Button } from '../shadcn/button'
import { IoIosMenu } from 'react-icons/io'
import Sidebar from '../shared/Sidebar'

type MenuBarProps = {
    open: boolean
    setOpen: (open: boolean) => void
}

export function MenuBar({ open, setOpen }: MenuBarProps) {
    return (
        <>
            <Button variant="outline" className="bg-primary-700" onClick={() => setOpen(true)}>
                <IoIosMenu className="text-white" />
            </Button>
            {open && (
                <div className="fixed inset-0 z-50 flex lg:hidden">
                    <div
                        className="fixed inset-0 bg-black/40 transition-opacity"
                        style={{ zIndex: 50 }}
                        onClick={() => setOpen(false)}
                    ></div>
                    <div className="fixed left-0 top-0 h-full" style={{ zIndex: 60 }}>
                        <Sidebar />
                    </div>
                </div>
            )}
        </>
    )
}
