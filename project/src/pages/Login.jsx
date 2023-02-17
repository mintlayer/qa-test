import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/composed/Header'
import { logIn } from '../services/Login'
import { validUser } from '../services/User'

const Login = () => {
    const navigate = useNavigate()

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loadingButtonClass, setLoadingButtonClass ] = useState('') 
    const [ buttonsDisabledState, setButtonsDisabledState ] = useState(false)
    const [ errorMessageState, setErrorMessageState ] = useState('is-hidden')

    
    const goToAccountCreation = () =>
        navigate('/create-account')
    
    const goToWallet = () =>
        navigate('/wallet')
    
    const doLogin = () => {
        setButtonsDisabledState(true)
        setLoadingButtonClass('is-loading')

        setTimeout(() => {    
            if (!validUser(username, password)) {
                setErrorMessageState('')
                setButtonsDisabledState(false)
                setLoadingButtonClass('')
                return
            }

            setButtonsDisabledState(false)
            setLoadingButtonClass('')
            setErrorMessageState('is-hidden')
            logIn(username)
            goToWallet()
        }, 500)
    }

    return (
        <div className="box">
            <Header />
            
            <div className="field">
                <label className="label">Username</label>
                <div className="control">
                    <input className="input" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                </div>
                <p className="help hidden"></p>
            </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <p className="help hidden"></p>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className={`button is-primary ${loadingButtonClass}`} onClick={doLogin}  disabled={buttonsDisabledState}>Login</button>
                </div>
                <div className="control">
                    <button className="button is-primary is-light" onClick={goToAccountCreation} disabled={buttonsDisabledState}>Create Account</button>
                </div>
            </div>

            <div className={`notification is-danger ${errorMessageState}`}>
                Login failed. Username and/or password are invalid. 
            </div>
        </div>
    )
}

export default Login
