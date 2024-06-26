import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from './components/Auth/Register'
import Error from './components/Error'
import Login from './components/Auth/Login'
import ForgotPassword from './components/Auth/ForgotPassword'
import VerifyOTP from './components/Auth/VerifyOTP'
import ChangePassword from './components/Auth/ChangePassword'
import HomePage from './components/HomePage'
import CreateResume from './components/CreateResume'
import Profile from './components/Profile'
import MyResume from './components/MyResume'
import { useEffect, useState } from 'react'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
import EditResume from './components/EditResume'

function App() {
    const checkTokenValidity = (Token) => {
        if (!Token) return false
        const { exp } = jwtDecode(Token)
        return exp * 1000 > Date.now()
    }
    const [auth, setAuth] = useState({
        Token: localStorage.getItem('authToken') || null,
    })
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if (token && checkTokenValidity(token)) {
            setAuth({ Token: token })
        } else {
            localStorage.removeItem('authToken')
            setAuth({ Token: null })
        }
    }, [])
    const logout = () => {
        localStorage.removeItem('authToken')
        setAuth({ Token: null })
    }
    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login setAuth={setAuth} />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/VerifyOTP" element={<VerifyOTP />} />
                <Route path="/ChangePassword" element={<ChangePassword />} />
                <Route path="*" element={<Error />} />
                <Route element={<PrivateRoute auth={auth} />}>
                    <Route element={<Layout logout={logout} />}>
                        <Route path="/homePage" element={<HomePage />} />
                        <Route
                            path="/createResume"
                            element={<CreateResume />}
                        />
                        <Route path="/editResume" element={<EditResume />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/myResume" element={<MyResume />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
