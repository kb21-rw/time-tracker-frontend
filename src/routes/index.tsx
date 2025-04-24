import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/Landing'
import AdminSignUpPage from '../pages/AdminSignUp'
import LoginPage from '../pages/Login'
import DashboardPage from '../pages/Dashboard'
import ForgotPasswordPage from '../pages/password-reset/ForgotPassword'
import ResetPasswordPage from '../pages/password-reset/ResetPassword'
import ManageWorkspacesPage from '../pages/ManageWorkspaces'
import WorkspaceDetails from '../pages/WorkspaceDetails'
import UserSignUpPage from '@/pages/UserSignUp'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/sign-up',
        element: <AdminSignUpPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
    },
    {
        path: '/reset-password',
        element: <ResetPasswordPage />,
    },
    {
        path: '/user-signup',
        element: <UserSignUpPage />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />,
            },
            {
                path: '/manage-workspaces',
                children: [
                    {
                        index: true,
                        element: <ManageWorkspacesPage />,
                    },
                    {
                        path: ':id',
                        element: <WorkspaceDetails />,
                    },
                ],
            },
        ],
    },
])
