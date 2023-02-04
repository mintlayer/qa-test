import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import CreateAccount from './pages/CreateAccount'
import Login from './pages/Login'
import Wallet from './pages/Wallet'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/create-account',
        element: <CreateAccount />
    },
    {
        path: '/wallet',
        element: <Wallet />
    },
])

export default router
