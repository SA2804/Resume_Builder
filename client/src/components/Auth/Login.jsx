import { useState } from 'react'
import '../../../public/styles/Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

function Login({ setAuth }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            axios
                .get(`http://localhost:3000/${email}/${password}`)
                .then((response) => {
                    toast(response.data.text)
                    if (response.data.text == 'User Validated') {
                        const token = response.data.Token
                        const registrationId = response.data.regsitrationId // Get the registration ID from the response
                        localStorage.setItem('registrationId', registrationId)
                        localStorage.setItem('authToken', token)
                        setAuth({ Token: token })
                        navigate('/homePage', { replace: true })
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="d-flex align-items-center vh-100">
                <div className="w-100">
                    <main className="form-signin w-100 m-auto bg-white shadow rounded">
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex gap-2 justify-content-center mb-4">
                                <img
                                    className="border border-2 border-black"
                                    src="../../public/assets/resumeImage.jpg"
                                    alt=""
                                    height="70"
                                />

                                <div>
                                    <h1 className="h3 fw-normal my-1">
                                        <b>Resume Builder</b>
                                    </h1>
                                    <p className="m-0">
                                        <i>Login Page</i>
                                    </p>
                                </div>
                            </div>

                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="form-control mb-2"
                                    id="floatingEmail"
                                    placeholder="name@example.com"
                                    required
                                    onChange={(event) => {
                                        setEmail(event.target.value)
                                    }}
                                />
                                <label htmlFor="floatingInput">
                                    <i className="bi bi-envelope "></i> Email
                                    address
                                </label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    required
                                    onChange={(event) => {
                                        setPassword(event.target.value)
                                    }}
                                />
                                <label htmlFor="floatingPassword">
                                    <i className="bi bi-key"></i> Password
                                </label>
                            </div>

                            <button
                                className="btn btn-primary w-100 py-2"
                                type="submit"
                            >
                                Login
                                <i className="bi bi-box-arrow-in-right"></i>
                            </button>
                            <div className="d-flex justify-content-between my-3">
                                <a
                                    href="/forgotPassword"
                                    className="text-decoration-none"
                                >
                                    Forgot Password ?
                                </a>
                                <a href="/" className="text-decoration-none">
                                    Register
                                </a>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </>
    )
}
Login.propTypes = {
    setAuth: PropTypes.func.isRequired, // Add prop type validation
}
export default Login
