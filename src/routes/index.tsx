import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/landing'
import SignUpPage from '../pages/sign-up'
import LoginPage from '../pages/login'
import ForgotPasswordPage from '../pages/password-reset/forgot-password'
import ResetPasswordPage from '../pages/password-reset/reset-password'

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
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
    },
    {
        path: '/reset-password',
        element: <ResetPasswordPage />,
    },
])
