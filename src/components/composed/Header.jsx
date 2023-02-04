import { useNavigate } from "react-router-dom"
import { isLoggedIn, logOut } from "../../services/Login"

const Header = () => {
    const navigate = useNavigate()

    const doLogout = () => {
        logOut()
        setTimeout(() => {
            navigate('/')
        }, 10)
    }

    return (
        <>
            <h1 className="title is-4 center main-title">Mintlayer - QATest</h1>

            {isLoggedIn() &&
                <button 
                    title="logout"
                    className="has-text-danger is-size-5"
                    onClick={doLogout}
                    style={{cursor: 'pointer', position: 'absolute', right: '20px', top: '20px', border: 'none', background: 'none'}}>&#10132;</button>
            }
        </>
    )
}

export default Header