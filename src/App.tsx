import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
function App() {
    //test env variables
    // console.log(import.meta.env.VITE_API_URL);
    // console.log(import.meta.env.VITE_APP_NAME);
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
