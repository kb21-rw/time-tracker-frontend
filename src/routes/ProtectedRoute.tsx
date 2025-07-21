import { ProtectedRouteProps } from '@/util/interfaces'
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const isAuthenticated = !!localStorage.getItem('token')
    const user = localStorage.getItem('user')
    const userRole = user ? JSON.parse(user).roles : null

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}
