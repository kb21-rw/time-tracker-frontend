import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/landing'
import SignUpPage from '../pages/sign-up'
import LoginPage from '../pages/login'
import ForgotPasswordPage from '../pages/password-reset/forgot-password'
import ResetPasswordPage from '../pages/password-reset/reset-password'
import OtpCodePage from '../pages/password-reset/otp-code'

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
        children: [
            {
                index: true,
                element: <ForgotPasswordPage />,
            },

            {
                path: 'verify-code',
                element: <OtpCodePage />,
            },
        ],
    },
    {
        path: '/reset-password',
        element: <ResetPasswordPage />,
    },
])
