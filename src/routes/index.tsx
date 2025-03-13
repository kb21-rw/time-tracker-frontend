import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/landing'
import SignUpPage from '../pages/sign-up'
import LoginPage from '../pages/login'
import DashboardPage from '../pages/dashboard'

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
])
