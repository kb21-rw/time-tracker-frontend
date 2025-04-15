import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/Landing'
import SignUpPage from '../pages/SignUp'
import LoginPage from '../pages/Login'
import DashboardPage from '../pages/Dashboard'
import ForgotPasswordPage from '../pages/password-reset/ForgotPassword'
import ResetPasswordPage from '../pages/password-reset/ResetPassword'
import ManageWorkspacesPage from '../pages/ManageWorkspaces'
import WorkspaceDetails from '../pages/WorkspaceDetails'
import UserSignUp from '@/pages/UserSignUp'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/sign-up',
        element: <SignUpPage />,
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
        element: <ManageWorkspacesPage />,
    },
    {
        path: '/workspace-details',
        element: <WorkspaceDetails />,
    },
    {
        path: '/user-signup',
        element: <UserSignUp />,
    },
])
