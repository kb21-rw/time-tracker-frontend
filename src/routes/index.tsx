import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/landing";
import SignUpPage from "../pages/sign-up";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/sign-up',
        element: <SignUpPage />
    }
])