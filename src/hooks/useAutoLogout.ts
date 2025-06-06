// hooks/useAutoLogout.ts
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { logout } from '@/redux/slice/authSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export function useAutoLogout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const expiresAt = useSelector((state: RootState) => state.auth.expiresAt)

    useEffect(() => {
        if (!expiresAt) return

        const now = Date.now()
        const timeout = expiresAt - now
        let timer: NodeJS.Timeout

        if (timeout <= 0) {
            toast('Token expired please login again.', {
                icon: '❗',
            })
            dispatch(logout())
            navigate('/login')
        } else {
            timer = setTimeout(() => {
                toast('Token expired please login again.', {
                    icon: '❗',
                })
                dispatch(logout())
                navigate('/login')
            }, timeout)
        }
        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [expiresAt, dispatch])
}
