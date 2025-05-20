import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { Toaster } from 'react-hot-toast'
import { useAutoLogout } from './hooks/auto-logout'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { restoreAuth } from './redux/slice/authSlice'
function App() {
    const dispatch = useDispatch()
    useAutoLogout()

    useEffect(() => {
        dispatch(restoreAuth())
    }, [dispatch])
    return (
        <>
            <RouterProvider router={router} />
            <Toaster />
        </>
    )
}

export default App
