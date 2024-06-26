import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function VerifyOTP() {
    const [userOTP, setUserOTP] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()
    let { mailOTP } = location.state || {}
    const { Mail } = location.state || {}
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios
                .post('http://localhost:3000/verifyOtp', {
                    mailGeneratedOTP: mailOTP,
                    email: Mail,
                    userGeneratedOTP: userOTP,
                })
                .then((res) => {
                    if (res.data['text']) {
                        toast(res.data['text'])
                        navigate('/forgotPassword')
                    } else {
                        toast(res.data)
                    }
                    if (res.data == 'Successful OTP Validation.') {
                        navigate('/ChangePassword', { state: { email: Mail } })
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="w-100" style={{ maxWidth: '500px' }}>
                    <main className="form-signin w-100 m-auto bg-white shadow rounded p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex gap-2 justify-content-center mb-4">
                                <img
                                    className="border border-2 border-black"
                                    src="../../public/assets/resumeImage.jpg"
                                    alt="Resume"
                                    height="70"
                                />
                                <div>
                                    <h1 className="h3 fw-bold my-1">
                                        Resume Builder
                                    </h1>
                                    <p className="m-0">
                                        <i>Enter 6 digit verification Code</i>
                                    </p>
                                </div>
                            </div>

                            <div className="form-floating mb-4">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="floatingOTP"
                                    placeholder="Enter OTP"
                                    onChange={(event) =>
                                        setUserOTP(event.target.value)
                                    }
                                />
                                <label htmlFor="floatingEmail">
                                    <i className="bi bi-key"></i> Enter OTP
                                </label>
                            </div>

                            <button
                                className="btn btn-primary w-100 py-2"
                                type="submit"
                            >
                                <i className="bi bi-send"></i> Verify
                            </button>

                            <div className="d-flex justify-content-between my-3">
                                <a href="/" className="text-decoration-none">
                                    Register
                                </a>
                                <a
                                    href="/login"
                                    className="text-decoration-none"
                                >
                                    Login
                                </a>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </>
    )
}

export default VerifyOTP
