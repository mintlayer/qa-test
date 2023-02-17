import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/composed/Header'
import { createUser } from '../services/User'

const CreateAccount = () => {
    const navigate = useNavigate()

    const [ username, setUsername ] = useState('')
    const [ usernameMessage, setUsernameMessage ] = useState('')
    const [ usernameMessageStyles, setUsernameMessageStyles ] = useState('is-hidden')

    const [ password, setPassword ] = useState('')
    const [ passwordMessage, setPasswordMessage ] = useState('')
    const [ passwordMessageStyles, setPasswordMessageStyles ] = useState('is-hidden')

    const [ passwordRepeat, setPasswordRepeat ] = useState('')
    const [ passwordRepeatMessage, setPasswordRepeatMessage ] = useState('')
    const [ passwordRepeatMessageStyles, setPasswordRepeatMessageStyles ] = useState('is-hidden')

    const [ loadingButtonClass, setLoadingButtonClass ] = useState('') 
    const [ buttonsDisabledState, setButtonsDisabledState ] = useState(false)
    const [ successMessageState, setSuccessMessageState ] = useState('is-hidden')

    const checkPasswordRepeat = (value) => {
        setSuccessMessageState('is-hidden')
        setPasswordRepeat(value)
        if (value !== password) {
            setPasswordRepeatMessage('Passwords doe not match.')
            setPasswordRepeatMessageStyles('')
            return
        }

        setPasswordRepeatMessage('')
        setPasswordRepeatMessageStyles('is-hidden')
    }

    const resetFormMessages = () => {
        setUsernameMessage('')
        setUsernameMessageStyles('is-hidden')
        setPasswordMessage('')
        setPasswordMessageStyles('is-hidden')
        setPasswordRepeatMessage('')
        setPasswordRepeatMessageStyles('is-hidden')
    }

    const resetFormValues = () => {
        setUsername('')
        setPassword('')
        setPasswordRepeat('')
    }

    const createUserPrecheck = () => {
        setButtonsDisabledState(true)
        setLoadingButtonClass('is-loading')

        setTimeout(() => {
            let hasErrors = false
    
            if (username === '') {
                setUsernameMessage('Username can not be empty')
                setUsernameMessageStyles('')
                hasErrors = true
            }
            
            if (password === '') {
                setPasswordMessage('Password can not be empty')
                setPasswordMessageStyles('')
                hasErrors = true
            }
    
            if (passwordRepeat === '') {
                setPasswordRepeatMessage('Password confirmation can not be empty')
                setPasswordRepeatMessageStyles('')
                hasErrors = true
            }
    
            if (passwordRepeat !== password) {
                setPasswordRepeatMessage('Passwords doe not match.')
                setPasswordRepeatMessageStyles('')
                hasErrors = true
            }
    
            if (hasErrors) {
                setLoadingButtonClass('')
                setButtonsDisabledState(false)
                setSuccessMessageState('')
                return
            }
    
            try {
                resetFormMessages()
                createUser(username, password)
                resetFormValues()
                setLoadingButtonClass('')
                setButtonsDisabledState(false)
                setSuccessMessageState('')
            } catch {
                setUsernameMessage('Username already exists')
                setUsernameMessageStyles('')
                setLoadingButtonClass('')
                setButtonsDisabledState(false)
                setSuccessMessageState('is-hidden')
            }
        }, 500)
    }

    const goToLogin = () =>
        navigate('/login')

    return (
        <div className="box">
            <Header />

            <h3 className="title is-5">Create account</h3>
            
            <div className="field">
                <label className="label">Username</label>
                <div className="control">
                    <input className="input" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <p className={`help has-text-danger ${usernameMessageStyles}`}>{usernameMessage}</p>
            </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <p className={`help has-text-danger ${passwordMessageStyles}`}>{passwordMessage}</p>
            </div>

            <div className="field">
                <label className="label">Confirm password</label>
                <div className="control">
                    <input className="input" type="password" value={passwordRepeat} onChange={e => checkPasswordRepeat(e.target.value)} />
                </div>
                <p className={`help has-text-danger ${passwordRepeatMessageStyles}`}>{passwordRepeatMessage}</p>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className={`button is-primary ${loadingButtonClass}`} onClick={createUserPrecheck} disabled={buttonsDisabledState}>Create</button>
                </div>
                <div className="control">
                    <button className="button is-primary is-light" onClick={goToLogin} disabled={buttonsDisabledState}>I have an account</button>
                </div>
            </div>

            <div className={`notification is-primary ${successMessageState}`}>
                User created succesfully. You can now log in. 
            </div>
        </div>
    )
}

export default CreateAccount
