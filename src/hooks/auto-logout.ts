// hooks/useAutoLogout.ts
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { logout } from '@/redux/slice/authSlice'

export function useAutoLogout() {
    const dispatch = useDispatch()
    const expiresAt = useSelector((state: RootState) => state.auth.expiresAt)

    useEffect(() => {
        if (!expiresAt) return

        const now = Date.now()
        const timeout = expiresAt - now

        if (timeout <= 0) {
            dispatch(logout())
        } else {
            const timer = setTimeout(() => {
                dispatch(logout())
            }, timeout)

            return () => clearTimeout(timer)
        }
    }, [expiresAt, dispatch])
}
