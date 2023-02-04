import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../components/composed/Header'
import { isLoggedIn } from '../services/Login'

const Send = () => {
    const balance = 2387405487

    const [ loadingButtonClass, setLoadingButtonClass ] = useState('') 
    const [ buttonsDisabledState, setButtonsDisabledState ] = useState(false)

    const [ address, setAddress ] = useState('')

    const [ amount, setAmount ] = useState('')
    const [ amountMessage, setAmountMessage ] = useState('')
    const [ amountMessageStyles, setAmountMessageStyles ] = useState('is-hidden')

    const [ errorMessageState, setErrorMessageState ] = useState('is-hidden')
    const [ successMessageState, setSuccessMessageState ] = useState('is-hidden')

    const [ fee, setFee ] = useState(42)

    const numberMask = (value) =>
        value.replace(/[^0-9]/g, '')

    const amountMask = (value) => {
        const maskedValue = numberMask(value)
        setAmount(maskedValue)
        if (maskedValue > balance) {
            setAmountMessage(`You cannot send more than your balance ( ${balance/100_000_000} BTC).`)
            setAmountMessageStyles('')
        } else {
            setAmountMessage('')
            setAmountMessageStyles('is-hidden')
        }
    }

    const feeMask = (value) =>
        setFee(numberMask(value))

    const transactionPrecheck = () => {
        setLoadingButtonClass('is-loading')
        setButtonsDisabledState(true)
        if (!address || !fee || !amount) {
            setErrorMessageState('')
            setLoadingButtonClass()
            setButtonsDisabledState(false)
            return
        }

        setErrorMessageState('is-hidden')
        setTimeout(() => {
            setSuccessMessageState('')
            setLoadingButtonClass()
            setButtonsDisabledState(false)
        }, 2000)
    }

    return (
        <>
        {!isLoggedIn()
            ? <Navigate to="/" replace={true} />
            : (
                <div className="box">
                    <Header withBackButton={true} />
                    <h3 className="title is-4 has-text-centered mt-6">Send funds</h3>

                    <div className="field">
                        <label className="label">Address:</label>
                        <div className="control">
                            <input className="input" type="text" value={address} onChange={e => setAddress(e.target.value)} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Amount (sats):</label>
                        <div className="control">
                            <input className="input" type="text" value={amount} onChange={e => amountMask(e.target.value)} />
                        </div>
                        <p className={`help has-text-danger ${amountMessageStyles}`}>{amountMessage}</p>
                    </div>

                    <div className="field">
                        <label className="label">Fee (sats/B):</label>
                        <div className="control">
                            <input className="input" type="text" value={fee} onChange={e => feeMask(e.target.value)} />
                        </div>
                        <p className='help has-text-link'>Total fee (transaction size = 300B): {fee*301} sats</p>
                    </div>

                    <br />
                    <div className={`notification is-danger ${errorMessageState}`}>
                        Transaction could not be created. All the fields are required. 
                    </div>

                    <div className={`notification is-primary ${successMessageState}`}>
                        Funds sent succesfully!
                        <br />
                        Transaction ID:
                        <p className="is-size-5" style={{wordWrap: 'anywhere'}}>58b29a0e0567022bd43bf39f86ba53d503c1e143ce7badf2dd3583f1fd8c38e6</p>
                    </div>

                    <button className={`button is-primary is-large is-fullwidth mt-3 ${loadingButtonClass}`} onClick={transactionPrecheck} disabled={buttonsDisabledState}>Create</button>
                </div>
            )
        }
        </>
    )
}

export default Send
