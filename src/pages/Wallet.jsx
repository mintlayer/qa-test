import { Navigate, useNavigate } from 'react-router-dom'
import Header from '../components/composed/Header'
import { isLoggedIn } from '../services/Login'

const Wallet = () => {
    return (
        <>
        {!isLoggedIn()
            ? <Navigate to="/" replace={true} />
            : (
                <div className="box">
                    <Header />
                    Wallet
                </div>
            )
        }
        </>
    )
}

export default Wallet
