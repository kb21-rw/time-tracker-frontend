import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import SignUpPage from './pages/sign-up'
function App() {
    //test env variables
    // console.log(import.meta.env.VITE_API_URL);
    // console.log(import.meta.env.VITE_APP_NAME);
    return (
        <>
            <RouterProvider router={router} />
           {/* <SignUpPage/> */}
        </>
    )
}

export default App
