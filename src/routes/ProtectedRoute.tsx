import { ProtectedRouteProps } from '@/util/interfaces'
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const isAuthenticated = !!localStorage.getItem('token')

    let userRole = null
    try {
        const user = localStorage.getItem('user')
        if (user) {
            const userData = JSON.parse(user)
            userRole = userData.roles
        }
    } catch (error) {
        console.error('Failed to parse user data:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        return <Navigate to="/login" replace />
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
        return <Navigate to="/unauthorized" replace />
    }

    return <Outlet />
}
