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
        path: '/dashboard',
        element: <DashboardPage />,
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
    {
        path: '/user-signup',
        element: <UserSignUpPage />,
    },
])
