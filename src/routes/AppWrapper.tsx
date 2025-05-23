// components/AppWrapper.tsx
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAutoLogout } from '../hooks/auto-logout'
import { restoreAuth } from '../redux/slice/authSlice'

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch()
    useAutoLogout()

    useEffect(() => {
        dispatch(restoreAuth())
    }, [dispatch])

    return <>{children}</>
}
