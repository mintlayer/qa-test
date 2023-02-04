import { Navigate } from 'react-router-dom'
import qrcode from 'qrcode-generator'
import Header from '../components/composed/Header'
import { isLoggedIn } from '../services/Login'

const typeNumber = 4
const errorCorrectionLevel = 'L'
const qr = qrcode(typeNumber, errorCorrectionLevel)
qr.addData('zTVwKtsTJJK6cd8nEcoAuicprYxyJgm4WvqohL')
qr.make()

const Receive = () => {

    return (
        <>
        {!isLoggedIn()
            ? <Navigate to="/" replace={true} />
            : (
                <div className="box">
                    <Header withBackButton={true} />
                    <h3 className="title is-4 has-text-centered mt-6">Your BTC address:</h3>
                    <img src={qr.createDataURL(10)} style={{width: '100%'}} />
                    <p className="box is-size-5 has-text-centered has-text-weight-bold mb-3 has-background-primary p-2">
                        zTVwKtsTJJK6cd8nEcoAuicprYxyJgm4WvqohJ
                    </p>
                </div>
            )
        }
        </>
    )
}

export default Receive
