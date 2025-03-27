import { FaPlus } from 'react-icons/fa6'
import Sidebar from '../components/shared/Sidebar'
import WorkSpaceSidebar from '../components/ui/WorkSpaceSidebar'
import { Download } from 'lucide-react'
import UsersTable from '../components/ui/UsersTable'
import { columns } from '../components/ui/columns'
import { TableUser } from '@/util/interfaces'
export default function WorkspaceDetails() {
    const data: TableUser[] = [
        {
            id: '728ed52f',
            names: 'John Doe',
            email: 'john.doe@example.com',
        },
        {
            id: '728ed52f',
            names: 'John Doe',
            email: 'john.doe@example.com',
        },

        // ...
    ]
    return (
        <div className="flex w-full justify-around">
            <div className="w-27">
                <Sidebar />
            </div>
            <div className="">
                <WorkSpaceSidebar />
            </div>
            <div className="bg-white w-full">
                <div className="w-full shadow-md py-7 px-5 flex justify-between items-center">
                    <p className="text-xl font-bold">The Gym</p>
                    <button className="flex items-center gap-x-2 bg-primary-500 rounded-lg text-white px-3 py-2 md:px-5 md:py-3 cursor-pointer">
                        <FaPlus />
                        <span className="hidden sm:inline">New User</span>
                        <span className="sm:hidden">New</span>
                    </button>
                </div>
                <div className="w-full">
                    <div className="w-full flex justify-between px-9 py-12 font-bold text-xl">
                        <p>Users</p>
                        <Download className="text-primary-500" />
                    </div>
                    <UsersTable columns={columns} data={data} />
                </div>
                <div className="w-full">
                    <p className='text-xl font-bold px-9 py-12'>Groups</p>
                    
                </div>
            </div>
        </div>
    )
}
