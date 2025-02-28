import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { decrement, increment, incrementByAmount } from './redux/slice/counterSlice'

function App() {
    //test env variables
    // console.log(import.meta.env.VITE_API_URL);
    // console.log(import.meta.env.VITE_APP_NAME);
    const { counter } = useSelector((state: RootState) => state.counter)
    const dispatch = useDispatch()
    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => dispatch(increment())}>Increment {counter}</button>
                <button onClick={() => dispatch(decrement())}>Decrement {counter}</button>
                <button onClick={() => dispatch(incrementByAmount(5))}>
                    Increment By 5 {counter}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </>
    )
}

export default App
