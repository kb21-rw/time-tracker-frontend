import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import Forgotpassword from './pages/Forgotpassword'
import ResetPassword from './pages/ResetPassword'
function App() {
    //test env variables
    // console.log(import.meta.env.VITE_API_URL);
    // console.log(import.meta.env.VITE_APP_NAME);
    return (
        <>
            <RouterProvider router={router} />
            <Forgotpassword/>
            <ResetPassword/>
        </>
    )
}

export default App
