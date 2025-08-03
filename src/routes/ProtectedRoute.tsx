import { getAuthInfo } from '@/util/helpers'
import { ProtectedRouteProps } from '@/util/interfaces'
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { isAuthenticated, userRole } = getAuthInfo()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
        return <Navigate to="/unauthorized" replace />
    }

    return <Outlet />
}
