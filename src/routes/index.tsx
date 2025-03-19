import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/landing'
import SignUpPage from '../pages/sign-up'
import LoginPage from '../pages/login'
import DashboardPage from '../pages/dashboard'
import ForgotPasswordPage from '../pages/password-reset/forgot-password'
import ResetPasswordPage from '../pages/password-reset/reset-password'
import WorkspacePage from '../pages/Workspace'
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
        path: '/workspace',
        element: <WorkspacePage/>
    },
    {
        path: '/workspace-details',
        element: <WorkspaceDetails/>
    },

])
