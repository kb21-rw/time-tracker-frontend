import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/Landing'
import AdminSignUpPage from '../pages/AdminSignUp'
import LoginPage from '../pages/Login'
import DashboardPage from '../pages/UserTimeTracker'
import ForgotPasswordPage from '../pages/password-reset/ForgotPassword'
import ResetPasswordPage from '../pages/password-reset/ResetPassword'
import ManageWorkspacesPage from '../pages/ManageWorkspaces'
import WorkspaceDetails from '../pages/WorkspaceDetails'
import UserSignUpPage from '@/pages/UserSignUp'
import { ProtectedRoute } from './ProtectedRoute'
import TimeTracker from '@/pages/TimeTracker'
import UsersDetails from '@/pages/workspace-details/users'
import ClientsPage from '@/pages/workspace-details/clients'
import ProjectsPage from '@/pages/workspace-details/projects'
import AppWrapper from './AppWrapper'
import HttpErrorPage from '@/pages/HttpErrorPage'
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
        path: '/forbidden',
        element: <HttpErrorPage errorType="forbidden" />,
    },
    {
        element: (
            <AppWrapper>
                <ProtectedRoute allowedRoles={['Admin', 'Member']} />
            </AppWrapper>
        ),
        children: [
            {
                path: '/tracker',
                element: <DashboardPage />,
            },
            {
                path: '/manage-workspaces',
                element: <ProtectedRoute allowedRoles={['Admin']} />,
                children: [
                    {
                        index: true,
                        element: <ManageWorkspacesPage />,
                    },
                    {
                        path: ':id',
                        element: <WorkspaceDetails />,
                        children: [
                            {
                                index: true,
                                element: <UsersDetails />,
                            },
                            {
                                path: 'clients',
                                element: <ClientsPage />,
                            },
                            {
                                path: 'projects',
                                element: <ProjectsPage />,
                            },
                            {
                                path: 'tracker',
                                element: <TimeTracker />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <HttpErrorPage errorType="notFound" />,
    },
])
