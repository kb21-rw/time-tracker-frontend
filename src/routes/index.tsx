import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/Landin'
import SignUpPage from '../pages/SignUp'
import LoginPage from '../pages/Logi'
import DashboardPage from '../pages/Dashboar'
import ForgotPasswordPage from '../pages/password-reset/ForgotPassword'
import ResetPasswordPage from '../pages/password-reset/ResetPassword'
import ManageWorkspacePage from '../pages/ManageWorkspace'
import WorkspaceDetails from '../pages/WorkspaceDetails'

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
        element: <ManageWorkspacePage />,
    },
    {
        path: '/workspace-details',
        element: <WorkspaceDetails />,
    },
])
