import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function Layout({ logout }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    return (
        <>
            <Navbar handleLogout={handleLogout} />
            <main>
                <Outlet />
            </main>
        </>
    )
}
Layout.propTypes = {
    logout: PropTypes.func.isRequired,
}

export default Layout
