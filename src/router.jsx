import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import CreateAccount from './pages/CreateAccount'
import Login from './pages/Login'
import Receive from './pages/Receive'
import Send from './pages/Send'
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
    {
        path: '/receive',
        element: <Receive />
    },
    {
        path: '/send',
        element: <Send />
    },
])

export default router
