import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../../../public/styles/ForgotPassword.css'
function ForgotPassword() {
    const [email, setEmail] = useState(null)
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()
        // Mail Validation:
        let isValid = true
        let re3 = /^[\w.-]+@gmail\.com$/
        if (!re3.test(email)) {
            document.getElementById('MailMsg').innerText =
                'Kindly enter your gmail.'
            isValid = false
        } else {
            document.getElementById('MailMsg').innerText = ''
        }
        if (!isValid) {
            return // If validation fails, do not proceed
        }
        try {
            await axios
                .get(`http://localhost:3000/${email}`)
                .then(async (res) => {
                    const text = res.data['text']
                    const otp = res.data['otp']
                    toast(text)
                    if (otp !== null) {
                        navigate('/VerifyOTP', {
                            state: { mailOTP: otp, Mail: email },
                        })
                    }
                })
        } catch (error) {
            console.error(error)
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
                                        <i>Forgot your password</i>
                                    </p>
                                </div>
                            </div>

                            <div className="form-floating mb-4">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingEmail"
                                    placeholder="name@example.com"
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                />
                                <label htmlFor="floatingEmail">
                                    <i className="bi bi-envelope"></i> Enter
                                    your Gmail
                                </label>
                                <p
                                    className=" text-danger fw-bold m-1"
                                    id="MailMsg"
                                ></p>
                            </div>

                            <button
                                className="btn btn-primary w-100 py-2"
                                type="submit"
                            >
                                <i className="bi bi-send"></i> Send Verification
                                Code
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

export default ForgotPassword
