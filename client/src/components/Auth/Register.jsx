import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../../public/styles/Register.css'
import { toast } from 'react-toastify'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault() // Prevent form submission

        let isValid = true

        // Name Validation:
        let re1 = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/
        if (name === '') {
            document.getElementById('nameMsg').innerText = 'Enter your name.'
            isValid = false
        } else if (!re1.test(name)) {
            document.getElementById('nameMsg').innerText =
                'Enter a proper name.'
            isValid = false
        } else {
            document.getElementById('nameMsg').innerText = ''
        }

        // Email Validation:
        let re2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!re2.test(email)) {
            document.getElementById('emailMsg').innerText =
                'Enter a proper email.'
            isValid = false
        } else {
            document.getElementById('emailMsg').innerText = ''
        }

        // Password Validation:
        let re3 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
        if (password === '') {
            document.getElementById('passwordMsg').innerText =
                'Enter your password.'
            isValid = false
        } else if (!re3.test(password)) {
            document.getElementById('passwordMsg').innerText =
                'Enter a proper password of minimum 8 characters having at least one lowercase character, one uppercase character and a digit.'
            isValid = false
        } else {
            document.getElementById('passwordMsg').innerText = ''
        }

        if (!isValid) {
            return // If validation fails, do not proceed
        }

        // Proceed with form submission if validation is successful
        try {
            const data = { name, email, password }
            await axios
                .post('http://localhost:3000/', data)
                .then((response) => {
                    toast(response.data.text)
                    if (response.data.text === 'Registration Success') {
                        const registrationId = response.data.regID
                        localStorage.setItem('registrationId', registrationId) // Store the registration ID
                        navigate('/login')
                    }
                })
                .catch((err) => console.log(err))
        } catch (error) {
            console.error('Error during registration', error)
        }
    }
    return (
        <>
            <div className="d-flex vh-100 align-items-center">
                <div className="w-100">
                    <main className="form-signin w-100 m-auto bg-white shadow rounded">
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex gap-2 justify-content-center ">
                                <img
                                    className="border border2 border-black mb-4"
                                    src="../../public/assets/resumeImage.jpg"
                                    alt="logo"
                                    height="70"
                                />
                                <div>
                                    <h1 className="h3 fw-normal my-1">
                                        <b>Resume Builder</b>
                                    </h1>
                                    <p className="m-0">
                                        <i> Create your new account</i>
                                    </p>
                                </div>
                            </div>

                            <div className="form-floating mb-2">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    id="floatingName"
                                    placeholder=""
                                    onChange={(event) => {
                                        setName(event.target.value)
                                    }}
                                />
                                <label htmlFor="floatingInput">
                                    <i className="bi bi-person"> Full Name</i>
                                </label>
                                <p
                                    className=" text-danger fw-bold m-1"
                                    id="nameMsg"
                                ></p>
                            </div>
                            <div className="form-floating mb-2">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    id="floatingEmail"
                                    placeholder="name@example.com"
                                    onChange={(event) => {
                                        setEmail(event.target.value)
                                    }}
                                />
                                <label htmlFor="floatingInput">
                                    <i className="bi bi-envelope">
                                        {' '}
                                        Email address
                                    </i>
                                </label>
                                <p
                                    className=" text-danger fw-bold m-1"
                                    id="emailMsg"
                                ></p>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    onChange={(event) => {
                                        setPassword(event.target.value)
                                    }}
                                />
                                <label htmlFor="floatingPassword">
                                    <i className="bi bi-key"> Password</i>
                                </label>
                                <p
                                    className=" text-danger fw-bold m-1"
                                    id="passwordMsg"
                                ></p>
                            </div>

                            <button
                                className="btn btn-primary w-100 py-2"
                                type="submit"
                            >
                                <i className="bi bi-person-plus-fill">
                                    {' '}
                                    Register
                                </i>
                            </button>
                            <div className="d-flex justify-content-between my-3">
                                <a
                                    href="/forgotPassword"
                                    className="text-decoration-none"
                                >
                                    Forgot Password ?
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

export default Register
