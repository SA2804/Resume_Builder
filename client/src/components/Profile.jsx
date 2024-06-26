import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
function Profile() {
    const [newName, setNewName] = useState(null)
    const [newEmail, setNewEmail] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault() // Prevent form submission

        let isValid = true

        // Name Validation:
        let re1 = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/
        if (newName === null) {
            document.getElementById('nameMsg').innerText = 'Enter your name.'
            isValid = false
        } else if (!re1.test(newName)) {
            document.getElementById('nameMsg').innerText =
                'Enter a proper name.'
            isValid = false
        } else {
            document.getElementById('nameMsg').innerText = ''
        }

        // Email Validation:
        let re2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!re2.test(newEmail)) {
            document.getElementById('emailMsg').innerText =
                'Enter a proper email.'
            isValid = false
        } else {
            document.getElementById('emailMsg').innerText = ''
        }

        if (!isValid) {
            return // If validation fails, do not proceed
        }

        // Proceed with form submission if validation is successful
        try {
            const data = { newName, newEmail }
            await axios
                .post('http://localhost:3000/profileUpdate', data)
                .then((response) => {
                    toast(response.data.text)
                    if (response.data.text === 'Profile Updated Successfully') {
                        navigate('/homePage')
                    }
                })
                .catch((err) => console.log(err))
        } catch (error) {
            console.error('Error during Profile Updation.', error)
        }
    }
    return (
        <>
            <div className="container">
                <div className="bg-white rounded shadow p-2 mt-4">
                    <div className="d-flex justify-content-between border-bottom p-2">
                        <h5>
                            <b>Edit Profile</b>
                        </h5>
                        <div>
                            <a
                                href="/homePage"
                                className="text-decoration-none"
                            >
                                <i className="bi bi-arrow-left-circle"> Back</i>
                            </a>
                        </div>
                    </div>

                    <div>
                        <form className="row g-3 p-3" onSubmit={handleSubmit}>
                            <div className="col-md-6">
                                <label
                                    htmlFor="Full Name"
                                    className="form-label"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your Name"
                                    className="form-control"
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                                <p
                                    className=" text-danger fw-bold m-1"
                                    id="nameMsg"
                                ></p>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Email" className="form-label">
                                    Enter New Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="xyz@abc.com"
                                    className="form-control"
                                    required
                                    onChange={(e) =>
                                        setNewEmail(e.target.value)
                                    }
                                />
                                <p
                                    className=" text-danger fw-bold m-1"
                                    id="emailMsg"
                                ></p>
                            </div>
                            <div className="col-12 text-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    <i className="bi bi-floppy">
                                        {' '}
                                        Update Profile
                                    </i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
