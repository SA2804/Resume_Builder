import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function Navbar({ handleLogout }) {
    const navigate = useNavigate()
    const handleProfile = () => {
        navigate('/Profile')
    }
    return (
        <>
            <nav className="navbar bg-black shadow">
                <div className="container">
                    <a className="navbar-brand text-white" href="/homePage">
                        <img
                            src="../../public/assets/resumeImage.jpg"
                            alt="Logo"
                            height="35"
                            className="d-inline-block align-text-center border border-2 border-white me-2"
                        />
                        <b>Resume Builder</b>
                    </a>
                    <div>
                        <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={handleProfile}
                        >
                            <i className="bi bi-person-circle"> Profile</i>
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={handleLogout}
                        >
                            <i className="bi bi-box-arrow-left"> Logout</i>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}
Navbar.propTypes = {
    handleLogout: PropTypes.func.isRequired,
}
export default Navbar
