import Sidebar from "../components/Sidebar"
import { FaPlus } from 'react-icons/fa6'



export default function WorkspacePage() {
  return (
      <div>
          <div className="flex w-full">
              <Sidebar />
              <div className="w-full bg-white">
                  <div className="w-full shadow-md  py-7 px-5 flex justify-between items-center">
                      <p className="text-xl font-bold">Workspaces</p>
                      <button className="flex items-center gap-x-2 bg-primary-500 rounded-lg text-white px-3 py-2 md:px-5 md:py-3 cursor-pointer">
                          <FaPlus />
                          <span className="hidden sm:inline">New Work Space</span>
                          <span className="sm:hidden">New</span>
                      </button>
                  </div>
                  <div className="pt-15">
                      <div className="flex items-center justify-between mx-4 md:mx-16  text-base md:text-xl font-bold">
                          <p>Workspace</p>
                          <p>Creation date</p>
                      </div>

                  </div>
              </div>
          </div>
      </div>
  )
}
