import { Navigate, useNavigate } from 'react-router-dom'
import Header from '../components/composed/Header'
import { isLoggedIn } from '../services/Login'

const fakeAddresses = [
    '3YrgkL8caHUc7jdW3kukAzE7Tj6cEEd1LsRDUJE',
    '2XuQzn9Zhq8gb56heNQtBnqqWRNrgcuTw6jvS5e',
    '3JyyhHdopAwyGWFvLwLQdZ5fNGoQrCZm2raPtiu',
    '2jgiU4AKbAbakthJbhPaARLLpZNSeXzPN8bV8gU',
    '2NM4SJYqG6mAuxfrn3nWqg5BAtc7FHuRT6tCr8b',
    'BWsk9xhZiDJkFQGS4VPJ271qcfkgYYf6VJjHUe',
    '31qBXrv4NfhVFgu4bPScs6oFubsdscQsPtZtRwC',
    'jhMhLAsvQ423BdGThBd51TM8jYqYpyqMoqxVSA',
    '28Ca2Bn7SNfSz9imAReZWiU86rckBjRKW3GSiQZ',
    '2Ue4qDEXxKc2pJjV9vu6r2xEPSwSSHe1nbcdnVj',
    '2Dcu9d4Hz6nxRuYzczukWvTMKqEdbfrmKdaaKFy',
    'zTVwKtsTJJK6cd8nEcoAuicprYxyJgm4Wvqohp'
]

const getRandomFakeAddress = () =>
    `BC1${fakeAddresses[Math.floor(Math.random() * (fakeAddresses.length-1))]}`

const getRandomValue = () =>
    (Math.floor(Math.random() * 100_000_000)/10_000_000).toFixed(8)


const fakeTransactions = [...Array(10)].map(() => ({
    to: getRandomFakeAddress(),
    from: getRandomFakeAddress(),
    value: getRandomValue(),
}))

const Wallet = () => {
    const navigate = useNavigate()

    const balance = 23.87405487
    const btc_usd_rate = 19_563
    const moneyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' })

    const goToReceive = () =>
        navigate('/receive')

    return (
        <>
        {!isLoggedIn()
            ? <Navigate to="/" replace={true} />
            : (
                <div className="box">
                    <Header />
                    
                    <div className="columns">
                        <div className="column">
                            <div className="card">
                                <div className="card-header has-background-primary">
                                    <div className="card-header-title">
                                        <h5 className="has-text-weight-bold" style={{margin: 'auto'}}>Balance BTC:</h5>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <h6 className="content is-size-4" style={{textAlign: 'center'}}>{balance}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="card">
                                <div className="card-header has-background-primary">
                                    <div className="card-header-title">
                                        <h5 className="has-text-weight-bold" style={{margin: 'auto'}}>Balance USD:</h5>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <h6 className="content is-size-4" style={{textAlign: 'center'}}>{moneyFormatter.format(balance * (btc_usd_rate+1000))}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box">
                        <p>Exchange rate: <strong>1 BTC = {moneyFormatter.format(btc_usd_rate)}</strong></p>
                    </div>

                    <div className="columns">
                        <div className="column">
                            <button title="Go to send transaction page" className="button is-primary is-light is-large is-fullwidth">Send</button>
                        </div>
                        <div className="column">
                            <button title="See your address" className="button is-primary is-light is-large is-fullwidth" onClick={goToReceive}>Receive</button>
                        </div>
                    </div>

                    <h6 className="title is-6  has-background-primary p-2" style={{textAlign: 'center'}}>Last transactions: </h6>
                    <ul style={{maxHeight: '400px', overflow: 'auto', padding: '0 5px'}}>
                    {fakeTransactions.map((transaction, idx) => (
                        <li className="box" key={`transaction-${idx}`}>
                            <p>To: {transaction.to}</p>
                            <p>Value: {transaction.value} BTC</p>
                        </li>
                    ))}
                    </ul>
                </div>
            )
        }
        </>
    )
}

export default Wallet
