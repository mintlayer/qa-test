import Login from './pages/Login'
import Wallet from './pages/Wallet'
import { isLoggedIn } from './services/Login'

import './app.css'

const App = () => {
    return (
        <>
            {isLoggedIn()
                ? <Wallet />
                : <Login />
            }
        </>
    )
}

export default App
